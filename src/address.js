import {address,selectedptks} from './store.js'
import {get} from 'svelte/store'
import {parseAddress, usePtk,parseAction,updateUrl} from 'ptk'
export const curPtk=()=>usePtk(get(selectedptks)[0]);
import {ACC23} from './appconst.js'
export const humanAddress=(_addr)=>{
    const aobj=parseAddress(_addr||get(address));
    const addr=parseAction(aobj?.action,true);
    return addr.ck+  (addr.n?'.'+addr.n:'')+ (aobj.lineoff?(':'+aobj.lineoff):'');
}
export const fromHumanAddress=ha=>{
    const m1=ha.match(/([a-z\d]+)\.([a-z\d]+):(\d*)/);
    const m2=ha.match(/([a-z\d]+)\.([a-z\d]+)/);
    if (!m1 && !m2) return '';
    let ck=m2[1],n=m2[2],lineoff=0;;
    if (m1) {
        lineoff=parseInt(m1[3]);
    }
    return 'ak#'+ck.charAt(0)+'n'+'.ck#'+ck+'.n'+n+ (lineoff?':'+lineoff:'');
}

export const makeAddressFromLine=(line,_ptk)=>{
    const ptk=_ptk||curPtk();
    const ak=ptk.nearestTag(line+1,'ak','id');
    const ck=ptk.nearestTag(line+1,'ck','id');
    const n=ptk.nearestTag(line+1,'n','id');
    if (typeof ak=='undefined' || typeof ck=='undefined' ||typeof n=='undefined') return '';
    const addr= 'ak#'+ak+'.ck#'+ck+'.n'+n;
    const [start]=ptk.rangeOfAddress(addr);

    return (line-start>0)?addr+':'+(line-start):addr;
}


export const setNewAddress=(_addr)=>{   
    localStorage.setItem(ACC23.AppName+'.homeurl',_addr);
    address.set(_addr);
    updateUrl(_addr);
}