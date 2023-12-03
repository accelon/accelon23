<script>
import {_} from '../textout.js'
export let url='';
export let ptk;
export let line;
export let highlighted=false;
//TODO only show control when highlighted
$: ptk,line
</script>
<audio controls>
<source src={url} type="audio/mpeg"/>
</audio>