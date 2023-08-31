<script>
import { parseOfftext, usePtk } from 'ptk';
import {_} from './textout.js'
import {selectedptks,address,tosim,palitrans} from './store.js';
import NextPrev from './nextprev.svelte'
let lines=[];
$: ptks=$selectedptks;

const loadText=async ()=>{
    console.log('loadtext')
    const addr=$address;
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
const getLangClass=lang=>{
    if (lang=='zh') return '';
    else if (lang=='en') return ' lang-en';
    else if (lang=='pp') return ' lang-pp-'+$palitrans;
}
$: loadText($address,$selectedptks);
</script>
<div class="bodytextarea bodytext">

{#each lines as [lang,line],idx}
{#if idx%ptks.length==0 && $selectedptks.length>1}<div class="hr"></div>{/if}
<div class={"partext"+ (idx%ptks.length)+ getLangClass(lang)}>{_(line,lang,$tosim,$palitrans)}</div>
{/each}

<NextPrev/>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
</div>
<style>
</style>