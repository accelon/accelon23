import {derived, get,writable } from 'svelte/store';
import {updateSettings,settings} from './savesettings.js'
export const landscape=writable(false)

export const textsize=writable(settings.textsize)
export const APPVER='23.8.29'
export const favorites=writable({})
export const tofindhistory=writable([])
export const ptks=['cs','sc','cs-yh','cs-hz','cs-ccc'];
export const selectedptks=writable(settings.selectedptks);
if (get(selectedptks).length==0) selectedptks.set(['cs'])

favorites.subscribe((favorites)=>updateSettings({favorites}));
tofindhistory.subscribe((tofindhistory)=>updateSettings({tofindhistory}));
selectedptks.subscribe((selectedptks)=>updateSettings({selectedptks}));
textsize.subscribe((textsize)=>{
    const tsz=(textsize/100).toFixed(2)+'em'
    document.documentElement.style.setProperty('--textsize',tsz);
    updateSettings({textsize})
});
