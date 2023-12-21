<script>
import {tosim} from '../store.js'
import {baidu} from '../icons.js'
export let ptk;
export let line;
export let lang='';
export let caption='';
export let depth=0;
export let ln='';
export let highlighted=false;
$: ptk,line,highlighted,ln,depth,lang;
const href="https://baike.baidu.com/item/"+ln;
</script>
{#if $tosim!=='0'}
<a target="_new" {href}>{caption}{@html baidu}</a>
{/if}