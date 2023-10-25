<script>
import { splitUTF32Char } from 'ptk';
import {searchable,activeptk,searchmode,tofind,sentat,clauseonly} from './store.js'
import {_} from './textout.ts'
import Sent from './sent.svelte'
import Excerpt from './excerpt.svelte'
import SearchHelp from './searchhelp.svelte'
let theinput='',activeidx=-1, value='', searchablestart=0, sentmatchmode=0;
const items=[],excerpts=[];
const setInput=idx=>{
    let tf='';
    if (searchablestart>=idx) searchablestart=0;
    for (let i=searchablestart;i<=idx;i++) {
        tf+=items[i]||''
    }
    if (idx==activeidx) {
        if (value==tf) {
            value='';
        } else {
            value=tf
            activeidx=-1;
        }
    } else {
        activeidx=idx;
    }
    if ($sentat>-1) sentat.set(-1);
}
let inputtimer=0;
const onchange=()=>{
    activeidx=-1;
    if ($sentat>-1) sentat.set(-1);
    clearTimeout(inputtimer);
    inputtimer=setTimeout(()=>{
        tofind.set(value);
    },250);
}

const makeSearchable=t=>{
    items.length=0;
    const chars=splitUTF32Char(t);
    for (let i=0;i<chars.length;i++) {
        items.push(chars[i]);
    }
    if ($sentat>-1) {
        activeidx=items.length;
    } else {
        if (items.length>=2) activeidx=2;
        else if (items.length==1) activeidx=0;
        else if (items.length==0) activeidx=-1;
    }
}

const incstart=()=>{
    if (searchablestart<activeidx) searchablestart++;
}
const dosearch=()=>{
    excerpts.length=0;
    let tf=value;
    if (activeidx>-1) tf=items.slice(searchablestart,activeidx+1).join('');
    tofind.set(tf)
}

const sentmodecaption=()=>{
    return ['句首','句中','句末'][sentmatchmode];
}
const setsentmode=()=>{
    if ($searchmode=='sent') {
        sentmatchmode=(sentmatchmode+1)%3;
    } else {
        searchmode.set('sent');
    }
}
const excerptCaption=()=>{
    if ($sentat>-1) {
        return $clauseonly?"子句":"全句"
    } else {
        return "摘要"
    }
}
const setexcerptmode=()=>{
    searchmode.set('excerpt');
    if ($sentat>-1) {
        if (!$clauseonly) {
            clauseonly.set(true)
        } else {
            sentat.set(-1);
        }
    }
}
$: makeSearchable($searchable)
$: dosearch( value, activeidx,$searchable, searchablestart,$sentat,$clauseonly);
$: includesent=($sentat>-1)&&!$clauseonly?$sentat:null;
$: excludesent=($sentat>-1)&&$clauseonly ?$sentat:null;
</script>
<div class="bodytext userselectnone">
<span aria-hidden="true" class="clickable" on:click={setsentmode} class:selected={$searchmode=='sent'}>{sentmodecaption(sentmatchmode)}</span>
<span aria-hidden="true" class="clickable" on:click={setexcerptmode} class:selected={$searchmode=='excerpt'}>{excerptCaption($searchmode,$sentat,$clauseonly)}</span>
<input class="tofind" placeholder={_("輸入區")} size={8} class:diminput={activeidx>-1} bind:this={theinput} 
on:focus={onfocus} on:blur={onblur} on:input={onchange} bind:value id="tofind"/>
{#each items as item,idx}
<span aria-hidden="true" class="searchable" class:selectedsearchable={idx<=activeidx&&idx>=searchablestart} on:click={()=>setInput(idx)}>{_(item)}</span>
{/each}
{#if searchablestart<activeidx}
<span aria-hidden="true" class="clickable" on:click={incstart}>＋</span>
{/if}
<div class:hide={$searchmode!=='excerpt'}>
{#if !$tofind}
<SearchHelp/>
{:else}
<Excerpt tofind={$tofind} {includesent} {excludesent} />
{/if}
</div>
<div class:hide={$searchmode!=='sent'}>
<Sent {sentmatchmode}/>
</div>
</div>

