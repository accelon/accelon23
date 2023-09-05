<script>
import { onDestroy } from "svelte";
import Switch from "./3rd/switch.svelte";
import {APPVER, newbie, welcoming} from './store.js'
let value=$newbie;
export const agree=()=>{
    welcoming.set(false);
}
onDestroy(()=>{
    newbie.set(value)
});
</script>
<div class="bodytext">
<span class="logo">平行藏 {APPVER}</span>
<br/>全屏模式安裝方法
<br/>安卓 右上角⋮ →安裝應用程序
<br/>目前不支持蘋果手機及平板
<!-- <br/>iOS  分享→加到主畫面 -->
<hr/>
本軟件不會主動收集個人信息。
<br/>在不違反所在地法律的前提下，允許以任何形式利用本軟件。
<br/>本人無條件接受使用本軟件所造成的任何結果。
<br/><div style="width:100%;text-align:center"><button style="font-size:150%;width:30%;" on:click={agree}>同意</button></div>
<Switch bind:value label="啟用時顯示此畫面" design="slider" fontSize="24"/>
</div>