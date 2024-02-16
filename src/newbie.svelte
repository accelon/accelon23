<script>
import Switch from "./3rd/switch.svelte";
import {tosim, newbie, welcoming} from './store.js'
import StateBtn from './comps/statebutton.svelte'
import {_} from "./textout.js"
import {ACC23} from './appconst.js'
let value=$newbie;
export const agree=()=>{
    welcoming.set(false);
}
$: newbie.set(value)
</script>
{#key $tosim}
<div class="bodytext">
<span class="logo">{_(ACC23.AppTitle)} {ACC23.AppVer}</span>
<br/>{_("安裝後可全屏及離線運行")}
<br/>{_("安卓 右上角⋮ →安裝應用程序")}
<br/>{_("蘋果 分享→加到主畫面")}
<hr/>
{_("本軟件不會主動收集個人信息。在不違反所在地法律的情況下，允許以任何形式散佈本軟件。")}
<br/>{_("數據庫僅供業餘閱讀與機器學習語料，不適用於嚴謹學術研究及正式出版品。")}
<br/>{_("本人接受使用本軟件所造成的任何結果。")}
<br/><div style="width:100%;text-align:center"><button style="font-size:150%;width:30%;" on:click={agree}>同意</button></div>
<Switch bind:value label={_("啟用時顯示此畫面")} design="slider" />
{_("漢字編碼")}：<StateBtn states={{0:"原樣",1:"简體（「發髮」不併为「发」）",2:"简体"}} storeid={tosim}/>。

</div>
{/key}