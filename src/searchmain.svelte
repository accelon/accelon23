<script>
import { splitUTF32Char ,listExcerpts, parseOfftext, usePtk} from 'ptk';
import {_} from './textout.ts'
import {searchable,activeptk,searchmode,tofind} from './store.js'
import Sent from './sent.svelte'
import Excerpt from './excerpt.svelte'
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
}
let inputtimer=0;
const onchange=()=>{
    activeidx=-1;
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
    if (items.length>=2) activeidx=2;
    else if (items.length==1) activeidx=0;
    else if (items.length==0) activeidx=-1;
}

const incstart=()=>{
    if (searchablestart<activeidx) searchablestart++;
}
const dosearch=()=>{
    excerpts.length=0;
    let tf=value;
    if (activeidx>-1) tf=items.slice(searchablestart,activeidx+1).join('');
    const ptk=usePtk($activeptk)
    tofind.set(tf)
    ptk.scanText(tf).then(res=>{
		scopes=res;
        if (scopes.length) {
           // setScope(1);
        }
	});
}
const setScope=async (idx,range)=>{
    selected=idx;
    pagecount=0;
    const at=Math.floor(idx/2);
    if (!range) {
        rangecaption='';
    }
    const ptk=usePtk($activeptk)
    const {lines,chunks,postings}=await listExcerpts(ptk,tf, range||scopes[at].scope);
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
$: makeSearchable($searchable)
$: dosearch( value, activeidx,$searchable, searchablestart);
</script>
<div class="bodytext userselectnone">
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={setsentmode} class:selected={$searchmode=='sent'}>{sentmodecaption(sentmatchmode)}</span>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={()=>searchmode.set('excerpt')} class:selected={$searchmode=='excerpt'}>摘要</span>


<input class="tofind" placeholder={_("輸入區")} size={8} class:diminput={activeidx>-1} bind:this={theinput} 
on:focus={onfocus} on:blur={onblur} on:input={onchange} bind:value id="tofind"/>
{#each items as item,idx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="searchable" class:selectedsearchable={idx<=activeidx&&idx>=searchablestart} on:click={()=>setInput(idx)}>{_(item)}</span>
{/each}
{#if searchablestart<activeidx}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span class="clickable" on:click={incstart}>＋</span>
{/if}
{#if !items.length}【{_("已選句")}】{/if}

<div class:hide={$searchmode!=='excerpt'}>
<Excerpt/>
</div>
<div class:hide={$searchmode!=='sent'}>
<Sent {sentmatchmode}/>
</div>
</div>

