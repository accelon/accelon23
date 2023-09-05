<script>
import { parseOfftext, usePtk ,parseAddress, makeAddress, updateUrl,sleep} from 'ptk';
import {_,getLangClass} from './textout.js'
import {get} from 'svelte/store'
import {selectedptks,address,tosim,palitrans, APPVER} from './store.js';
import NextPrev from './nextprev.svelte'
let lines=[];
$: ptks=$selectedptks;
let highlightline=-1;
let loadmessage='';
const loadText=async ()=>{
    sleep(500);
    loadmessage='version '+APPVER+ ', address:'+get(address);
    //await sleep(1000)
    loadmessage='loading '+$address;
    const addr=$address;
    if (!addr) return;
    highlightline=parseAddress(addr).highlightline;
    const out=[],langs=[];
    
    for (let i=0;i<ptks.length;i++) {
        const ptk=usePtk(ptks[i]);
        const offtext=await ptk.fetchAddress(addr);
        const texts=offtext.map(it=>parseOfftext(it)[0]);
        out[i]=texts;
        langs[i]=ptk.attributes.lang;
    }
    //await sleep(1000)
    loadmessage='out.length '+out.length;

    lines.length=0;
    for (let i=0;i<out[0].length;i++) {
        for (let j=0;j<ptks.length;j++) {
            lines.push([langs[j], out[j][i]])
        }
    }
    //await sleep(1000)
    loadmessage='line.length '+lines.length;

    lines=lines;
    
    //await sleep(1000)
    loadmessage='';
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
{loadmessage}
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