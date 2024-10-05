import {openPtk,usePtk,enableAccelon23Features,brokenTransclusions} from 'ptk/basket/index.ts'
import {downloadToCache,ptkInCache} from 'ptk/platform/downloader.js'
import {selectedptks,availableptks,bootmessage, hasPali} from './store.js'
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

    const brokens=await brokenTransclusions(usePtk('guanyin'),usePtk('dhammahall'));
    if (brokens.length) console.log('brokens',brokens)
    console.log(usePtk('dhammahall'));

    const dictbrokens=await brokenTransclusions(usePtk('dhammahall'));
    if (dictbrokens.length) console.log('dict brokens',dictbrokens)

    painterInit();
    return true;
}

