<script>
import {parseAddress, updateUrl,usePtk,parseOfftext} from 'ptk';
import {favorites, activeptk,fromHumanAddress,address} from './store.js'
import {ITEMPERPAGE} from './constant.js'
import Swipeview from './comps/swipeview.svelte';
import { removeFavorite } from './favorite.js';

let now=0,items=[],pagecount=0,selected='';

const updateItems=async ()=>{
    items=$favorites.slice( now*ITEMPERPAGE, (now+1)*ITEMPERPAGE).map(id=>{return {id,text:''}});
    pagecount=Math.floor($favorites.length /ITEMPERPAGE)+1;
    const ptk=usePtk($activeptk)
    for (let i=0;i<items.length;i++) {
        const addr=fromHumanAddress(items[i].id);
        const {action,highlightline}=parseAddress(addr);
        const [start]=ptk.rangeOfAddress(action);
        items[i].line=start+(highlightline||0);
     };

    await ptk.loadLines(items.map(it=>it.line));
    for (let i=0;i<items.length;i++) {
        items[i].text= parseOfftext(ptk.getLine(items[i].line))[0];
    }
}
const gopage=idx=>{
    now=idx;
}
const go=id=>{
    const addr=fromHumanAddress(id);
    if (!addr)return;
    updateUrl(addr);
    address.set(addr)
    selected=id;
}
const onSwipe=direction=>{
    const pagecount=Math.floor($favorites.length/ITEMPERPAGE)+1;
    now+=direction;
    if (now<0) now=0;
    if (now>=pagecount-1) now=pagecount-1;
    gopage(now);
}

$: updateItems(now,$favorites);
</script>
<div class="bodytext">
    
{#if $favorites.length>ITEMPERPAGE}
<span aria-hidden="true" on:click={()=>onSwipe(-1)}>
{now+1}/
</span>
<span aria-hidden="true" on:click={()=>onSwipe(1)}>
{Math.floor($favorites.length/ITEMPERPAGE)+1}
</span>
{/if}

<Swipeview {onSwipe}>
{#key items}
{#each items as item}

<div>{#if item.id==selected}<span class="clickable"
     aria-hidden=true on:click={()=>removeFavorite(item.id,true)}>❌</span>{/if}
     {item.text}<span class:selected={item.id==selected} 
     class="clickable" aria-hidden=true on:click={()=>go(item.id)}>{item.id}</span></div>
{/each}
{/key}
</Swipeview>

</div>