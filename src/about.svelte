<script>
import {textsize,address, selectedptks,reverseswipe,hasPali,
    palitrans,tosim,availableptks,activeparaonly, activeptk} from './store.js'
import {humanAddress} from './address.js'
import {debounce,  usePtk} from 'ptk'
import { isLocalhost } from 'ptk/platform/pwa.js';
import {_} from './textout.js'
import Slider from 'offtextview/3rdparty/rangeslider.svelte'
import StateBtn from 'offtextview/comps/statebutton.svelte'
import CheckUpdate from './checkupdate.svelte'
import {ACC23} from './appconst.js'
import ClearCache from './clearcache.svelte';
let value=$reverseswipe;
let textsz=[ $textsize ,0];

const setTextsize=e=>{
    const j=((e.detail[0]||100));
    textsize.set(j);
}
const ptkcaption=ptkname=>{
    const ptk=usePtk(ptkname);
    if (!ptk) return '';
    const zh=ptk.attributes.zh
    let r=''
    const at=zh.indexOf("|");
    if (~at) {
        r= zh.slice(0,at)+':'+(deleting==ptkname?'❌':'')+zh.slice(at+1)+' '
    } else {
        r= (deleting==ptkname?'❌':'')+zh;   
    } 
    return r;
}
const genQRCode=(ele)=>{
    let width=window.innerWidth * 0.75;
    let height=window.innerHeight* 0.75;
    if (width>height) width=height;
    else height=width;
    new QRCode( ele, {
        text:document.location.href,
        width,
        height,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    }
    );
}
$: reverseswipe.set(value)
let deleting='';
const deleteit=async ptkname=>{
    if (!deleting || deleting!==ptkname) {
        if ($selectedptks[0]!==ptkname) deleting=ptkname;
    } else {
        if ($selectedptks[0]!==deleting){
            const cache=await caches.open(ACC23.CacheName);
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
let showqrcode=false;
const shareit=()=>{
    showqrcode=!showqrcode;
}
</script>
<div class="bodytext">
<div class="settings">
{#if showqrcode}
<div aria-hidden={true} on:click={shareit} use:genQRCode id="qrcode"></div>
{:else}
<span aria-hidden={true} on:click={shareit}>{_("點擊分享")}→<img src={ACC23.AppName+".png"} alt={ACC23.AppName}/></span>
<br/>
<a href={ACC23.repoLink||"https://github.com/accelon/"} target=_new><span class="logo">{_(ACC23.AppTitle)}</span></a>{" "+ACC23.AppVer}
{_("自由軟件，點")}{humanAddress($address)}{_("複製連結。")}
<!-- {#if ACC23.AppName!=='sz' && ACC23.AppName!=='agm'&& ACC23.AppName!=='ddj'&& ACC23.AppName!=='dhammahall'}
<a target="_new" href="https://docs.google.com/forms/d/e/1FAIpQLScDVWVWLDhAa5t3ZJHvFSKtDaDH5D6_g0L1vtN-tFgXi_hJoQ/viewform">{_("免費申請個人專屬App")}</a>
{/if} -->

{#key $tosim,$availableptks}
{#if location.port!==ACC23.redbeanport}
    <br/>{_("已安裝數據庫（點兩次移除）")}
    {#each $availableptks as ptkname}
    <span aria-hidden="true" class:clickable={$selectedptks[0]!==ptkname} 
    class:rootptk={$selectedptks[0]==ptkname} on:click={()=>deleteit(ptkname)}>{_(ptkcaption(ptkname,deleting))}
    {#if $selectedptks[0]==ptkname}{_("置頂 ")}{/if}
    </span>
    {/each}

    <ClearCache/>
    {#if navigator.onLine||isLocalhost()}
    <CheckUpdate/>
    {/if}
{/if}

<br/>
<Slider bind:value={textsz} on:input={debounce(setTextsize,300)} max={250} min={80} >
    <span slot="caption">{textsz[0]}% {_("字體大小")}</span>
</Slider>
{_("漢字編碼")}：<StateBtn states={{0:"原樣",1:"简體",2:"简体"}} storeid={tosim}/>。

{#if $hasPali}
{_("巴利轉寫")}：<StateBtn states={{'':_("儉約Provident"),'iast':_("羅馬Roman"),
    'my':_("緬ဗမာစာ"),'th':_("泰ไทย"),//'lo':_("寮 ລາວ"),'km':_("柬 ភាសាខ្មែរ"),'tb':"藏 བོད་སྐད།",
    'si':_("僧伽羅සිංහල"),'hi':_("天城हिन्दी")}} storeid={palitrans}/>。
{#if $palitrans==''}<a href="https://dhamma.github.io/provident-pali/" target=_new>{_("字體說明")}</a>{/if}
{/if}
{_("平行顯示")}：<StateBtn states={{0:"多行",1:_("單行")}} storeid={activeparaonly}/>。
{_("翻頁方式")}：<StateBtn states={{0:"順向",1:"逆向"}} storeid={reverseswipe}/>。
<br/>
{_("碼僧善那")} Gmail/Telegram:<a href="mailto:sukhanika@gmail.com">sukhanika</a> WeChat:Sukhanika。

{/key}
{/if}
<hr/>
</div>
</div>
<style>
.settings {width:100%}
#qrcode {padding:10px;background:gray}
</style>
