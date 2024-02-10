<script>
import {_} from '../textout.js'
import {updateUrl,parseAddress,makeAddress, parseAction} from 'ptk'
import {address} from "../store.js";
export let ptk;
export let line;
export let lang='';
export let depth=0;
export let ln='';
export let id;
export let caption;
export let highlighted=false;
$: ptk,line,highlighted;
const jump=()=>{
    const addr=parseAddress($address);
    let a=ln;
    if (ln.match(/ck\d+/)) {
        a=a.replace(/ck/,'ck#');
    }
    addr.action=addr.action.replace(/ck#[^\.]+/,a);
    const _addr=makeAddress(addr)
    // console.log(ln,addr,_addr)
    address.set(_addr)
    updateUrl(_addr)
}
</script>
<span class="clickable offtag_l"  aria-hidden=true on:click={jump}>{_(caption)}</span>