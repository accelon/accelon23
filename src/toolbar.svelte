<script>
import Toc from './toc.svelte'
import About from './about.svelte'
import {availableptks,selectedptks,hasupdate,thetab,activeptk, address} from './store.js'
import {updateUrl, usePtk} from 'ptk'
import NextPrev from './nextprev.svelte'
import SearchMain from './searchmain.svelte'
import ExternalLinks from './externallinks.svelte'
import { _ } from './textout';

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
    if ($thetab=='about') {
        const arr=$selectedptks;
        if (arr.length>0) {
            const at=arr.indexOf(name);
            if (~at) {
                if (arr.length>1) arr.splice(at,1);
            } else arr.push(name);
            const a2=arr.slice(0,arr.length);
            selectedptks.set(a2);  
        }        
    } else if ($thetab=='toc'){
        let arr=$selectedptks;
        const at=arr.indexOf(name);
        if (~at) {
            arr.splice(at,1);
        }
        arr.unshift(name);
        selectedptks.set(arr);
    } else {
        if (~$selectedptks.indexOf(name)) activeptk.set(name);
    }
}
const tabcaption=(tab)=>{
    if (tab=='search') {
        return _('設<span class="selected">主庫</span>')
    } else if (tab=='about'){
        return _('設順序')
    } else if (tab=='toc'){
        return _('設<span class="partext0 rootptk">首庫</span>')
    }
}
</script>
<div class="tabs">    
    <span aria-hidden="true" class='clickable' class:needupdate={$hasupdate} class:selected={$thetab=="about"} on:click={()=>toggleTab("about")}>{@html "&nbsp;"} ⚙️</span>
    <span aria-hidden="true" class='clickable' class:selected={$thetab=="toc"} on:click={()=>toggleTab("toc")}>🧭</span>
    <span aria-hidden="true" class='clickable' class:selected={$thetab=="search"} on:click={()=>toggleTab("search")}>🔍</span>

    <!-- {#if $selectedptks[0]=='cs'} -->
    {#each $availableptks as name}
    <span aria-hidden="true" class={"clickable partext"+$selectedptks.indexOf(name)} class:rootptk={$selectedptks[0]==name} 
    class:selected={name==$activeptk} 
    on:click={()=>selectptk(name)}>{ptkCaption(name)}</span>
    {/each}
    
    {#if !$thetab}<NextPrev/>
    {:else}
        {@html tabcaption($thetab)}
    {/if}
    <ExternalLinks/>
</div>

<div class="tab-content" class:visible={$thetab=='about'}><About/></div>
<div class="tab-content" class:visible={$thetab=='toc'}><Toc/></div>
<div class="tab-content" class:visible={$thetab=='search'}><SearchMain/></div>
<!-- <div class="tab-content" class:visible={thetab=='grammar'}><Grammar/></div> -->