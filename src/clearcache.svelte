<script>
import {clearcache} from './savesettings.js'
let clearit=false;
export const clear=()=>{
    if (clearit) {
        clearcache();
    } else {
        clearit=true;
    }
}
</script>
<button class:clearit on:click={clear}>{clearit?"確定":""}清除所有緩存</button>
<style>
    .clearit {background:red}
</style>