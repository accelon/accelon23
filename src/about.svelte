<script>
import {textsize,address,humanAddress, selectedptks,palitrans,tosim,ptks,availableptks,activeparaonly, activeptk} from './store.js'
import {APPVER} from './constant.js'
import {debounce,  usePtk} from 'ptk'
import {_} from './textout.ts'
import Slider from './3rd/rangeslider.svelte'
import StateBtn from './comps/statebutton.svelte'
import CheckUpdate from './checkupdate.svelte'
import {CacheName} from './constant.js'
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
    return zh.slice(0,at)+':'+(deleting==ptkname?'❌':'')+zh.slice(at+1)+' '
}
let deleting='';
const deleteit=async ptkname=>{
    if (!deleting || deleting!==ptkname) {
        if ($selectedptks[0]!==ptkname) deleting=ptkname;
    } else {
        if ($selectedptks[0]!==deleting){
            const cache=await caches.open(CacheName);
            let keys=await cache.keys();
            keys=keys.filter(it=>~it.url.indexOf(deleting));
            keys.forEach(key=>cache.delete(key))
            const arr1=$selectedptks.filter(it=>it!==ptkname);
            selectedptks.set(arr1);          
            const arr2=$availableptks.filter(it=>it!==ptkname);
            availableptks.set(arr2);
            if ($activeptk==ptkname) activeptk.set($selectedptks[0]);
        }
        deleting='';
    }
}
</script>
<div class="bodytext">
<div class="settings">
<a href="https://github.com/accelon/sanzang/" target=_new><span class="logo">平行藏</span></a>{" "+APPVER}
{_("自由軟件，點")}{humanAddress($address)}{_("複製分享連結")}。
{#key $tosim,$availableptks}
<br/>{_("已安裝數據庫（點一下出現❌再點移除）")}
{#each ptks as ptkname}
<span aria-hidden="true" on:click={()=>deleteit(ptkname)}>{_(ptkcaption(ptkname,deleting))}</span>
{/each}
{#if navigator.onLine}
<CheckUpdate/>
{/if}

<br/>
{_("漢字編碼")}：<StateBtn states={{0:"原樣",1:"简體",2:"简体"}} storeid={tosim}/>。
{_("巴利轉寫")}：<StateBtn states={{'':_("儉約Provident"),'iast':_("羅馬Roman"),
    'my':_("緬ဗမာစာ"),'th':_("泰ไทย"),//'lo':_("寮 ລາວ"),'km':_("柬 ភាសាខ្មែរ"),'tb':"藏 བོད་སྐད།",
    'si':_("僧伽羅සිංහල"),'hi':_("天城हिन्दी")}} storeid={palitrans}/>
{_("平行顯示")}：<StateBtn states={{0:"多行",1:"單行"}} storeid={activeparaonly}/>。
{#if $palitrans==''}<a href="https://dhamma.github.io/provident-pali/" target=_new>{_("字體說明")}</a>{/if}
<br/><Slider bind:value={textsz} on:input={debounce(setTextsize,300)} max={250} min={80} >
    <span slot="caption">{textsz[0]}% {_("字體大小")}</span>
</Slider>

{_("碼僧善那")} Gmail/Telegram:<a href="mailto:sukhanika@gmail.com">sukhanika</a> WeChat:Sukhanika。

{/key}
</div>
</div>
<style>
.settings {width:100%}
</style>