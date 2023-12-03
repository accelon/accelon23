import f from './painters/f.svelte'
import img from './painters/img.svelte'
import audio from './painters/audio.svelte'
import { ACC23 } from './appconst.js';
const painters=ACC23.painters||{};
painters.f=f;
painters.img=img;
painters.audio=audio;
ACC23.painters=painters;
export const paintercount=Object.keys(painters).length;
