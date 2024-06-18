<script>
import OfftextPaint from './offtextpaint.svelte';
export let text='';
const lines=text.split('\n');
export let line=0;
export let ptkname='';
export let lang='';
export let depth=0;
export let highlighted=false;
</script>
<span style={"border-bottom:1px solid var(--depthcolor"
+(depth+1)+"); border-right:3px solid var(--depthcolor"+(depth+1)+")"}>
{#each lines as linetext,idx}<OfftextPaint 
{linetext} line={line+idx} {ptkname} {lang}
 {highlighted} depth={depth+1}/>{/each}
</span>