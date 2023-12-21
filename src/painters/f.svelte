<script>
import {styledNumber} from 'ptk'
import {_} from '../textout.js'
export let id=null;
export let ln=null; //優先用這個，可能是 innertext 或 <@別名>
export let ptk;
export let caption='';
export let lang='';
export let highlighted=false;
export let depth=0
export let line;
$: text=ptk.footNoteInTSV(ln||caption||id,line);
$: caption,highlighted,depth,lang;
export let showing=false;
</script>
{#if highlighted && !caption}
<span aria-hidden="true" on:click={()=>showing=!showing} 
    class:selected={showing} class="clickable offtag_f">{showing?styledNumber(id):'◂'}</span>
{:else if caption}
<span aria-hidden="true" on:click={()=>showing=!showing} class="clickable offtag_f_caption transclusion" class:selected={showing}>{caption}</span>
{/if}
{#if showing}
<span class="footnote">{_(text)}</span>
{/if}