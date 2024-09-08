<script>
import {swipeprev,swipenext} from './swipeshapes.js';
export let onSwipe;
export let caption='';
export let reverse=false;
const swipeshapes=[swipeprev , ,swipenext];

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
	let dir=0;
	if (deltax>window.innerWidth/10 && Math.abs(deltay)<Math.abs(deltax)/2 ) {
		dir=1;
	} else if (deltax<-window.innerWidth/10 && Math.abs(deltay)<Math.abs(deltax)/2) {
		dir=-1;
	}
	return reverse?-dir:dir;
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
const mousewheel=(e,idx)=>{
	if (!e.altKey) return;
	let dir=1;
	//if (reverse) dir=-dir;
	if (e.deltaY>0) {
		onSwipe&&onSwipe(dir);
	} else {
		onSwipe&&onSwipe(-dir);
	}
	e.preventDefault();
}
const next=()=>{
	onSwipe&&onSwipe(1);
}
</script>
{#if touching==1&&direction}<span class='arrow'>{@html swipeshapes[direction+1]||"empty"}</span>{/if}
<div name="swipeview" style="height:100%" on:touchstart|passive={ontouchstart}
	on:touchmove|passive={ontouchmove}
	on:touchend|passive={ontouchend}
	on:wheel={e=>mousewheel(e)}	
>
<span aria-hidden="true" on:click={next}>{caption}</span>
<slot></slot>
</div>
<style>
.arrow {position:absolute;top:50%;left:50%;transform: translate(-50%,-50%)}
</style>
