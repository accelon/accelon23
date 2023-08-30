<script>
    import { parseOfftext, usePtk } from 'ptk';
import {selectedptks,address} from './store.js';
let lines=[];
$: ptks=$selectedptks;
const loadText=async ()=>{
    
    const addr=$address;
    const out=[];
    
    for (let i=0;i<ptks.length;i++) {
        const ptk=usePtk(ptks[i]);
        const offtext=await ptk.fetchAddress(addr);
        const texts=offtext.map(it=>parseOfftext(it)[0]);
        out[i]=texts;
    }

    lines.length=0;
    for (let i=0;i<out[0].length;i++) {
        for (let j=0;j<ptks.length;j++) {
            lines.push( out[j][i])
        }
    }
    
    lines=lines;
}
$: loadText($address,$selectedptks);
</script>
<div class="bodytextarea bodytext">
{#each lines as line,idx}
{#if idx%ptks.length==0}<div class="hr"></div>{/if}
<div class={"partext"+ (idx%ptks.length)}>{line}</div>
{/each}

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
</div>
<style>
</style>