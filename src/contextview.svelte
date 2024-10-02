<script>
import {setContext} from 'svelte'
import {tosim,activeptk,cachedMp3} from './store.js'
import {ACC23} from './appconst.js'
import {usePtk} from 'ptk/basket/openptk.ts'
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
    cachedMp3,
    cacheName:ACC23.cacheName
}
setContext('ctx',ctx);
//$: console.log($activeptk)
$: ctx.sim=$tosim;
//$: ctx.ptk=$theptk;
//$: ctx.fromAnchor=$fromAnchor;
$: ctx.book=book;
$: ctx.ptk = usePtk($activeptk);
$: ctx.transclusiondict=usePtk(ACC23.transclusiondict)||ctx.ptk

</script>
<span><slot/></span>