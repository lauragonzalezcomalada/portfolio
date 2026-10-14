<script setup>

const colors = [ 'var(--color-success)', 'var(--color-info)', 'var(--color-warning)','#B83D6E','#51D6FF']
const hoverColor = ref(colors[0])




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

watch(isShrunk, (shrunk) => {
  if (!shrunk) return

  const availableColors = colors.filter(color => color !== hoverColor.value)
  hoverColor.value =
    availableColors[Math.floor(Math.random() * availableColors.length)]
})


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

onMounted(() => {
  watch(hoverColor, (color) => {
    window.document.documentElement.style.setProperty(
      '--cursor-hover-color',
      `color-mix(in srgb, ${color} 85%, transparent)`
    )
  }, { immediate: true })

  window.addEventListener('pointermove', handlePointerMove)

  window.document.documentElement.addEventListener(
    'pointerleave',
    handlePointerLeave
  )
})
</script>
<template>
  <Teleport to="body">
  <div
  class="
    custom-cursor pointer-events-none
    fixed top-0 left-0 z-100
    rounded-full bg-red-300/10 border-2 border-red-500 flex items-center justify-center transition-[padding,background-color] duration-300 ease-out
  "
  :class="isShrunk ? 'p-0 bg-red-100' : 'p-3'"
  :style="{
     borderColor: isShrunk ? hoverColor : '#ef4444',

    transform: `translate3d(${cursorX}px, ${cursorY}px, 0)
                translate(-50%, -50%)`,
  }"
  aria-hidden="true"
>
<div class="size-1 rounded-full bg-red-500" 
:style="{
          backgroundColor: isShrunk ? hoverColor : '#ef4444',
        }"
        ></div>
</div>
</Teleport>
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

