<script>
import { parseOfftext, usePtk } from 'ptk';
import {_} from './textout.js'
import {selectedptks,address,humanAddress,tosim,palitrans} from './store.js';
let lines=[];
$: ptks=$selectedptks;
const nextn=()=>{

}
const prevn=()=>{

}
const loadText=async ()=>{
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
{#key $tosim,$palitrans}
{#each lines as [lang,line],idx}
{#if idx%ptks.length==0}<div class="hr"></div>{/if}
<div class={"partext"+ (idx%ptks.length)+ getLangClass(lang)}>{_(line,lang)}</div>
{/each}
{/key}
<div class="centernav">
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={prevn}>←</span>
{humanAddress()}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={nextn}>→</span>
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
</div>
<style>
</style>