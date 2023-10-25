import {favorites,humanAddress} from './store.js';
import {get} from 'svelte/store'
import { MAXFAVORITE } from './constant.js';
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
    while (arr.length>MAXFAVORITE) arr.pop();
    favorites.set([...arr]);
}
