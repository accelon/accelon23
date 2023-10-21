<script>
import { TokenType, sentencize, usePtk} from 'ptk'
import {tosim,palitrans, searchable, sentat, thetab} from './store.js'
import {_} from './textout.ts'
export let linetext='';
export let line=0;
export let lang='';
export let ptkname;
export let highlighted;

const ptk=usePtk(ptkname)
let snippets=[];
const makeSnippets=(lt,line)=>{
    return sentencize(lt,line);
}
const renderSnippet=tk=>{
    if (tk.text.startsWith('^')) {
        //foot note and other tag
        return ''
    } else {
        let t=_(tk.text,lang,$tosim,$palitrans)||'';
        if (ptk.columns.sent && highlighted) {
            const at=ptk.columns.sent.keys.indexOf(tk.text)
            if (~at) {
                t+='<span class="sent" at='+at+'>🔍</span>'
            } else if (tk.type>TokenType.SEARCHABLE){
                t+='<span class="sent" text="'+tk.text+'">🔍</span>'
            }
        }
        return t;
    }
}
const onclick=e=>{
    const at=e.target.attributes.at?.value;
    let text=e.target.attributes.text?.value;
    if (at>-1) {
        text=ptk.columns.sent.keys.get(at);
        sentat.set(at);
    } else {
        sentat.set(-1);
    }
    thetab.set('search');
    searchable.set(text);
}
$: snippets=makeSnippets(linetext,line,highlighted)
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={onclick}>
{#each snippets as snippet}
{@html renderSnippet(snippet)}
{/each}
</div>