<script>
import {groupNumArray, tokenizeOfftext } from "ptk";
import {palitrans} from './store.js'
import {_} from './textout.ts'
export let linetext;
export let grammar;
//used by sanzang
export const decodeGrammar=raw=>{
    const pertokens=groupNumArray(raw,1); //每個長詞的文法    

    //每個長詞拆分的文法,  如果只有一個元素(即3，見cs/komyoji.js: 56 行)，表示找不文法信息
    const arr=pertokens.map(it=>groupNumArray(it,2).filter(it=>it.length>1))
    return arr;
}

const G=decodeGrammar(grammar);
const selecttoken=(text,idx)=>{
    console.log(text,idx,G[idx])
}

const tokens=tokenizeOfftext(linetext);
//console.log(G,tokens)
</script>
{#each tokens as tk,idx}
{#if tk.text[0]=='^'}
{" "}
{:else}
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<span class="clickable" on:click={()=>selecttoken(tk.text,tk.tkoff)}>{_(tk.text,0,$palitrans)}</span>
{/if}
{/each}
