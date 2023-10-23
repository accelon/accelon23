import {get,writable } from 'svelte/store';
import {updateSettings,settings,allptks,defaultselectedptk} from './savesettings.js'
import {parseAddress,parseAction,usePtk,addressFromUrl,unique} from 'ptk'
import {CacheName} from './constant.js'
export const landscape=writable(false)

export const textsize=writable(settings.textsize)

export const favorites=writable({})
export const tofindhistory=writable([])
export const ptks=allptks;
export const selectedptks=writable(settings.selectedptks);
export const availableptks=writable([]);
export const address=writable(addressFromUrl());
export const activeptk=writable(settings.activeptk||get(selectedptks)[0]);
export const thetab=writable(get(address)?'':'toc')
if (get(selectedptks).length==0) selectedptks.set(defaultselectedptk)

export const referaddress=writable('')
export const palitrans=writable(settings.palitrans);
export const activeparaonly=writable(settings.activeparaonly);
export const tosim=writable(settings.tosim);
export const newbie=writable(settings.newbie);
export const hasupdate=writable(false);
export const welcoming=writable(get(newbie)=='on');

export const sentat=writable(-1);// selected sent
export const clauseonly=writable(false);
export const searchable=writable('');//選取的文字，不一定是常用句
export const searchmode=writable('sent');
export const tofind=writable('');
export const scrolltoselected=writable(false)

favorites.subscribe((favorites)=>updateSettings({favorites}));
tofindhistory.subscribe((tofindhistory)=>updateSettings({tofindhistory}));
selectedptks.subscribe((selectedptks)=>updateSettings({selectedptks}));
palitrans.subscribe((palitrans)=>updateSettings({palitrans}));
tosim.subscribe((tosim)=>updateSettings({tosim}));
activeptk.subscribe((activeptk)=>updateSettings({activeptk}));
activeparaonly.subscribe((activeparaonly)=>updateSettings({activeparaonly}));
newbie.subscribe((newbie)=>updateSettings({newbie}));
textsize.subscribe((textsize)=>{
    const tsz=(textsize/100).toFixed(2)+'em'
    document.documentElement.style.setProperty('--textsize',tsz);
    updateSettings({textsize})
});
export const curPtk=()=>usePtk(get(selectedptks)[0]);
export const humanAddress=(_addr)=>{
    const addr=parseAction(parseAddress(_addr||get(address)).action,true);
    return addr.ck+  (addr.n?'.'+addr.n:'')
}

export const makeAddressFromLine=line=>{
    const ptk=curPtk();
    const ak=ptk.nearestTag(line+1,'ak','id');
    const ck=ptk.nearestTag(line+1,'ck','id');
    const n=ptk.nearestTag(line+1,'n','id');
    if (typeof ak=='undefined' || typeof ck=='undefined' ||typeof n=='undefined') return '';
    const addr= 'ak#'+ak+'.ck#'+ck+'.n'+n;
    const [start]=ptk.rangeOfAddress(addr);

    return (line-start>0)?addr+':'+(line-start):addr;
}

export const ptkInCache=async ()=>{
    const cache=await caches.open(CacheName);
    const keys=await cache.keys();
    const incaches=keys.filter(it=>it.url.endsWith(".ptk")).map(it=>it.url.match(/([a-z_\-]+)\.ptk/)[1])
    return unique(incaches);
}