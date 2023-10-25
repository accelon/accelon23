import {favorites} from './store.js';
import {get} from 'svelte/store'
import { MAXFAVORITE } from './constant.js';
export const removeFavorate=(addr,updatestore=true)=>{
    const at=arr.indexOf(human);
    if (~at) arr.splice(at,1);
    if (updatestore) favorites.set(arr);
    return arr;
}

export const addFavorate=(addr)=>{
    const human=humanAddress(addr);
    const arr=removeFavorate(get(favorites),false);
    arr.unshift(human);
    while (arr.length>MAXFAVORITE) arr.pop();
    favorites.set(arr);
}
