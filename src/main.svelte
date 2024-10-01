<script>
import Toolbar from './toolbar.svelte'
import MainText from './maintext.svelte'
import ContextView from './contextview.svelte'
const goline=()=>{
    console.log('1')
}
const taptext=()=>{
    console.log('2')
}
const gopagebookline=()=>{
    console.log('3')
}
let book;
</script>
<ContextView {goline} {taptext} {gopagebookline} bind:book>
<Toolbar/>
<MainText/>
</ContextView>