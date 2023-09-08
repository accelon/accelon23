<script>
import {groupNumArray, tokenizeOfftext } from "ptk";
import {palitrans} from './store.js'
import {_} from './textout.ts'
import GrammarCard from './grammarcard.svelte'
export let linetext;
export let grammar;
export let ptk;
//used by sanzang
let tkoff=-1;
let tokengrammar=[]
export const decodeGrammar=raw=>{
    const pertokens=groupNumArray(raw,1); //每個長詞的文法    

    //每個長詞拆分的文法,  如果只有一個元素(即3，見cs/komyoji.js: 56 行)，表示找不文法信息
    const arr=pertokens.map(it=>groupNumArray(it,2).filter(it=>it.length>1))
    tkoff=-1;
    tokengrammar='';
    return arr;
}

$: G=decodeGrammar(grammar);
const selecttoken=(text,idx)=>{
    tkoff=tkoff==idx?-1:idx;
    tokengrammar=G[tkoff]||[];
}

$: tokens=tokenizeOfftext(linetext);
//console.log(G,tokens)
</script>
{#each tokens as tk}
{#if tk.text[0]=='^'}
{" "}
{:else}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="clickable" class:selected={tk.tkoff==tkoff} on:click={()=>selecttoken(tk.text,tk.tkoff)}>{_(tk.text,0,$palitrans)}</span>
{/if}
{/each}
<GrammarCard {ptk} data={tokengrammar}/>