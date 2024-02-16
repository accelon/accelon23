
import {curPtk,makeAddressFromLine,setNewAddress} from './address.js'
import {address} from './store.js'
import {parseAddress} from 'ptk'
import {get} from 'svelte/store'

export const nextn=()=>{
    const ptk=curPtk();
    const tagats=ptk.tagAtAction(parseAddress(get(address)).action).filter(it=>it.tagname=='n');
    if (tagats[0]?.tagname!=='n') return;
    let newat=tagats[0].at+1;
    const len=ptk.defines.n.fields.id.values.length;
    if (newat>=len) newat=len-1;
    const line=ptk.defines.n.linepos[newat];
    const newaddr=makeAddressFromLine(line);
    if (newaddr) {
        setNewAddress(newaddr);

    }
}
export const prevn=()=>{
    const ptk=curPtk();
    const tagats=ptk.tagAtAction(parseAddress(get(address)).action).filter(it=>it.tagname=='n');
    if (tagats[0]?.tagname!=='n') return;
    let newat=tagats[0].at-1;
    if (newat<0) newat=0;
    const line=ptk.defines.n.linepos[newat];
    const newaddr=makeAddressFromLine(line);
    if (newaddr) {
        setNewAddress(newaddr);

    }
}

export const isHomepage=()=>{
    const ptk=curPtk();
    const tagats=ptk.tagAtAction(parseAddress(get(address)).action).filter(it=>it.tagname=='n');
    if (tagats[0]?.tagname!=='n') return false;
    return tagats[0].at==0;
}

export const goHomepage=ptk=>{
    const line=ptk.defines.n?.linepos[0]||1;
    const newaddr=makeAddressFromLine(line);
    if (newaddr) {
        setNewAddress(newaddr);

    }
}