<script>
import Swipeview from "./comps/swipeview.svelte";
import {tosim,activeptk,tofind,sentat, clauseonly,searchmode,searchable} from './store.js'
import {usePtk} from 'ptk'
import StateBtn from './comps/statebutton.svelte'
import { _ } from "./textout.ts";
import More from './comps/more.svelte'
export let sentmatchmode=0;
let itemstart=0;
const ITEMPERPAGE=5;
let items=[],displayitems=[],showsim100={},showsim90={},showsim80={};
let sorttype=0;
$: ptk=usePtk($activeptk);
$: sent=ptk?.columns.sent;
const swipesent=(direction)=>{
    if (direction==1) {
        if (itemstart+ITEMPERPAGE<items.length) itemstart+=ITEMPERPAGE;
    } else {
        itemstart-=ITEMPERPAGE;
        if (itemstart<0) itemstart=0;
    }
    displayitems=items.slice(itemstart,itemstart+ITEMPERPAGE);
}
const statSent=(field)=>{
    if (field.stat) {
        return field.stat
    }
    const keys=field.keys;
    const values=field.occur;
    let totallength=0;
    let totalfreq=0;    
    for (let i=0;i<keys.len();i++) {
        const key=keys.get(i);
        const val=values[i];
        totallength+=key.length
        totalfreq+=val.length;
    }
    field.stat={avglength:totallength/keys.len(), avgfreq:totalfreq/keys.len()};
    return field.stat;
}
const updateList=()=>{
    if (!ptk.columns.sent) return ;
    showsim100={};
    showsim90={};
    showsim80={};
    const keys=ptk.columns.sent.keys;
    const occurs=ptk.columns.sent.occur;
    const sim100=ptk.columns.sent.sim100;
    const sim90=ptk.columns.sent.sim90;
    const sim80=ptk.columns.sent.sim80;
    const {avglength,avgfreq} =statSent(ptk.columns.sent);
    if (!$tofind) {
        items.length=0;
        for (let i=0;i<occurs.length;i++) items.push(i)
    } else {
        items=ptk.columns.sent.keys.enumMode($tofind,sentmatchmode);
    }
    itemstart=0;
    const weight=idx=>{
        return (keys.get(idx).length/avglength)*(occurs[idx].length/avgfreq);
    }
    if (sorttype==1) {
        items.sort((a,b)=> weight(b)-weight(a));
    } else if (sorttype==2) {
        items.sort((a,b)=> (sim100[b].length+sim90[b].length+sim80[b].length==sim100[a].length+sim90[a].length+sim80[a].length)
        ?keys.get(b).length-keys.get(a).length  
        :(sim100[b].length+sim90[b].length+sim80[b].length)-(sim100[a].length+sim90[a].length+sim80[a].length));
    } else if (sorttype==3) {
        items.sort((a,b)=> occurs[b].length==occurs[a].length?keys.get(b).length-keys.get(a).length:occurs[b].length-occurs[a].length);
    } else if (sorttype==4) {
        items.sort((a,b)=> keys.get(b).length==keys.get(a).length? occurs[b].length-occurs[a].length  : keys.get(b).length-keys.get(a).length);
    }
    displayitems=items.slice(0,ITEMPERPAGE);
}
const setSent=(idx,clause=false)=>{ //設定為全句搜尋條件 (子句不計入)
    if ($sentat==idx) {
        sentat.set(-1);
    } else {
        sentat.set(idx);
        clauseonly.set(clause);
        searchmode.set('excerpt');
        searchable.set( sent.keys.get(idx));
    }
}
$: updateList($activeptk,$tofind,sentmatchmode,sorttype)
</script>
{#if !ptk || !ptk.columns.sent}
無句
{:else}
{#if items.length}
<StateBtn states={{0:"原序",1:"重要",2:"重覆",3:"句頻",4:"句長"}} bind:selectedIndex={sorttype}/>
{:else}
{_("查無結果")}
{/if}
{#if items.length>ITEMPERPAGE}
<span aria-hidden="true" on:click={()=>swipesent(-1)}>
{itemstart+1}/
</span>
<span aria-hidden="true" on:click={()=>swipesent(1)}>
{items.length}
</span>
{/if}
<Swipeview onSwipe={swipesent}>
{#each displayitems as item}
<div><span aria-hidden="true" class:selected={$sentat==item&&$clauseonly} 
    class="clickable" on:click={()=>setSent(item,true)}>{_(sent.keys.get(item),$tosim)} </span>
    <span aria-hidden="true" class="clickable hitbtn" on:click={()=>setSent(item)} 
        class:selected={$sentat==item&&!$clauseonly} >{'('+sent.occur[item].length+')'}</span> 
    {#if sent.sim100[item].length}
        {#if showsim100[item]}
        <More items={sent.sim100[item]} let:id><span class="clickable" 
            aria-hidden="true" on:click={()=>setSent(id,true)} class:selected={$sentat==id&&$clauseonly}>{' '+sent.keys.get(id)}</span></More>
        {:else}
        <span aria-hidden="true" class="clickable" on:click={()=>showsim100[item]=true} 
            class:selected={$sentat==item&&!$clauseonly}>={sent.sim100[item].length}</span> 
        {/if}
    {/if}
    {#if sent.sim90[item].length}
        {#if showsim90[item]}
        <More items={sent.sim90[item]} let:id>
            <span class="clickable" aria-hidden="true" on:click={()=>setSent(id,true)}>{' '+sent.keys.get(id)}</span>
            <span class="clickable hitbtn" aria-hidden="true" on:click={()=>setSent(id)}>{'('+sent.occur[id].length +')'}</span>
        </More>
        {:else}
        <span aria-hidden="true" class="clickable" on:click={()=>showsim90[item]=true}>≃{sent.sim90[item].length}</span>
        {/if}
    {/if}
    {#if sent.sim80[item].length}
        {#if showsim80[item]}
        <More items={sent.sim80[item]} let:id>
            <span class="clickable" aria-hidden="true" on:click={()=>setSent(id,true)}>{' '+sent.keys.get(id)}</span>
            <span class="clickable hitbtn" aria-hidden="true" on:click={()=>setSent(id)}>{'('+sent.occur[id].length +')'}</span>
        </More>
        {:else}
        <span aria-hidden="true" class="clickable" on:click={()=>showsim80[item]=true}>≈{sent.sim80[item].length}</span>
        {/if}
    {/if}    
</div>
{/each}
</Swipeview>    
{/if}