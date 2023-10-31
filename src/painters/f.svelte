<script>
import {styledNumber} from 'ptk'
import {_} from '../textout.js'
export let id;
export let ptk;
export let line;
const text=ptk.footNoteInTSV(id,line);
export let showing=false;
</script>
<span aria-hidden="true" on:click={()=>showing=!showing} 
    class:selected={showing} class="clickable offtag_f">{styledNumber(id)}</span>
{#if showing}
<span class="footnote">{_(text)}</span>
{/if}