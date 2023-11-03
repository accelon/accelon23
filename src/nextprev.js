
import {curPtk,makeAddressFromLine} from './address.js'
import {address} from './store.js'
import {parseAddress, updateUrl} from 'ptk'
import {get} from 'svelte/store'

export const nextn=()=>{
    const ptk=curPtk();
    const tagats=ptk.tagAtAction(parseAddress(get(address)).action);
    if (tagats[2]?.tagname!=='n') return;
    let newat=tagats[2].at+1;
    const len=ptk.defines.n.fields.id.values.length;
    if (newat>=len) newat=len-1;
    const line=ptk.defines.n.linepos[newat];
    const newaddr=makeAddressFromLine(line);
    if (newaddr) {
        address.set(newaddr);
        updateUrl(newaddr)
    }
}
export const prevn=()=>{
    const ptk=curPtk();
    const tagats=ptk.tagAtAction(parseAddress(get(address)).action);
    if (tagats[2]?.tagname!=='n') return;
    let newat=tagats[2].at-1;
    if (newat<0) newat=0;
    const line=ptk.defines.n.linepos[newat];
    const newaddr=makeAddressFromLine(line);
    if (newaddr) {
        address.set(newaddr);
        updateUrl(newaddr)
    }
}