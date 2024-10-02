<script>
import {landscape,welcoming,bootmessage,address} from './store.js'
import {clearcache} from './savesettings.js'
import {init} from './appinit.js'
import {registerServiceWorker} from 'ptk/platform/pwa.js'
import Main from './main.svelte'
import {ACC23} from './appconst.js'
import Newbie from './newbie.svelte'
import {_} from "./textout.js"
import ClearCache from './clearcache.svelte';
let loaded=false,app;
setTimeout(async ()=>{loaded=await init(app)},100); //prevent index.js:8217 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading '0')
const orientation=(ls)=>{
    if (app) {
        setTimeout(()=>{
            app.style.height=window.innerHeight+'px';
            app.style.width=window.innerWidth+'px';    
        },1)
    }
}

registerServiceWorker();
$: orientation($landscape)
</script>
<div class="app" bind:this={app}>
{#if loaded}
{#if $welcoming && $address==''}
<Newbie/>
{:else}
<Main/>
{/if}
{:else}
<span class="bodytext">
{$bootmessage}
{_(ACC23.AppTitle)}
<br/>系統版本：{ACC23.AppVer} <a href="https://nissaya.cn/" target="_new">官網</a>
<br/>如果卡在此畫面沒有進度，請試試<ClearCache/>
<br/>還是不行的話，表示瀏覽器無法運行本軟件。
<br/>PC及安卓請改用 Chrome 訪問本頁面。
<br/>iOS須13版以上，並使用內建的Safari。
<hr/>
</span>    
{/if}
</div>
