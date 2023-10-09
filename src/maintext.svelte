<script>
import { parseOfftext, usePtk ,parseAddress, makeAddress, updateUrl, rangeOfAddress} from 'ptk';
import {_,getLangClass} from './textout.js'
import TextWithGrammar from './grammartext.svelte'
import {selectedptks,address,tosim,palitrans,curPtk,activeparaonly} from './store.js';
import NextPrev from './nextprev.svelte'
import SwipeView from './comps/swipeview.svelte'
import {nextn,prevn} from './nextprev.js'
let lines=[];
let ptks=[];
let highlightline=0;
let loadmessage='';

const loadText=async ()=>{
    const addr=$address;
    loadmessage=_('如果卡在這裡，請重刷頁面(F5)。loading ')+addr;
    if (!addr) return;
    const _addr=parseAddress(addr);
    highlightline=_addr.highlightline;
    if (highlightline<0) highlightline=0;
    
    const out=[],langs=[];
    const pt=$palitrans;
    let grammars=[];
    const pptks=curPtk().enumParallelsPtk(_addr.action);

    ptks=$selectedptks.filter((id,idx)=>idx==0||~pptks.indexOf(id));
    for (let i=0;i<ptks.length;i++) {
        const ptk2=usePtk(ptks[i]);
        const texts=await ptk2.fetchAddress(addr);
        if (ptks[i]=='cs') {            
            grammars=await ptk2.fetchAddressExtra(addr);
        }
        out[i]=texts;
        langs[i]=ptk2.attributes.lang;
    }
    lines.length=0;
    for (let i=0;i<out[0].length;i++) {
        for (let j=0;j<ptks.length;j++) {
            lines.push([langs[j], out[j][i], ptks[j]=='cs'?grammars[i]:null, ptks[j] ])
        }
    }
    lines=lines;
    if (lines.length) loadmessage='';
    console.log(lines)
}
const sethighlightline=i=>{
    highlightline=i;
    const addr=parseAddress($address);
    addr.highlightline=highlightline;
    address.set(makeAddress(addr))
    updateUrl($address)
}
const onswipe=e=>{
    if (e==-1) prevn();
    else if (e==1) nextn();
}

$: loadText($address,$selectedptks);
</script>
<SwipeView onSwipe={onswipe}>
<div class="bodytextarea bodytext">
{loadmessage}
{#each lines as [lang,linetext,grammar,ptkname],idx}
{#if $activeparaonly=='0' || idx%ptks.length==0 || highlightline==Math.floor(idx/ptks.length)}
{#if idx%ptks.length==0 && ptks.length>1}<div class="hr"></div>{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={()=>sethighlightline(Math.floor(idx/ptks.length))}
class:parselected={highlightline== Math.floor(idx/ptks.length) }
class={"partext partext"+ ($selectedptks.indexOf(ptkname))+" " + getLangClass(lang,$palitrans)}>
{#if grammar}
<TextWithGrammar {grammar} {linetext} ptk={usePtk(ptkname)}/>
{:else}
{_(parseOfftext(linetext)[0],lang,$tosim,$palitrans)}
{/if}
</div>
{/if}
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
</SwipeView>