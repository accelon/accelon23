<script>
import {_} from './textout.ts'
import Abridge from './comps/abridge.svelte';
export let linetext='';
export let hits=[];
export let phraselength=[];
export let line=0;
</script>

<Abridge {phraselength} text={linetext} {hits} let:tk>
{#if tk.highlight}<span class="hl0">{tk.text}</span>{:else}{tk.text}{/if}
</Abridge>

