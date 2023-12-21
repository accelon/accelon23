import f from './painters/f.svelte'
import t from './painters/t.svelte'
import wiki from './painters/wiki.svelte'
import baidu from './painters/baidu.svelte'
import img from './painters/img.svelte'
import audio from './painters/audio.svelte'
import { ACC23 } from './appconst.js';
const painters=ACC23.painters||{};
painters.f=f;
painters.t=t;
painters.img=img;
painters.audio=audio;
painters.wiki=wiki;
painters.baidu=baidu;
ACC23.painters=painters;
export const paintercount=Object.keys(painters).length;
