<script>
import { APPVER } from "./store";
import {textsize} from './store.js'
import {debounce} from 'ptk'
import Slider from './3rd/rangeslider.svelte'

let textsz=[ $textsize ,0];
const setTextsize=e=>{
    const j=((e.detail[0]||100));
    textsize.set(j);
}

</script>
<div class="bodytext">
<div>{APPVER}</div>
<Slider bind:value={textsz} on:input={debounce(setTextsize,300)} max={250} min={80} >
    <span slot="caption"　style="float:right">{textsz[0]}% 字體大小</span>
</Slider>
</div>