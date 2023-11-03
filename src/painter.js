import f from './painters/f.svelte'
import { ACC23 } from './appconst.js';
const painters=ACC23.painters||{};
painters.f=f;
export const paintercount=Object.keys(painters).length;