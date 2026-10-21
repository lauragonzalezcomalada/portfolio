<script setup>
const texts = ['Hello', 'Explore', 'Create', 'Imagine', '🌍']
const placedItems = ref([])
const mouse = reactive({ x: 0, y: 0 })
const cursorVisible = ref(false)

const nextText = computed(() => texts[placedItems.value.length])

function trackMouse(event) {
  mouse.x = event.clientX
  mouse.y = event.clientY
  cursorVisible.value = true
}

function pasteText(event) {
  if (nextText.value === undefined) return

  placedItems.value.push({
    id: placedItems.value.length,
    text: nextText.value,
    x: event.clientX,
    y: event.clientY,
  })
}
</script>

<template>
  <div
    class="fixed inset-0 overflow-hidden bg-primary h-full w-full"
    @pointermove="trackMouse"
    @pointerleave="cursorVisible = false"
    @click="pasteText"
  >
    <!-- Texts already placed -->
    <span
      v-for="item in placedItems"
      :key="item.id"
      class="absolute -translate-x-1/2 -translate-y-1/2 select-none text-3xl"
      :style="{
        left: `${item.x}px`,
        top: `${item.y}px`,
      }"
    >
      {{ item.text }}
    </span>

    <!-- Preview of the next text under the cursor -->
    <span
      v-if="cursorVisible && nextText !== undefined"
      class="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 select-none text-3xl opacity-50"
      :style="{
        left: `${mouse.x}px`,
        top: `${mouse.y}px`,
      }"
    >
      {{ nextText }}
    </span>
  </div>
</template>

<style scoped></style>
