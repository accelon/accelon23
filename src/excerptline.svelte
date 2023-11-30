<script>
import {_} from './textout.js'
import Abridge from './comps/abridge.svelte';
export let linetext='';
export let hits=[];
export let phraselength=[];

</script>

<Abridge {phraselength} text={linetext} {hits} let:tk>
{#if tk.highlight}<span class="hl0">{tk.text}</span>{:else}{tk.text}{/if}
</Abridge>

