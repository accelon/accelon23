<script>
import { APPVER } from "./store";
import {textsize,palitrans,tosim} from './store.js'
import {debounce} from 'ptk'
import {_} from './textout.ts'
import Slider from './3rd/rangeslider.svelte'
import StateBtn from './comps/statebutton.svelte'
let textsz=[ $textsize ,0];
const setTextsize=e=>{
    const j=((e.detail[0]||100));
    textsize.set(j);
}

</script>
<div class="bodytext">
<div class="settings">
{APPVER}
{#key $tosim}
<StateBtn states={{0:"原文",1:"简體",2:"简体"}} storeid={tosim}/>
<StateBtn states={{'':_("檢約 Provident"),'iast':_("羅馬 Roman"),
    'my':_("緬 ဗမာစာ"),'th':_("泰 ไทย"),//'lo':_("寮 ລາວ"),'km':_("柬 ភាសាខ្មែរ"),'tb':"藏 བོད་སྐད།",
    'si':_("僧伽羅 සිංහල"),'hi':_("天城 हिन्दी")}} storeid={palitrans}/>
{/key}
<Slider bind:value={textsz} on:input={debounce(setTextsize,300)} max={250} min={80} >
    <span slot="caption">{textsz[0]}% 字體大小</span>
</Slider>
</div>
</div>
<style>
.settings {width:100%}
</style>