<script>
import Toc from './toc.svelte'
import About from './about.svelte'
import {availableptks,selectedptks,hasupdate,thetab,activeptk} from './store.js'
import {usePtk} from 'ptk'
import NextPrev from './nextprev.svelte'
import SearchMain from './searchmain.svelte'
import ExternalLinks from './externallinks.svelte'

const toggleTab=tab=>{
    if (tab==$thetab) {
        thetab.set('')
    } else thetab.set(tab);
}
const ptkCaption=name=>{
    const ptk=usePtk(name)
    if (!ptk) return name;
    let zh=ptk.attributes.zh;
    const at=zh.indexOf("|");
    zh=at>0?zh.slice(0,at):zh;
    return zh;
}
const selectptk=name=>{
    if ($thetab=='search') {
        if (~$selectedptks.indexOf(name)) activeptk.set(name);
    } else {
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
}
</script>
<div class="tabs">    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class='clickable' class:needupdate={$hasupdate} class:selected={$thetab=="about"} on:click={()=>toggleTab("about")}>{@html "&nbsp;"} ⚙️</span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class='clickable' class:selected={$thetab=="toc"} on:click={()=>toggleTab("toc")}>🧭</span>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class='clickable' class:selected={$thetab=="search"} on:click={()=>toggleTab("search")}>🔍</span>

    <!-- {#if $selectedptks[0]=='cs'} -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- <span class='clickable' class:selected={$thetab=="grammar"} on:click={()=>toggleTab("grammar")}>🧱</span> -->
    <!-- {/if} -->
    {#each $availableptks as name}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <span class={"clickable partext"+$selectedptks.indexOf(name)} class:rootptk={$selectedptks[0]==name} 
    class:selected={name==$activeptk} 
    on:click={()=>selectptk(name)}>{ptkCaption(name)}</span>
    {/each}
    {#if !$thetab}<NextPrev/>{/if}
    <ExternalLinks/>
</div>

<div class="tab-content" class:visible={$thetab=='about'}><About/></div>
<div class="tab-content" class:visible={$thetab=='toc'}><Toc/></div>
<div class="tab-content" class:visible={$thetab=='search'}><SearchMain/></div>
<!-- <div class="tab-content" class:visible={thetab=='grammar'}><Grammar/></div> -->