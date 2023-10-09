<script>
import { humanAddress,address} from './store.js'
import {get} from 'svelte/store'
export let containerclass=''
let copying='';
import {nextn,prevn} from './nextprev.js'
let timer;
const copylink=()=>{
    navigator.clipboard.writeText(location.origin+location.pathname+'#'+get(address));
    copying='link copied!'
    clearTimeout(timer)
    timer=setTimeout(()=>{
        copying='';
    },3000)
}
</script>

<span class={containerclass}>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={prevn}>←</span>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={copylink}>{copying?copying:humanAddress($address)}</span>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={nextn}>→</span>
</span>