<script>
import {_,getLangClass} from './textout.js'
import {palitrans} from './store.js'
export let data;
export let ptk;
export let lexemes=[]
let items=[];
const names=['root','ps', 'base','gender','num','cas','meaning'];
const labels=['根','类','基','性','数','格','义']
const updateGrammar=()=>{
    items=(data||[]).map(it=>{
        const out=[];
        for (let i=0;i<names.length;i++) {
            const name=names[i];
            out.push(ptk.columns['grammar_'+name+'s'].fieldByKey(it[i])||'')
        }
        return out;
    })
}
$: updateGrammar(data)
</script>
{#if items.length}
<table class="table">
<tr>
<td class="tablehead">件</td>
{#each labels as label,idx}
<td class="tablehead">{labels[idx]}</td>
{/each}
</tr>

{#each items as values,i}
<tr><td class="tablecell">
<span class={getLangClass("pp",$palitrans)}>{_(lexemes[i],"pp",0,$palitrans)}</span>
</td>
{#each values as g,idx}
<td class="tablecell">
{#if g}<span class="grammar_value">{g}</span>{/if}
</td>
{/each}
</tr>
{/each}
</table>
{/if}