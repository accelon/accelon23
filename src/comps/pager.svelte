<script>
let pages=[];
export let count=0;   // auto page
export let now=0;
export let previtems=1;
export let nextitems=3;
export let onselect;
export let caption='';
import SwipeView from './swipeview.svelte'
let left=now-previtems;
let right=now+nextitems+1;
const neighbors=[];
let last=null;

const makeNeighbors=()=>{
    now=parseInt(now);
    if (now>=pages.length) now=0;
    left=now-previtems;
    right=now+nextitems+1;
    if (left<2) left=1;
    if (right>=pages.length) right=pages.length-1;
    neighbors.length=0;

    for (let j=left;j<right;j++) {
        neighbors.push( pages[j])
    }
    right+=10;
    if (right<pages.length-2) neighbors.push(pages[right]);
    right+=30;
    if (right<pages.length-2) neighbors.push(pages[right]);
    
    if (pages.length>1) last=pages[pages.length-1];
    else last=null;
    
}
const makepages=()=>{
    if (count && pages.length!==count) {
        pages.length=0;
        for (let i=0;i<count;i++) {
            pages.push({caption:i+1,id:i+1,idx:i});
        }
        makeNeighbors();
    }
}
$:makeNeighbors(now,pages);
$:makepages(pages,count)

console.log('pages',pages)
const onswipe=(direction)=>{
    now+=direction;
    if (now<0) now=0;
    if (now>=pages.length-1) now=pages.length-1;
    onselect&&onselect(now);
}
</script>

<SwipeView onSwipe={onswipe} caption={caption?"→"+caption:''}>
{#if pages.length>1}
<slot active={pages[0].idx==now} caption={'['+pages[0].caption} idx=0 id={pages[0].id}></slot>
{/if}
{#each neighbors as page}
<slot active={page.idx==now} caption={page.caption+' '} idx={page.idx} id={page.id}></slot>
{/each}
{#if last}
<slot active={last.idx==now} caption={last.caption+']'} idx={last.idx} id={last.id}></slot>
{/if}
</SwipeView>