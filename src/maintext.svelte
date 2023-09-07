<script>
import { parseOfftext, usePtk ,parseAddress, makeAddress, updateUrl,sleep} from 'ptk';
import {_,getLangClass} from './textout.js'
import {get} from 'svelte/store'
import TextWithGrammar from './grammartext.svelte'
import {selectedptks,address,tosim,palitrans, APPVER} from './store.js';
import NextPrev from './nextprev.svelte'
let lines=[];
$: ptks=$selectedptks;
let highlightline=-1;
let loadmessage='';

const loadText=async ()=>{
    loadmessage=_('如果卡在這裡，請重刷頁面(F5)。loading ')+$address;
    const addr=$address;
    if (!addr) return;
    highlightline=parseAddress(addr).highlightline;
    const out=[],langs=[];
    for (let i=0;i<ptks.length;i++) {
        const ptk=usePtk(ptks[i]);
        const texts=await ptk.fetchAddress(addr);
        if (i==0&&ptks[i]=='cs') {
            grammars=await ptk.fetchAddressExtra(addr);
        }
        out[i]=texts;
        langs[i]=ptk.attributes.lang;
    }
    lines.length=0;
    for (let i=0;i<out[0].length;i++) {
        for (let j=0;j<ptks.length;j++) {
            lines.push([langs[j], out[j][i], j==0?grammars[i]:'' ])
        }
    }
    lines=lines;

    if (lines.length) loadmessage='';
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
{#each lines as [lang,linetext,grammar],idx}
{#if idx%ptks.length==0 && ptks.length>1}<div class="hr"></div>{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={()=>sethighlightline(Math.floor(idx/ptks.length))}
class:parselected={highlightline== Math.floor(idx/ptks.length) }
class={"partext partext"+ (idx%ptks.length)+ getLangClass(lang,$palitrans)}>
{#if grammar}
<TextWithGrammar {grammar} {linetext}/>
{:else}
{_(linetext,lang,$tosim,$palitrans)}
{/if}
</div>
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