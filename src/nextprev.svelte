<script>
import { humanAddress,address} from './store.js'
import {addFavorite} from './favorite.js'
import {get} from 'svelte/store'
import {_} from './textout.js'
export let containerclass=''
let message='';
import {nextn,prevn} from './nextprev.js'
let timer;
const copylink=async ()=>{
    const tocopy=location.origin+location.pathname+'#'+get(address);
    const clipboard=await navigator.clipboard.readText();
    if (tocopy == clipboard) {
        message='❤️'
        addFavorite(get(address));
    } else {
        await navigator.clipboard.writeText(tocopy);
        message=_('已複製copied');
    }
    clearTimeout(timer)
    timer=setTimeout(()=>{
        message='';
    },3000)

}
</script>

<span class={containerclass}>
<span aria-hidden="true" class="clickable" on:click={prevn}>←</span>
<span aria-hidden="true" class="clickable" on:click={copylink}>{message?message:humanAddress($address)}</span>
<span aria-hidden="true" class="clickable" on:click={nextn}>→</span>
</span>