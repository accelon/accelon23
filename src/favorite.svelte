<script>
import {parseAddress, usePtk,parseOfftext} from 'ptk';
import {favorites, activeptk,address } from './store.js'
import {fromHumanAddress,humanAddress,setNewAddress} from './address.js'
import {ACC23} from './appconst.js'
import SwipeView from 'offtextview/comps/swipeview.svelte'
import { removeFavorite } from './favorite.js';
import { _ } from './textout.js';
import Abridge from 'offtextview/comps/abridge.svelte';
let now=0,items=[],pagecount=0,selected='';
const ITEMPERPAGE=ACC23.ITEMPERPAGE||5;
const BUILTINFAVORITE=ACC23.ITEMPERPAGE||100;
const updateItems=async ()=>{
    items=$favorites.slice( now*ITEMPERPAGE, (now+1)*ITEMPERPAGE).map(id=>{return {id,text:''}});
    pagecount=Math.floor($favorites.length /ITEMPERPAGE)+1;
    const ptk=usePtk($activeptk)
    if (!ptk) return;
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
    setNewAddress(addr);

    selected=id;
}
const onSwipe=direction=>{
    const pagecount=Math.floor($favorites.length/ITEMPERPAGE)+1;
    now+=direction;
    if (now<0) now=0;
    if (now>=pagecount-1) now=pagecount-1;
    gopage(now);
}
const defaultFavorite=()=>{
    favorites.set(BUILTINFAVORITE)
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
{#if !items.length}
<span class="clickable" on:click={defaultFavorite} aria-hidden="true" >{_("載入缺省最愛")}</span>
{:else}
{_("點"+ humanAddress($address)+ "兩次加入最愛")}
<SwipeView {onSwipe}  >
{#key items}
{#each items as item}

<div>{#if item.id==selected}<span class="clickable"
     aria-hidden=true on:click={()=>removeFavorite(item.id,true)}>❌</span>{/if}
     <Abridge text={item.text}/>    
     <span class:selected={item.id==selected} 
     class="clickable" aria-hidden=true on:click={()=>go(item.id)}>{item.id}</span></div>
{/each}
{/key}
</SwipeView>
{/if}
</div>