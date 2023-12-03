<script>
import {_} from '../textout.js'
export let url='';
export let alt='';
export let ptk=null;
export let line;
export let highlighted=false;
$: ptk,line,highlighted;
</script>
<img src={url} {alt}/>