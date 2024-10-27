<script>
import {setContext} from 'svelte'
import {tosim,activeptk,transcluding} from './store.js'
import {ACC23} from './appconst.js'
import {usePtk} from 'ptk/basket/openptk.ts'
import {mp3InCache} from 'ptk/platform/downloader.js'
export let goline;
export let taptext;
export let gopagebookline;
export let book;
export const ctx={
    sim:0,
    ptk:null,
    //fromAnchor:'',
    activebacklink:'',
    goline,gopagebookline,taptext,
    cachedMp3:[],
    activeMp3:'',
    transcluding,
    CacheName:ACC23.CacheName
}
async function initContext(){
    ctx.cachedMp3=await mp3InCache(ACC23.CacheName);
}
initContext();
setContext('ctx',ctx);

//$: console.log($activeptk)
$: ctx.sim=parseInt($tosim);
//$: ctx.ptk=$theptk;
//$: ctx.fromAnchor=$fromAnchor;
$: ctx.book=book;
$: ctx.ptk = usePtk($activeptk);
$: ctx.transclusiondict=usePtk(ACC23.transclusiondict)||ctx.ptk

</script>
<span><slot/></span>