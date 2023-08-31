import {derived, get,writable } from 'svelte/store';
import {updateSettings,settings} from './savesettings.js'
import {parseAction,usePtk,addressFromUrl} from 'ptk'
export const landscape=writable(false)

export const textsize=writable(settings.textsize)
export const APPVER='23.8.31'
export const favorites=writable({})
export const tofindhistory=writable([])
export const ptks=['cs','sc','cs-xsq','cs-yh','cs-ccc','cs-hz'];
export const selectedptks=writable(settings.selectedptks);
if (get(selectedptks).length==0) selectedptks.set(['cs'])
export const address=writable(addressFromUrl());
export const palitrans=writable(settings.palitrans);
export const tosim=writable(settings.tosim);
favorites.subscribe((favorites)=>updateSettings({favorites}));
tofindhistory.subscribe((tofindhistory)=>updateSettings({tofindhistory}));
selectedptks.subscribe((selectedptks)=>updateSettings({selectedptks}));
palitrans.subscribe((palitrans)=>updateSettings({palitrans}));
tosim.subscribe((tosim)=>updateSettings({tosim}));
textsize.subscribe((textsize)=>{
    const tsz=(textsize/100).toFixed(2)+'em'
    document.documentElement.style.setProperty('--textsize',tsz);
    updateSettings({textsize})
});
export const curPtk=()=>usePtk(get(selectedptks)[0]);
export const humanAddress=(_addr)=>{
    const addr=parseAction(_addr||get(address));
    return addr[1][1]+'.'+addr[2][1]
}