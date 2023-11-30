<script>
import {groupNumArray, tokenizeOfftext,TokenType } from "ptk";
import {palitrans} from './store.js'
import {_,getLangClass} from './textout.js'
import GrammarCard from './grammarcard.svelte'
import { orthOf ,parseFormula} from "provident-pali";
export let linetext;
export let grammar;
export let ptk;
//used by sanzang
let tkoff=-1;
let tokengrammar=[],lexemes=[];
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
    lexemes=text.split(/\d/);
    tokengrammar=G[tkoff]||[];
}
const gettokentext=(tk)=>{
    const text=tk.text;
    const selected=isSelected(tk);
    if (text.match(/[A-Za-z]\d/)) {
        const lex=parseFormula(text);
        if (selected) {
            return _(text,"pp").split(/\d/);
        } else {
            return [_(orthOf(lex),"pp")];
        }
    } else {
        return [_(text,"pp",0,$palitrans)];
    }    
}
$: tokens=tokenizeOfftext(linetext);
const isSelected=tk=>{
    return tk.tkoff==tkoff&&tk.type>TokenType.SEARCHABLE
}
</script>
{#each tokens as tk}
{#if tk.text[0]=='^'}
{" "}
{:else}
<span  aria-hidden="true"  class={"clickable "+getLangClass("pp",$palitrans)} class:selected={isSelected(tk,tkoff)} 
on:click={()=>selecttoken(tk.text,tk.tkoff)}>
{#each gettokentext(tk,tkoff,$palitrans) as token,idx}
<span class={"part_"+(idx%2?"odd":"even")}>{token}</span>
{/each}
</span>
{/if}
{/each}

<GrammarCard {ptk} data={tokengrammar} {lexemes}/>