<script>
import {_} from '../textout.js'
export let url='';
export let alt='';
export let ptk;
export let line;
$: ptk,line
</script>
<img src={url} {alt}/>