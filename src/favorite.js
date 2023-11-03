import {favorites} from './store.js';
import {humanAddress} from './address.js';
import {get} from 'svelte/store'
import {ACC23} from './appconst.js'
export const removeFavorite=(addr,updatestore=false)=>{
    const arr=get(favorites);
    let at=arr.indexOf(addr);
    if (at==-1) at=arr.indexOf(humanAddress(addr))

    if (~at) arr.splice(at,1);
    if (updatestore) {
        favorites.set([...arr]);
    }
    return arr;
}

export const addFavorite=(addr)=>{
    const human=humanAddress(addr);
    const arr=removeFavorite(human);
    arr.unshift(human);
    while (arr.length>(ACC23.MAXFAVORITE||100)) arr.pop();
    favorites.set([...arr]);
}
