<script>
  import { createEventDispatcher } from "svelte";
  import Thumb from "./thumb.svelte"; 

  const dispatch = createEventDispatcher();

  let name = [];
  let range = false;
  let min = 0;
  let max = 100;
  let step = 1;
  let value = [min, max];
  let pos=[0,0];
  let active = false;
  let order = false;

  function setValue(pos) {

    if (!pos||pos.length!==2||!Array.isArray(pos)) {
      pos=[min,max];
    }

    if (typeof pos[0]=='undefined') return;
    const offset = min % step;
    const width = max - min

    value = pos
      .map(v => min + v * width)
      .map(v => Math.round((v - offset) / step) * step + offset);

    dispatch("input", value);
  }

  function setPos(value) {
    if (!value||value.length!==2||!Array.isArray(value)) {
      value=[min,max];
    }
    pos = value
      .map(v => Math.min(Math.max(v, min), max))
      .map(v => (v - min) / (max - min));
  }

  function checkPos(pos) {
    return [Math.min(...pos), Math.max(...pos)];
  }

  export { name, range, min, max, step, value, order };

  $: if (active) setValue(pos);
  $: if (!active) setPos(value);
  $: if (range && order && active) pos = checkPos(pos);
  $: min, max, clamp();
  $: progress = `
    left: ${range ? Math.min(pos[0], pos[1]) * 100 : 0}%;
    right: ${(100 - Math.max(pos[0], (range ? pos[1] : pos[0])) * 100)||100}%;
  `;

  function clamp() {
    setPos(value);
    setValue(pos);
  }
  function adjust(e){
    if (e.target.classList[0]=='progress') { //left
      setPos([(value[0]||min)-step,value[1]]);
      setValue(pos)
    } else if ((e.target.classList[0]=='track')) {  //right
      setPos([(value[0]||min)+step,value[1]]);
      setValue(pos)
    }
  }
</script>

<div>
<input type="number" value={value[0]} name={name[0]} />
<div aria-hidden="true" class="track" on:click={adjust}>
  <div class="progress" style={progress} />
  <Thumb bind:pos={pos[0]} on:active={({ detail: v }) => active = v}>
    <slot name="left">
      <slot>
        <div class="thumb" />
      </slot>
    </slot>
  </Thumb>
  <slot name="caption"/>
</div>
</div>

<style>
.track {
  margin: 0.1em 1em;
  position: relative;
  height: 1.2em;
  width: calc(100% - 2em);
  border-radius: 0.6em;
  background: var(--track-bg, #fffdf6);
}
.progress {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 100vh;
  opacity:0.3;
  background: var(--progress-bg, #fef1a6);
}
input {
    display: none;
  }
.thumb {
  width: 1.2em;
  height: 1.2em;
  opacity: 0.5;
  border-radius: 0.6em;
  background: var(--thumb-bg, #d27700);
}
</style>