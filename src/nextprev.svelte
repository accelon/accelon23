<script>
import {humanAddress,address,curPtk} from './store.js'
import {get} from 'svelte/store'

const nextn=()=>{
    const [start,end]=curPtk().rangeOfAddress(get(address));
    console.log(start,end)
}
const prevn=()=>{
    const [start,end]=curPtk().rangeOfAddress(get(address));
}
</script>

<div class="centernav">
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={prevn}>←</span>
{humanAddress($address)}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={nextn}>→</span>
</div>