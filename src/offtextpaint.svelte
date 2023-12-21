<script>
import { TokenType, parseOfftag, sentencize, usePtk,closeBracketOf} from 'ptk'
import {tosim,palitrans, searchable, sentat, thetab, searchmode} from './store.js'
import {ACC23} from './appconst.js'
import {_} from './textout.js'
export let linetext='';
export let line=0;
export let lang='';
export let ptkname='';
export let depth=0;
export let highlighted;
export let rendsent=false
const painters=ACC23.painters||{};
$: ptk=ptkname?usePtk(ptkname):null;
let snippets=[];
const makeSnippets=(lt,line)=>{
    const arr=sentencize(lt,line);
    const out=[];
    let i=0;
    const _tosim=$tosim,_palitrans=$palitrans;
    while (i<arr.length) {
        const tk=arr[i];
        if (tk.text.startsWith('^')) {
            //foot note and other tag
            const [tagname,attrs]=parseOfftag(tk.text.slice(1));
            const comp=painters[tagname];
            let caption='';
            if (i+3<arr.length) {//check if has enclosing
                const closing=closeBracketOf(arr[i+1].text);
                if (closing) {
                    let j=i+2;
                    // console.log('closing',closing,arr[i+1].text)
                    while (j<arr.length) {
                        if (arr[j].text==closing) break;
                        j++;
                    }
                    if (j<arr.length&&arr[j].text==closing) {
                        caption=arr.slice(i+2,j).map(it=>it.text).join('');
                        if (!comp) caption=_(caption,lang,_tosim,_palitrans);
                        i=j;
                    }
                }
            }
            out.push(comp?{comp,attrs,line,highlighted,caption,lang}:'<span class="offtag_'+tagname+'">'+caption+'</span>');

        } else {
            let t=_(tk.text,lang,_tosim,_palitrans)||'';
            if (rendsent && ptk.columns.sent && highlighted) {
                const at=ptk.columns.sent.keys.indexOf(tk.text)
                if (~at) {
                    t+='<span class="sent" at='+at+'>🔍</span>'
                } else if (tk.type>TokenType.SEARCHABLE){
                    t+='<span class="sent" text="'+tk.text+'">🔍</span>'
                }
            }
            out.push(t);
        }
        i++
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
<span aria-hidden="true" on:click={onclick}>
{#each snippets as snippet}
{#if typeof snippet=='string'}{@html snippet}{:else}<svelte:component
 this={snippet.comp} {ptk} {...snippet.attrs} 
 caption={snippet.caption} lang={snippet.lang} {depth}
 highlighted={snippet.highlighted} line={snippet.line} />{/if}
{/each}
</span>