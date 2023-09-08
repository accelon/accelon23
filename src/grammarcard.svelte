<script>
export let data;
export let ptk;
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
{#each items as values}
<div>  
{#each values as g,idx}
{#if g}<span class={"grammar_"+names[idx]}>{labels[idx]}<span class="grammar_value">{g}</span></span>{/if}
{/each}
</div>
{/each}
