<script setup>

const cursorX = ref(-100)
const cursorY = ref(-100)
const isShrunk = ref(false)


function handlePointerMove(event) {
  cursorX.value = event.clientX
  cursorY.value = event.clientY

  isShrunk.value = Boolean(
    event.target instanceof Element &&
    event.target.closest('.shrink-cursor')
  )
}

function handlePointerLeave() {
  isShrunk.value = false
}


onMounted(() => {
  window.addEventListener('pointermove', handlePointerMove)
  document.documentElement.addEventListener(
    'pointerleave',
    handlePointerLeave
  )
})

onUnmounted(() => {
  window.removeEventListener('pointermove', handlePointerMove)
  document.documentElement.removeEventListener(
    'pointerleave',
    handlePointerLeave
  )
})

</script>
<template>
  <div
  class="
    custom-cursor pointer-events-none
    fixed top-0 left-0 z-100
    rounded-full bg-red-300/10 border-2 border-red-500 flex items-center justify-center transition-[padding,background-color] duration-300 ease-out
  "
  :class="isShrunk ? 'p-1 bg-red-100' : 'p-3'"
  :style="{
    transform: `translate3d(${cursorX}px, ${cursorY}px, 0)
                translate(-50%, -50%)`,
  }"
  aria-hidden="true"
>
<div class="size-1 rounded-full bg-red-500"></div>
</div>
</template>
<style>

@media (pointer: fine) {
  html,
  body,
  a,
  button {
    cursor: none;
  }
}

@media (pointer: coarse) {
  .custom-cursor {
    display: none;
  }
}
</style>

