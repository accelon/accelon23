<script>
import { TokenType, parseOfftag, sentencize, usePtk} from 'ptk'
import {tosim,palitrans, searchable, sentat, thetab, searchmode} from './store.js'
import {ACC23} from './appconst.js'
import {_} from './textout.ts'
export let linetext='';
export let line=0;
export let lang='';
export let ptkname;
export let highlighted;
export let rendsent=false
const painters=ACC23.painters||{};
$: ptk=usePtk(ptkname)
let snippets=[];
const makeSnippets=(lt,line)=>{
    const arr=sentencize(lt,line);
    const out=[];
    for (let i=0;i<arr.length;i++) {
        const tk=arr[i];
        if (tk.text.startsWith('^')) {
            //foot note and other tag
            const [tagname,attrs]=parseOfftag(tk.text.slice(1));
            const comp=painters[tagname];
            out.push(comp?{comp,attrs,line}:'');
        } else {
            let t=_(tk.text,lang,$tosim,$palitrans)||'';
            if (rendsent && ptk.columns.sent && highlighted) {
                const at=ptk.columns.sent.keys.indexOf(tk.text)
                if (~at) {
                    t+='<span class="sent" at='+at+'>🔍</span>'
                } else if (tk.type>TokenType.SEARCHABLE){
                    t+='<span class="sent" text="'+tk.text+'">🔍</span>'
                }
            }
            out.push(t)
        }
    }
    return out;
}
const onclick=e=>{
    const at=e.target.attributes.at?.value;
    let text=e.target.attributes.text?.value;
    if (!at && ! text) return;
    if (at>-1) {
        text=ptk.columns.sent.keys.get(at);
        sentat.set(at);
    } else if (text){
        sentat.set(-1);
    }
    thetab.set('search');
    searchmode.set('excerpt')
    searchable.set(text);
}
$: snippets=makeSnippets(linetext,line,highlighted,rendsent)
</script>
<div aria-hidden="true" on:click={onclick}>
{#each snippets as snippet}
{#if typeof snippet=='string'}{@html snippet}{:else}<svelte:component
 this={snippet.comp} {ptk} {...snippet.attrs} line={snippet.line} />{/if}
{/each}
</div>