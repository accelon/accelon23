<script>
import {tosim} from '../store.js'
import {wiki} from '../icons.js'
export let ptk;
export let line;
export let lang='';
export let depth=0;
export let caption=''
export let ln='';
export let highlighted=false;
$: ptk,line,highlighted,ln,depth,lang;
const href="https://"+lang+'.wikipedia.org/wiki/'+ln;
</script>
{#if $tosim=='0'}
<a target="_new" {href}>{caption}{@html wiki}</a>
{/if}