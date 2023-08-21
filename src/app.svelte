<script>
import {openPtk,addressFromUrl} from 'ptk'
import {downloadToCache} from 'ptk/platform/downloader.js'
import {registerServiceWorker} from 'ptk/platform/pwa.js'
import Main from './main.svelte'
import {onMount} from 'svelte'
import {APPVER,landscape} from './store.js'
import {CacheName} from './constant.js'
let loaded=false,app,bootmessage='';
registerServiceWorker();

const openptk=async name=>{
    bootmessage='try to download '+name+'.ptk'
    const res=await downloadToCache(CacheName,name+'.ptk',msg=>{
        bootmessage=name+'.ptk '+msg;
    })
    const buf=await res.arrayBuffer();
    const ptk=await openPtk(name,new Uint8Array(buf));
}

onMount(async ()=>{
    app.style.height=window.innerHeight+'px';
    app.style.width=window.innerWidth+'px';

    for (let i=0;i<ptks.length;i++) {
        await openptk(ptks[i])
    }
    loaded=true;
})

const orientation=(ls)=>{
    if (app) {
        setTimeout(()=>{
            app.style.height=window.innerHeight+'px';
            app.style.width=window.innerWidth+'px';    
        },1)
    }
}
$: orientation($landscape)
</script>
<div class="app" bind:this={app}>
{#if loaded}
<Main/>
{:else}

<span class="loading toctext">
    系統版本：{APPVER} <a href="https://nissaya.cn/" target="_new">官網</a>
    <br/>如果停在此畫面沒有進度，表示瀏覽器不直持 ECMAScript 2015，無法運行本軟件。
    <br/>PC及安卓請改用 Chrome 瀏覽器訪問本頁面。
    <br/>iOS 須 13 版以上，並使用內建的 Safari 。
    <br/><span class="toctext">{bootmessage}</span>
</span>    

{/if}
</div>
<style>
    .loading {font-size:1em}
</style>