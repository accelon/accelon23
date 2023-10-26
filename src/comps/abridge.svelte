<script>/* 隱藏不含關鍵字的句子 , base on from accelon22/src */
import {renderOfftext,abridgeRenderUnits,TokenType,MIN_ABRIDGE} from 'ptk';
import Button from '../comps/button.svelte';
export let hits=[]; 
if (!hits.length) hits=[0];//display begining snippet
export let phraselength=[5];//make sure first token is highlighted
export let text='';
$: [runits]=renderOfftext(text,{hits,phraselength});
$: abridges=abridgeRenderUnits(runits,20,refreshcount);
let refreshcount=1;
const expand=(idx,direction=0)=>{
	const R=runits;
	const [len,from]=abridges[idx];
	const start=from + (direction==-1?len:0);
	let j=start;
	if (direction==-1) {
		while (j>0&& (R[j].token.type>=TokenType.SEARCHABLE|| start-j<MIN_ABRIDGE )) j--;
		for (let i=j;i<start;i++) R[i].luminate++;
	} else if (direction==1){
		while (j<R.length&& (R[j].token.type>=TokenType.SEARCHABLE||j-start<MIN_ABRIDGE)) j++;
		for (let i=start;i<j;i++) R[i].luminate++;
	} else {
		for (let i=from;i<from+len;i++) R[i].luminate++;
	}
	refreshcount++;
}
</script>
{#key refreshcount}
{#each abridges as ab,idx}
{#if Array.isArray(ab)}
{#if ab[1] && ab[0]>10}<Button 
onclick={()=>expand(idx,1)}>…</Button>{/if}<Button className="abridged"  
onclick={()=>expand(idx)}>{ab[0]}</Button>{#if !ab[2]}<Button 
onclick={()=>expand(idx,-1)}>…</Button>{/if}
{:else}
<slot tk={ab}>{ab.text}</slot>
{/if}
{/each}
{/key}

