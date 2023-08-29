<script>
import {debounce,usePtk} from 'ptk'
import Slider from './3rd/rangeslider.svelte'
import { selectedptks} from './store.js'
let ak=[0,0], ck=[0,0], n=[0,0],minN=0, maxN=0,minCk=0,maxCk=0,maxAk=10;
let baseptk;


const update=()=>{
    baseptk=usePtk($selectedptks[0]);
    const ak=baseptk.defines.ak;
    maxAk=ak.fields.id.values.length-1;
    updateAk();
}
const updateAk=()=>{
    if (!baseptk)return;
    const akfield=baseptk.defines.ak;
    if (ak[0]>maxAk) ak[0]=maxAk;
    const [from,till]=baseptk.rangeOfAddress('ak#'+akfield.fields.id.values[ak[0]]);
    [minCk,maxCk]=baseptk.tagInRange("ck",from,till);
    ck[0]=minCk;
    updateCk();
}

const updateCk=()=>{
    if (!baseptk)return;
    const akfield=baseptk.defines.ak;
    const ckfield=baseptk.defines.ck;
    if (ck[0]>maxCk) ck[0]=maxCk;
    const [from,till]=baseptk.rangeOfAddress('ak#'+akfield.fields.id.values[ak[0]]
    +'.ck#'+ckfield.fields.id.values[ck[0]]);
    [minN,maxN]=baseptk.tagInRange("n",from,till);
    n[0]=minN;
    updateText();
}
const updateText=()=>{

}
const getAkCaption=idx=>{
    let ptk=usePtk($selectedptks[0]);
    return ptk.defines.ak.innertext.get(idx);
}
const getCkCaption=idx=>{
    const id=baseptk.defines.ck.fields.id.values[idx]
    return id+':'+baseptk.defines.ck.innertext.get(idx);
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
    updateText();
}

$: update($selectedptks);
// $: console.log(baseptk)
</script>

<div class="bodytext">

<Slider bind:value={ak} min={0} max={maxAk} on:input={debounce(setAk,300)}>
<span slot="caption" class="slidercaption">{getAkCaption(ak[0],baseptk)}</span>
</Slider>
<Slider bind:value={ck} min={minCk} max={maxCk}  on:input={debounce(setCk,300)}>
    <span slot="caption" class="slidercaption">{getCkCaption(ck[0],baseptk,ak[0])}</span>
</Slider>
<Slider bind:value={n} min={minN} max={maxN}  on:input={debounce(setN,300)}>
        <span slot="caption" class="slidercaption">{getNCaption(n[0],baseptk,ak[0],ck[0])}</span>
</Slider>
</div>