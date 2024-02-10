<script>
/* inline footnote , use ln or innertext as id in note tsv*/
import OfftextPaint from '../offtextpaint.svelte';
export let id=null;
export let ln=null; //優先用這個，可能是 innertext 或 <@別名>
export let ptk;
export let caption='';
export let lang='';
export let highlighted=false;
export let depth=0
export let line;
$: linetext=ptk?.footNoteInTSV(ln||caption||id,line);
$: caption,highlighted,depth,lang;
export let showing=false;
</script>
<span aria-hidden="true" on:click={()=>showing=!showing} 
    class="clickable offtag_f_caption transclusion" 
    class:selected={showing}>{caption}</span>{#if showing}<span 
    style={"border-bottom:1px solid var(--depthcolor"+(depth+1)+"); border-right:3px solid var(--depthcolor"+(depth+1)+")"}
><OfftextPaint depth={depth+1} {linetext} {line} ptkname={ptk.name} {lang} {highlighted} /></span>{/if}