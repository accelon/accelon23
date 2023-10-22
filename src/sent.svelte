<script>
import Swipeview from "./comps/swipeview.svelte";
import {tosim,activeptk,tofind} from './store.js'
import {usePtk} from 'ptk'
import StateBtn from './comps/statebutton.svelte'
import { _ } from "./textout.ts";
export let sentmatchmode=0;
let itemstart=0;
const itemperpage=5;
let items=[],displayitems=[];
let sorttype=0;
$: ptk=usePtk($activeptk);
const swipesent=(direction)=>{
    if (direction==1) {
        if (itemstart+itemperpage<items.length) itemstart+=itemperpage;
    } else {
        itemstart-=itemperpage;
        if (itemstart<0) itemstart=0;
    }
    displayitems=items.slice(itemstart,itemstart+itemperpage);
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
    const keys=ptk.columns.sent.keys;
    const values=ptk.columns.sent.occur;
    const {avglength,avgfreq} =statSent(ptk.columns.sent);
    items=ptk.columns.sent.keys.enumMode($tofind,sentmatchmode);
    itemstart=0;

    const weight=idx=>{
        return (keys.get(idx).length/avglength)*(values[idx].length/avgfreq);
    }
    if (sorttype==1) {
        items.sort((a,b)=> weight(b)-weight(a));
    } else if (sorttype==2) {
        items.sort((a,b)=> values[b].length==values[a].length?keys.get(b).length-keys.get(a).length:values[b].length-values[a].length);
    } else if (sorttype==3) {
        items.sort((a,b)=> keys.get(b).length==keys.get(a).length? values[b].length-values[a].length  : keys.get(b).length-keys.get(a).length);
    }
    displayitems=items.slice(0,itemperpage);
}

$: updateList($activeptk,$tofind,sentmatchmode,sorttype)

</script>
{#if !ptk || !ptk.columns.sent}
無句
{:else}
<StateBtn states={{0:"原序",1:"重要",2:"句頻",3:"句長"}} bind:selectedIndex={sorttype}/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:click={()=>swipesent(-1)}>
{itemstart+1}/
</span>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:click={()=>swipesent(1)}>
{items.length}
</span>

<Swipeview onSwipe={swipesent}>
{#each displayitems as item}
<div> <span>{_(ptk.columns.sent.keys.get(item),$tosim)} </span>
    <span>{ptk.columns.sent.occur[item].length}</span></div>
{/each}
</Swipeview>    
{/if}