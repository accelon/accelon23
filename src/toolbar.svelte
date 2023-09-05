<script>
import Toc from './toc.svelte'
import About from './about.svelte'
import {ptks,selectedptks,address} from './store.js'
import {usePtk} from 'ptk'
import NextPrev from './nextprev.svelte'
let thetab=$address?'':'toc';

const toggleTab=tab=>{
    if (tab==thetab) {
        thetab=''
    } else thetab=tab;
}
const ptkCaption=name=>{
    const ptk=usePtk(name)
    let zh=ptk.attributes.zh;
    const at=zh.indexOf("|");
    zh=at>0?zh.slice(0,at):zh;
    return zh;
}
const selectptk=name=>{
    const arr=$selectedptks;
    if (arr.length>0) {
        const at=arr.indexOf(name);
        if (~at) {
            if (arr.length>1) arr.splice(at,1);
        } else arr.push(name);
        const a2=arr.slice(0,arr.length);
        selectedptks.set(a2);  
    }
}
</script>
<div class="tabs">    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class='clickable' class:selected={thetab=="about"} on:click={()=>toggleTab("about")}>{@html "&nbsp;"} ⚙️</span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class='clickable' class:selected={thetab=="toc"} on:click={()=>toggleTab("toc")}>🧭</span>

    {#each ptks as name}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class={"clickable partext"+$selectedptks.indexOf(name)} class:rootptk={$selectedptks[0]==name} 
    class:selected={~$selectedptks.indexOf(name)} 
    
    on:click={()=>selectptk(name)}>{ptkCaption(name)}</span>
    {/each}
    {#if !thetab}<NextPrev/>{/if}
</div>

<div class="tab-content" class:visible={thetab=='about'}><About/></div>
<div class="tab-content" class:visible={thetab=='toc'}><Toc/></div>