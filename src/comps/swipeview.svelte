<script>
import {swipeprev,swipenext} from './swipeshapes.js';
const swipeshapes=[swipeprev , ,swipenext];
export let onSwipe;
export let caption='';
let touching=-1;
let touchx=0,touchy=0,startx=0,starty=0,direction=0;
const ontouchstart=(e)=>{
    direction=0;
	if (e.touches.length==1){
		startx=e.touches[0].pageX;
		starty=e.touches[0].pageY;
		touchx=startx;
		touchy=starty;
        touching=1;
	}  
}

const getDirection=()=>{
	// if (Math.abs(touchy-starty)>30) return 0;
	const deltax=touchx-startx;
    const deltay=touchy-starty;
	if (deltax>30 && Math.abs(deltay)<Math.abs(deltax)/2 ) {
		return 1;
	} else if (deltax<-30 && Math.abs(deltay)<Math.abs(deltax)/2) {
		return -1;
	}
	return 0;
}
const ontouchmove=(e)=>{
	if (touching==-1)return;
	if (touching>-1) {
		touchx=e.touches[0].pageX;
		touchy=e.touches[0].pageY;
		direction=getDirection();
	}
}
const ontouchend=e=>{
	if (touching!==-1 && direction!==0) {
        onSwipe&&onSwipe(direction);
	} else {
        // onclick(e,touchx,touchy);
    }
	touching=-1; 
	direction=0;    
}
const next=()=>{
	onSwipe&&onSwipe(1);
}
</script>
{#if touching>-1 && direction}<span class="swipe">{@html swipeshapes[direction+1]}</span>{/if}
<div class="container" 	on:touchstart|passive={ontouchstart}
	on:touchmove|passive={ontouchmove}
	on:touchend|passive={ontouchend}>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span on:click={next}>{caption}</span>
<slot></slot>
</div>

<style>
.swipe {position:absolute;top:50%;left:50%;transform: translate(-50%,-50%); }
.container {height:100%;}
</style>