<script>
import {hasupdate, availableptks} from './store.js'
import {onMount} from 'svelte'
import {isLatest,downloadToCache,ptkInCache} from 'ptk/platform/downloader.js'
import {poolDel,openPtk} from 'ptk'
import {_} from './textout.js'
import {ACC23} from './appconst.js'

let ptks=[], updatestatus=[]
let needupdate=0;
let installable=0;

let downloading=false,downloadmsg='';
const doupdate=async (name,force)=>{
    console.log('do update',downloading)
    if (downloading)return;
    downloading=true;

    //append timestamp to url to force check 
    let url=name+'.ptk';
    if (force && navigator.onLine) url+='?'+(new Date()).toISOString()
    const res=await downloadToCache(ACC23.CacheName,url,msg=>{
        downloadmsg=msg;
    });

    poolDel(name);
    const buf=await res.arrayBuffer();
    await openPtk(name,new Uint8Array(buf));
    downloading=false;

    downloadmsg='';
    needupdate--;
    hasupdate.set(needupdate>0)   
    
    if (!~$availableptks.indexOf(name)) {
        const allptks=$availableptks;
        allptks.push(name);
        availableptks.set(  ptks.filter(it=>~allptks.indexOf(it)) )
        installable--;
    }

}
const updateptk=async idx=>{
    const name=updatestatus[idx][0];
    await doupdate(name,true)
    updatestatus[idx][1]='';
    updatestatus=updatestatus;
}

onMount(async ()=>{
    ptks=ACC23.allptks;
    needupdate=$availableptks.length;
    updatestatus=ptks.map(it=>[it, 'checking']);
    for (let i=0;i<ptks.length;i++) {
        const same=await isLatest(ptks[i]+'.ptk',ACC23.CacheName);
        const status= _((~$availableptks.indexOf(ptks[i]))?'更新':' ');
        if (status==' ') installable++;
        updatestatus[i][1]=same?'':status;
        //console.log(ptks[i],same,status,installable,needupdate)
        if (same|| !~$availableptks.indexOf(ptks[i])) needupdate--;
        else {
            const ptk=await openPtk(ptks[i]);
            if (!ptk.attributes.manualupdate) {
                poolDel(ptks[i]);
                await doupdate(ptks[i]);
            }
        }
    }
    hasupdate.set(needupdate>0)
    updatestatus=updatestatus;
})

</script>
{#if installable || needupdate}<br/>{/if}
{#if installable}
{@html _("以下數據庫基於網絡公開資料，若有出入以各自的<a href='https://github.com/accelon/sanzang/' target=_new>官方網頁</a>為準，請遵守著作權人之授權方式。")}<br/>
{/if}
{#each updatestatus as [ptkname,status],idx}
{#if status && !downloadmsg} 
<span aria-hidden="true" class="clickable hyperlink" class:needupdate={status=='更新'} on:click={()=>updateptk(idx)}>
    {status}{_(ACC23.ptkinfo[ptkname]||ptkname)+ '、'}</span>
{/if}
{/each}
{downloadmsg}