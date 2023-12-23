<script>
    /* ms-word style footnote , link with id*/
import {styledNumber} from 'ptk'
import OfftextPaint from '../offtextpaint.svelte';
export let id=null;
export let ln=null;
export let ptk;
export let caption='';
export let lang='';
export let highlighted=false;
export let depth=0;
export let line;
$: linetext=ptk.footNoteInTSV(id,line);
$: caption,highlighted,depth,lang,id,ln;
$: console.log('i',linetext,id)
export let showing=false;
</script>
{#if highlighted}
<span aria-hidden="true" on:click={()=>showing=!showing} 
    class:selected={showing} 
    class="clickable offtag_f">{showing?styledNumber(id):'◂'}</span>{/if}{#if showing}<span 
class="footnote"><OfftextPaint {linetext} {line} ptkname={ptk.name} {lang} {highlighted} /></span>{/if}
