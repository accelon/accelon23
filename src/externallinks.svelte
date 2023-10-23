<script>
import {parseAction,parseAddress,usePtk} from 'ptk'
import {address,referaddress} from "./store.js"
import { _ } from './textout.js';
let items=[];
const humanAddress=(act)=>{
    let out='';
    if (act.bk=='agmm') out+='中';
    else if (act.bk=='agms') out+='雜';
    else if (act.bk=='agmss') out+='別';
    else if (act.bk=='agmd') out+='長';
    else if (act.bk=='agmu') out+='增';

    out+=(act.ck?act.ck:'')+(act.n? (act.ck?'.':'')+act.n:'');
    return out;
}
const getLinks=(addr)=>{
    const ptk=usePtk("cs");
    if (!addr||!ptk) return [];
    const act=parseAction(parseAddress(addr)?.action,true);
    const col=ptk.columns['par_'+act.ak];
    
    if (!col) return;
    const links=(col.fieldByKey( act.ck.slice(1)+'.'+act.n,'parallels')||'').split(',');
    items=links.map(it=>{
        const m=it.match(/ak#([dmsa])n\.ck#([dmsa])([n\.\d]+)/);
        if (m) {
            let internal=(m[1]+m[3]).replace('.n','.');
            if (m[3].indexOf(".")==-1) return null; //精度不足，暫不支援
            return [internal,m[0].replace(/\.(\d+)/,'.n$1'),false];
        } else {
            const host=location.host.replace('5080','5000');
            const url=location.protocol+'//'+host+location.pathname.replace('sz','ylz')+'#'+it;
            const act2=parseAction(it,true)
            return [humanAddress(act2),url,true];
        }
    }).filter(it=>!!it)
}
$: getLinks($address);
const golink=(link)=>{
    address.set(link);
}
</script>

{#each items as [caption,link,external],idx}
{#if external}
<a href={link} target=_new class="hyperlink clickable">{_(caption)}</a>{@html "&nbsp;"}
{:else}
<span aria-hidden="true" class="clickable" class:hyperlink={external} on:click={()=>golink(link)}>{_(caption)}</span>{@html "&nbsp;"}{/if}
{/each}