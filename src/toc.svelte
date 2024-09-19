<script>
import {debounce,usePtk,parseAddress} from 'ptk'
import Slider from 'offtextview/3rdparty/rangeslider.svelte'
import {curPtk,setNewAddress} from './address.js'
import { address, selectedptks,tosim,palitrans} from './store.js'
import {_,getLangClass} from './textout'
import {get} from 'svelte/store'
let baseptk;
const initval=$address?curPtk().tagAtAction( parseAddress($address).action ):[];
let ak=[(initval[0]?.at||0),0], 
ck=[(initval[1]?.at||0),0], 
n=[(initval[2]?.at||0),0],minN=0, maxN=0,minCk=0,maxCk=0,maxAk=0;

const update=()=>{
    const newptk=usePtk($selectedptks[0]);
    if (baseptk!==newptk) {
        baseptk=newptk;
        const ak=baseptk.defines.ak;
        maxAk=ak.fields.id.values.length-1;
        updateAk();
    }
}
const updateAk=()=>{
    if (!baseptk)return;
    const akfield=baseptk.defines.ak;
    if (ak[0]>maxAk) ak[0]=maxAk;
    const [from,till]=baseptk.rangeOfAddress('ak#'+akfield.fields.id.values[ak[0]]);
    [minCk,maxCk]=baseptk.tagInRange("ck",from,till);
    if (ck[0]<minCk||ck[0]>=maxCk) ck[0]=minCk;
    updateCk();
}
const hasN=()=>{
    if (!baseptk)return;
    return maxN>minN+1;
}
const updateCk=()=>{
    if (!baseptk)return;
    const akfield=baseptk.defines.ak; 
    const ckfield=baseptk.defines.ck;
    if (ck[0]>maxCk) ck[0]=minCk;
    const [from,till]=baseptk.rangeOfAddress('ak#'+akfield.fields.id.values[ak[0]]
    +'.ck#'+ckfield.fields.id.values[ck[0]]);
    [minN,maxN]=baseptk.tagInRange("n",from,till);
    if (n[0]<minN || n[0]>=maxN) n[0]=minN;
    console.log('ck',minCk,maxCk)
    updateAddress();
}

const updateAddress=()=>{
    if (!baseptk) return;
    const akfield=baseptk.defines.ak;
    const ckfield=baseptk.defines.ck;
    const nfield=baseptk.defines.n;
    if (!akfield||!ckfield||!nfield) return;
    const _addr=parseAddress(get(address));

    const addr='ak#'+akfield.fields.id.values[ak[0]]
    +'.ck#'+ckfield.fields.id.values[ck[0]]
    +'.n'+nfield.fields.id.values[n[0]]
    + (_addr.highlightline>0?':'+_addr.highlightline:'')
  
    if (get(address)!==addr) {
        setNewAddress(addr);

    }
}
const getAkCaption=idx=>{
    let ptk=usePtk($selectedptks[0]);
    return _(ptk.defines.ak.getInnertext(idx),baseptk.attributes.lang,$tosim,$palitrans);
}
const getCkCaption=idx=>{
    const id=baseptk.defines.ck.fields.id.values[idx]
    return _(baseptk.defines.ck.getInnertext(idx),baseptk.attributes.lang,$tosim,$palitrans)+'('+(id)+')';
}
const getNCaption=idx=>{
    if (!baseptk.defines.n) return idx;
    const id=baseptk.defines.n.fields.id.values[idx]
    return id;
}
const setAk=(e)=>{
    ak[0]=e.detail[0];
    updateAk();
}
const setCk=(e)=>{
    ck[0]=e.detail[0];
    updateCk();
}
const setN=(e)=>{
    n[0]=e.detail[0];
    updateAddress();
}

$: update($selectedptks);

</script>

<div class="bodytext">
{#key $palitrans}
{#if maxAk>0}
<Slider bind:value={ak} min={0} max={maxAk} on:input={debounce(setAk,300)}>
<span slot="caption" class={"slidercaption "+getLangClass(baseptk.attributes.lang,$palitrans)}>{getAkCaption(ak[0],baseptk)}</span>
</Slider>
{/if}
<Slider bind:value={ck} min={minCk} max={maxCk}  on:input={debounce(setCk,300)}>
    <span slot="caption" 
    class={"slidercaption "+getLangClass(baseptk.attributes.lang,$palitrans)}
    >{getCkCaption(ck[0],baseptk,ak[0])}</span>
</Slider>
{#if hasN()}
<Slider bind:value={n} min={minN} max={maxN}  on:input={debounce(setN,300)}>
        <span slot="caption" class="slidercaption">{getNCaption(n[0],baseptk,ak[0],ck[0])}</span>
</Slider>
{/if}
{/key}
</div>