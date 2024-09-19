import {openPtk,usePtk} from 'ptk/basket/openptk.ts'
import {enableAccelon23Features} from 'ptk/basket/features.ts'
import {downloadToCache,ptkInCache,mp3InCache} from 'ptk/platform/downloader.js'
import {selectedptks,availableptks,bootmessage, hasPali,cachedMp3} from './store.js'
import {get} from 'svelte/store'
import {ACC23} from './appconst.js'
import {painterInit} from 'offtextview/painterinit.js'

const openptk=async name=>{
    bootmessage.set('try to download '+name+'.ptk')
    const res=await downloadToCache(ACC23.CacheName,name+'.ptk',msg=>{
        bootmessage.set(name+'.ptk '+msg);
    })
    
    const buf=await res.arrayBuffer();
    const ptk=await openPtk(name,new Uint8Array(buf));
    return ptk;
}
export const init=async (app)=>{
    const {allptks,CacheName,AppVer}=ACC23;
    const toload=await ptkInCache(CacheName);
    const ptkss=get(selectedptks);
    
    for (let i=0;i<ptkss.length;i++) {
        if (!~toload.indexOf(ptkss[i])) {
            toload.push(ptkss[i]);
        }
    }
    
    availableptks.set( allptks.filter(it=>~toload.indexOf(it))); // keep the order
    app.style.height=window.innerHeight+'px';
    app.style.width=window.innerWidth+'px';   
    for (let i=0;i<toload.length;i++) {
        const ptk=await openptk(toload[i]);
        enableAccelon23Features(ptk);
        if (ptk.attributes.lang=="pp") hasPali.set(true);
        if (toload[i]=='cs-mm') console.log(ptk)
    }
    
    bootmessage.set('done');
    cachedMp3.set(await mp3InCache(CacheName));

    painterInit();
    return true;
}

