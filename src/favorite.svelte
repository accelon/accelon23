<script>
import {favorites} from './store.js'
import Pager from './comps/pager.svelte';
import {ITEMPERPAGE} from './constant.js'
const favs=$favorites.map( (id,idx)=>{ return {caption:id, id,idx }});

let now=0,items=[],pagecount=0;
const onselect=(e)=>{
    console.log(e);
}
const updateItems=()=>{
    items=favs.slice( now*ITEMPERPAGE, (now+1)*ITEMPERPAGE);
    pagecount=Math.floor(favs.length /ITEMPERPAGE)+1
}
const gopage=idx=>{
    console.log('gopage',idx)
    now=idx;
}
$: updateItems(now,$favorites);
</script>
<div class="bodytext">
<div class="pager">
<Pager {onselect} count={pagecount} nextitems={2} bind:now let:active let:caption let:idx let:id>
    <span aria-hidden="true" on:click={()=>gopage(idx)} class="clickable" class:selected={active}>{caption}</span></Pager>
</div>
{#key items}
{#each items as item}
<div>{item.id}</div>
{/each}
{/key}
</div>