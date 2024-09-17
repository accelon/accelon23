<script>
import {downloadToCache} from 'ptk/platform/downloader.js'
import {_} from '../textout.js'
import {sleep} from 'ptk'
import {downloadicon} from '../icons.js'
import {cachedMp3} from '../store.js';
import {ACC23} from '../appconst.js'
export let url='';
export let line;
export let ptk,caption,lang,highlighted,depth,filesize=0;
$: ptk,caption,length,lang,highlighted,depth
//TODO only show control when highlighted
$: line
// $: console.log(line,filesize,highlighted)
let downloading=false,progress='';
const downloadit=async (url)=>{
    downloading=url;
    await downloadToCache(ACC23.CacheName,url,msg=>{
        progress=msg;
    });
    await sleep(1000); //wait for cache to sync
    const cached=$cachedMp3.concat(url.replace('.mp3',''));
    cachedMp3.set(cached)
    downloading='';
    progress='';
}
</script>
{#if !~$cachedMp3.indexOf(url.replace('.mp3',''))} 
<span aria-hidden="true" class="clickable" on:click={()=>!downloading&&downloadit(url)}>{@html downloadicon}{filesize||''}</span>
{#if downloading==url}{progress}{/if}
{:else}
<audio controls height="32" loop=true>
<source src={url} type="audio/mpeg"/>
</audio>
{/if}
