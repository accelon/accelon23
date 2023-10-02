<script>
import { onDestroy } from "svelte";
import Switch from "./3rd/switch.svelte";
import {tosim,APPVER, newbie, welcoming} from './store.js'
import StateBtn from './comps/statebutton.svelte'

import {_} from "./textout"
let value=$newbie;
export const agree=()=>{
    welcoming.set(false);
}
onDestroy(()=>{
    newbie.set(value)
});
</script>
{#key $tosim}
<div class="bodytext">
<span class="logo">平行藏 {APPVER}</span>
<br/>{_("安裝後可全屏及離線運行")}
<br/>{_("安卓 右上角⋮ →安裝應用程序")}
<br/>{_("蘋果 分享→加到主畫面")}
<hr/>
{_("本軟件不會主動收集個人信息。")}
<br/>{_("在不違反所在地法律的情況下，允許以任何形式使用及散佈本軟件。")}
<br/>{_("僅供業餘愛好者自學，不適於嚴謹學術研究。")}
<br/>{_("本人接受使用本軟件所造成的任何結果。")}
<br/><div style="width:100%;text-align:center"><button style="font-size:150%;width:30%;" on:click={agree}>同意</button></div>
<Switch bind:value label={_("啟用時顯示此畫面")} design="slider" fontSize="24"/>
{_("漢字編碼")}：<StateBtn states={{0:"原樣",1:"简體（「發髮」不併为「发」）",2:"简体"}} storeid={tosim}/>。

</div>
{/key}