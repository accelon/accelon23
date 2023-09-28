<script>
import {textsize,address,humanAddress, APPVER,palitrans,tosim,ptks} from './store.js'
import {debounce,  usePtk} from 'ptk'
import {_} from './textout.ts'
import Slider from './3rd/rangeslider.svelte'
import StateBtn from './comps/statebutton.svelte'
import CheckUpdate from './checkupdate.svelte'
let checkingUpdate=false;

let textsz=[ $textsize ,0];

const setTextsize=e=>{
    const j=((e.detail[0]||100));
    textsize.set(j);
}
const ptkcaption=ptkname=>{
    const ptk=usePtk(ptkname);
    if (!ptk) return '';
    const zh=ptk.attributes.zh
    const at=zh.indexOf("|");
    return zh.slice(0,at)+':'+zh.slice(at+1)+' '
}

</script>
<div class="bodytext">
<div class="settings">
<a href="https://github.com/accelon/sanzang/" target=_new><span class="logo"><span class="logo">平行藏</span></a>{" "+APPVER}

{#key $tosim}
已安裝
{#each ptks as ptkname}
{_(ptkcaption(ptkname))}
{/each}
{#if navigator.onLine}
<CheckUpdate/>
{/if}

<br/>
{_("漢字編碼")}：<StateBtn states={{0:"原樣",1:"简體",2:"简体"}} storeid={tosim}/>。
{_("巴利轉寫")}：<StateBtn states={{'':_("儉約Provident"),'iast':_("羅馬Roman"),
    'my':_("緬ဗမာစာ"),'th':_("泰ไทย"),//'lo':_("寮 ລາວ"),'km':_("柬 ភាសាខ្មែរ"),'tb':"藏 བོད་སྐད།",
    'si':_("僧伽羅සිංහල"),'hi':_("天城हिन्दी")}} storeid={palitrans}/>

{#if $palitrans==''}<a href="https://dhamma.github.io/provident-pali/" target=_new>{_("字體說明")}</a>{/if}
<br/><Slider bind:value={textsz} on:input={debounce(setTextsize,300)} max={250} min={80} >
    <span slot="caption">{textsz[0]}% {_("字體大小")}</span>
</Slider>

{_("碼僧善那")} Gmail:<a href="mailto:sukhanika@gmail.com">sukhanika</a> WeChat:Sukhanika。{_("點最下方")}{humanAddress($address)}{_("複製連結")}。

{/key}
</div>
</div>
<style>
.settings {width:100%}
</style>