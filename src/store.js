import {get,writable } from 'svelte/store';
import {updateSettings,settings} from './savesettings.js'
import {addressFromUrl} from 'ptk'
export const landscape=writable(false)
export const textsize=writable('150');
export const favorites=writable([]);
export const tofindhistory=writable([]);

export const selectedptks=writable([]);
export const availableptks=writable([]);
export const installedptks=writable([]);
export const address=writable(addressFromUrl());
export const activeptk=writable('');
export const thetab=writable('toc')
export const hasPali=writable(false);

export const referaddress=writable('')
export const palitrans=writable('iast');
export const activeparaonly=writable('OFF');
export const tosim=writable(1);
export const newbie=writable('ON');
export const hasupdate=writable(false);
export const welcoming=writable(true);

export const sentat=writable(-1);// selected sent
export const clauseonly=writable(false);
export const searchable=writable('');//選取的文字，不一定是常用句
export const searchmode=writable('excerpt');
export const tofind=writable('');
export const scrolltoselected=writable(false);
export const reverseswipe=writable(false);
export const bootmessage=writable('');
export const cachedMp3=writable([]);
export const activeMp3=writable('');
export const initStore=()=>{
    // console.log('settings',settings)
    palitrans.set(settings.palitrans);
    activeparaonly.set(settings.activeparaonly || (settings.selectedptks.length<3?'0':'1') );
    tosim.set(settings.tosim);
    newbie.set(settings.newbie);
    activeptk.set(settings.activeptk);
    
    thetab.set(get(address)?'':'toc');
    textsize.set(settings.textsize);
    installedptks.set(settings.installedptks);
    favorites.set(settings.favorites);
    selectedptks.set(settings.selectedptks);
    reverseswipe.set(settings.reverseswipe);
    
    if (get(selectedptks)?.length==0) selectedptks.set( [get(activeptk)])
    welcoming.set(get(newbie)=='on');

    favorites.subscribe((favorites)=>updateSettings({favorites}));
    tofindhistory.subscribe((tofindhistory)=>updateSettings({tofindhistory}));
    selectedptks.subscribe((selectedptks)=>updateSettings({selectedptks}));
    palitrans.subscribe((palitrans)=>updateSettings({palitrans}));
    tosim.subscribe((tosim)=>updateSettings({tosim}));
    activeptk.subscribe((activeptk)=>updateSettings({activeptk}));
    activeparaonly.subscribe((activeparaonly)=>updateSettings({activeparaonly}));
    newbie.subscribe((newbie)=>updateSettings({newbie}));
    reverseswipe.subscribe((reverseswipe)=>updateSettings({reverseswipe}));
    textsize.subscribe((textsize)=>{
        const tsz=(textsize/100).toFixed(2)+'em'
        document.documentElement.style.setProperty('--textsize',tsz);
        updateSettings({textsize})
    });
}
