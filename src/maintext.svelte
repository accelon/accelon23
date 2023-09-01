<script>
import { parseOfftext, usePtk ,parseAddress, makeAddress, updateUrl} from 'ptk';
import {_,getLangClass} from './textout.js'
import {selectedptks,address,tosim,palitrans} from './store.js';
import NextPrev from './nextprev.svelte'
let lines=[];
$: ptks=$selectedptks;
let highlightline=-1;
const loadText=async ()=>{
    const addr=$address;
    highlightline=parseAddress(addr).highlightline;
    const out=[],langs=[];
    for (let i=0;i<ptks.length;i++) {
        const ptk=usePtk(ptks[i]);
        const offtext=await ptk.fetchAddress(addr);
        const texts=offtext.map(it=>parseOfftext(it)[0]);
        out[i]=texts;
        langs[i]=ptk.attributes.lang;
    }
    lines.length=0;
    for (let i=0;i<out[0].length;i++) {
        for (let j=0;j<ptks.length;j++) {
            lines.push([langs[j], out[j][i]])
        }
    }
    lines=lines;
}
const sethighlightline=i=>{
    highlightline=i;
    const addr=parseAddress($address);
    addr.highlightline=highlightline;
    address.set(makeAddress(addr))
    updateUrl($address)
}
$: loadText($address,$selectedptks);
</script>
<div class="bodytextarea bodytext">

{#each lines as [lang,line],idx}
{#if idx%ptks.length==0 && ptks.length>1}<div class="hr"></div>{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={()=>sethighlightline(Math.floor(idx/ptks.length))}
class:parselected={highlightline== Math.floor(idx/ptks.length) }
class={"partext partext"+ (idx%ptks.length)+ getLangClass(lang,$palitrans)}>{_(line,lang,$tosim,$palitrans)}</div>
{/each}
<hr/>
<NextPrev containerclass="centernav"/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

</div>
<style>
</style>