<script>
import { humanAddress,address,curPtk, makeAddressFromLine} from './store.js'
import {get} from 'svelte/store'
import {parseAddress, updateUrl} from 'ptk'
export let containerclass=''
let copying='';
const nextn=()=>{
    const ptk=curPtk();
    const tagats=ptk.tagAtAction(parseAddress(get(address)).action);
    if (tagats[2]?.tagname!=='n') return;
    let newat=tagats[2].at+1;
    const len=ptk.defines.n.fields.id.values.length;
    if (newat>=len) newat=len-1;
    const line=ptk.defines.n.linepos[newat];
    const newaddr=makeAddressFromLine(line);
    if (newaddr) {
        address.set(newaddr);
        updateUrl(newaddr)
    }
}
const prevn=()=>{
    const ptk=curPtk();
    const tagats=ptk.tagAtAction(parseAddress(get(address)).action);
    if (tagats[2]?.tagname!=='n') return;
    let newat=tagats[2].at-1;
    if (newat<0) newat=0;
    const line=ptk.defines.n.linepos[newat];
    const newaddr=makeAddressFromLine(line);
    if (newaddr) {
        address.set(newaddr);
        updateUrl(newaddr)
    }
}
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