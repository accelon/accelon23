<script>
import {_} from '../textout.js'
import {onDestroy} from 'svelte'
import {cachedMp3} from '../store.js';
export let url='';
export let line;
export let ptk,caption,lang,highlighted,depth,start,end;
$: ptk,caption,length,lang,highlighted,depth
$: line
let timer;
onDestroy(()=>{
    clearTimeout(timer)
});
function playPause(e) {
    const track=document.getElementById("track")
    const controlBtn=e.target;
    if (track.paused) {
        track.currentTime=parseFloat(start)||0;
        const duration= (parseFloat(end)||track.currentTime)- track.currentTime;
        clearTimeout(timer)
        timer=setTimeout(()=>{
            track.pause();
            controlBtn.textContent = "▶️";
        },duration*1000);
        track.play();
        controlBtn.textContent = "⏹️";
    } else { 
        track.pause();
        controlBtn.textContent = "▶️";
    }
}
</script>
{#if ~$cachedMp3.indexOf(url.replace('.mp3','')) && highlighted} 
<audio id="track">
<source src={url} type="audio/mpeg"/>
</audio>
<span aria-hidden={true} id="play-pause" on:click={playPause} class="clickable">▶️</span>
{/if}
<style>

</style>