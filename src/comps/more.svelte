<script>
import SimpleButton from './simplebutton.svelte';
export let items=[];
export let onclick=null;
const ITEMPERPAGE=5;
export let showcount=ITEMPERPAGE;
const showmore=()=>{
	showcount+=ITEMPERPAGE;
}

$: displayitems=items.slice(0,showcount);
</script>
{#each displayitems as id}
<slot {id}>
<span aria-hidden="true"  on:click={onclick}>{' '+id}</span>
</slot>
{/each}
{#if showcount<items.length}<SimpleButton
onclick={showmore}>+{items.length-showcount}</SimpleButton>{/if}
