<script setup>
const { t, tm, rt } = useI18n()

const texts = computed(() => {
  const messages = tm('aboutme.texts')

  if (!Array.isArray(messages)) return []

  return messages.map((item) => ({
    text: rt(item.text),
    class: item.class ? rt(item.class) : '',
  }))
})
const placedItems = ref([])
const mouse = reactive({ x: 0, y: 0 })
const cursorVisible = ref(false)

const nextText = computed(() => texts.value[placedItems.value.length])

function trackMouse(event) {
  mouse.x = event.clientX
  mouse.y = event.clientY
  cursorVisible.value = true
}

const stackSpin = ref(false)
const stackSpinX = ref(null)
const stackSpinY = ref(null)

function pasteText(event) {
  if (nextText.value === undefined) return

  // The last one toggles a new spin
  if (placedItems.value.length + 1 === texts.value.length) {
    stackSpin.value = true
    const rect = event.currentTarget.getBoundingClientRect()

    stackSpinX.value = ((event.clientX - rect.left) / rect.width) * 100
    stackSpinY.value = ((event.clientY - rect.top) / rect.height) * 100
    placedItems.value.push({
      id: placedItems.value.length,
      text: '',
      x: null,
      y: null,
      class: 'hidden',
    })
    return
  }

  const rect = event.currentTarget.getBoundingClientRect()

  placedItems.value.push({
    id: placedItems.value.length,
    text: nextText.value.text,
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
    class: nextText.value.class,
  })
}

let draggedItem = null
let dragOffset = { x: 0, y: 0 }

function dragText(event, item) {
  if (event.button !== 0) return

  const element = event.currentTarget
  const rect = element.offsetParent.getBoundingClientRect()

  draggedItem = item

  dragOffset = {
    x: event.clientX - rect.left - item.x,
    y: event.clientY - rect.top - item.y,
  }

  element.setPointerCapture(event.pointerId)
}

function moveText(event) {
  if (!draggedItem) return

  const rect = event.currentTarget.offsetParent.getBoundingClientRect()

  draggedItem.x = event.clientX - rect.left - dragOffset.x
  draggedItem.y = event.clientY - rect.top - dragOffset.y
}

function stopDragging(event) {
  draggedItem = null

  const element = event.currentTarget

  if (element.hasPointerCapture(event.pointerId)) {
    element.releasePointerCapture(event.pointerId)
  }
}

function restartPage(event) {
  if (
    event.key.toLowerCase() !== 'r' ||
    event.repeat ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.isComposing
  )
    return

  // No reiniciar mientras escribes en un campo.
  if (
    event.target instanceof Element &&
    event.target.closest(
      'input, textarea, select, [contenteditable]:not([contenteditable="false"])'
    )
  )
    return

  placedItems.value = []
  draggedItem = null
  stackSpin.value = false
}

onMounted(() => {
  window.addEventListener('keydown', restartPage)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', restartPage)
})
</script>

<template>
  <div
    class="inset-0 overflow-hidden h-full w-full relative"
    @pointermove="trackMouse"
    @pointerleave="cursorVisible = false"
    @click="pasteText"
  >
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <SpinningWheel
        :finalPosition="{ x: 85, y: 20 }"
        :opacities="[1, 0.3, 0.8, 0.3]"
        :pParticles="[
          {
            text: t('aboutme.spinningWeel'),
          },
        ]"
        :minFontSize="15"
        :maxCount="70"
        :circleRadius="30"
        :includeShadows="false"
        :spinEnabled="false"
        :includeInnerMessage="false"
        :duration="1000"
      />
    </div>
    <div
      class="absolute inset-0 w-full h-full pointer-events-none flex flex-col text-3xl p-20 gap-8 text-primary aboutme-text"
    >
      <div>
        Hi I'm Laura and I'm a
        <!-- <span
          v-if="placedItems.length > 0"
          class="spin-entrance inline-block text-blue-500"
        >
          full-stack developer with an eye for design
        </span> -->
      </div>
      <div>I've always been curious about life and how things work.</div>
      <div class="flex justify-end max-w-5xl">
        <!--<span
          v-if="placedItems.length > 1"
          class="spin-entrance inline-block text-green-500"
          >I studied Telecommunications Engineering </span
        > -->at ETSETB-UPC Barcelona-Tech.
      </div>
      <div>Did my thesis on audio feature extraction with LLMs at</div>
      <div>After graduating I started building things for the</div>
      <div class="text-xs absolute bottom-5 left-5">Press R to restart</div>
    </div>

    <!-- Texts already placed -->
    <!-- <div
      v-for="item in placedItems"
      :key="item.id"
      :class="item.class"
      class="absolute select-none text-2xl spin-entrance shrink-cursor p-2 rounded-md"
      :style="{
        left: `${item.x}px`,
        top: `${item.y}px`,
      }"
      @pointerdown.stop="dragText($event, item)"
      @pointermove.stop="moveText"
      @pointerup.stop="stopDragging"
      @pointercancel.stop="stopDragging"
      @lostpointercapture="stopDragging"
      @click.stop
    >
      {{ texts.value[item.id].text }}
    </div> -->
    <div
      v-for="item in placedItems"
      :key="item.id"
      :class="[item.class === 'hidden' ? 'hidden' : texts[item.id]?.class]"
      class="absolute select-none touch-none text-2xl spin-entrance shrink-cursor p-2 rounded-md"
      :style="{
        left: `${item.x}px`,
        top: `${item.y}px`,
      }"
      @pointerdown.stop="dragText($event, item)"
      @pointermove.stop="moveText"
      @pointerup.stop="stopDragging"
      @pointercancel.stop="stopDragging"
      @lostpointercapture="stopDragging"
      @click.stop
    >
      {{ texts[item.id]?.text }}
    </div>

    <!-- Preview of the next text under the cursor -->
    <!--   <span
      v-if="cursorVisible && placedItems.length < texts.length"
      class="pointer-events-none absolute w-max max-w-sm select-none text-xl opacity-50 text-primary"
      :style="{
        left: `${mouse.x + 8}px`,
        top: `${mouse.y + 8}px`,
      }"
    >
      {{ texts[placedItems.length].text }}
    </span> -->
    <Teleport to="body">
      <span
        v-if="cursorVisible && nextText !== undefined"
        class="pointer-events-none fixed z-[101] w-max max-w-sm -translate-y-1/2 select-none text-xl opacity-50 text-primary"
        :style="{
          left: `${mouse.x + 24}px`,
          top: `${mouse.y}px`,
        }"
      >
        {{ nextText.text }}
      </span>
    </Teleport>
    <div
      v-if="stackSpin"
      class="absolute inset-0 w-full h-full pointer-events-none"
    >
      <SpinningWheel
        :finalPosition="{ x: stackSpinX, y: stackSpinY }"
        :pParticles="[
          {
            text: 'Nuxt.js',
          },
          {
            text: 'Vue.js',
          },
          {
            text: 'TailwindCSS',
          },
          {
            text: 'JavaScript',
          },
          {
            text: 'Node.js',
          },
          {
            text: 'Nitro',
          },
          {
            text: 'Supabase',
          },
          {
            text: 'PostgreSQL',
          },
        ]"
        :minFontSize="15"
        :startAngle="-45"
        :maxCount="20"
        :circleRadius="30"
        :includeShadows="true"
        :spinEnabled="false"
        :includeInnerMessage="false"
      />
    </div>
  </div>
</template>

<style scoped>
.spin-entrance {
  animation: spin-entrance 200ms ease-in-out;
}

@keyframes spin-entrance {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.aboutme-text {
  animation: fade-in 2s ease-out both 3s;
}
</style>
