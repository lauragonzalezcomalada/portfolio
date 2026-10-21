<script setup>
const { t } = useI18n()

const props = defineProps({
  opacities: {
    type: Array,
    required: true,
  },
  pParticles: {
    type: Array,
    required: true,
  },
  maxCount: {
    type: Number,
    required: true,
  },
  maxFontSize: {
    type: Number,
    required: false,
    default: 300,
  },
  minFontSize: {
    type: Number,
    required: true,
  },
  includeShadows: {
    type: Boolean,
    required: true,
  },
  spinEnabled: {
    type: Boolean,
    required: true,
  },
  startAngle: {
    type: Number,
    default: 0,
  },
  finalPosition: {
    type: Object,
    default: {
      x: 50,
      y: 50,
    },
  },
  circleRadius: {
    type: Number,
    default: 100,
  },
  includeGreeting: {
    type: Boolean,
    default: false,
  },
})

const palette = [
  'var(--color-blue-500)',
  'var(--color-green-500)',
  'var(--color-yellow-500)',
  'var(--color-purple-500)',
]

const texts = computed(() => [t('home.greeting_line1'), t('home.greeting_line2')])

const charactersShown = ref(0)
const letterColors = ref([])

const lines = computed(() => {
  let offset = 0

  return texts.value.map((text) =>
    Array.from(text).map((character) => {
      const index = offset++

      return {
        character,
        visible: index < charactersShown.value,
        color: letterColors.value[index] ?? 'inherit',
      }
    })
  )
})

let startTimeout
let typingInterval

onMounted(() => {
  const total = texts.value.reduce((sum, text) => sum + Array.from(text).length, 0)

  // Assign once, so colours don't change with every typed character.
  letterColors.value = Array.from(
    { length: total },
    () => palette[Math.floor(Math.random() * palette.length)]
  )

  startTimeout = setTimeout(() => {
    typingInterval = setInterval(() => {
      charactersShown.value = Math.min(charactersShown.value + 1, total)

      if (charactersShown.value >= total) {
        clearInterval(typingInterval)
      }
    }, 100)
  }, 1000)
})

onBeforeUnmount(() => {
  clearTimeout(startTimeout)
  clearInterval(typingInterval)
})

const position = ref({ x: 50, y: 50 })

const hoverMode = computed(() => {
  if (props.pParticles.some((particle) => particle.details)) {
    return 'details'
  }
  return 'expand'
})

let positionFrame
let targetFrame

watch(
  () => props.finalPosition,
  (value) => {
    position.value = value
  },
  { deep: true }
)

const particles = computed(() => {
  const originals = props.pParticles
  if (!originals.length) return []

  //const total = props.includeShadows ? Math.max(originals.length, props.maxCount) : originals.length
  const total = Math.max(originals.length, props.maxCount)

  return Array.from({ length: total }, (_, index) => {
    const particle = originals[index % originals.length]

    return {
      ...particle,
      opacity: props.includeShadows
        ? index < originals.length
          ? 1
          : ((props.maxCount - index) / props.maxCount) * 0.6
        : props.opacities[index % props.opacities.length],
      isShadow: index > originals.length,
      details: index < originals.length ? particle.details : undefined,
      click: index < originals.length ? particle.click : undefined,
      class: [particle.class, index > originals.length - 1 ? 'pointer-events-none' : ''],
      zIndex: props.maxCount - index,
    }
  })
})

const amount = ref(1)
const count = computed(() => Math.ceil(amount.value))

let frameId
let startTime

function addParticles(time) {
  startTime ??= time

  const limit = particles.value.length
  if (!limit) return

  amount.value = Math.min(limit, 1 + (time - startTime) * 0.012)

  if (amount.value < limit) {
    frameId = requestAnimationFrame(addParticles)
  }
}

onMounted(() => {
  frameId = requestAnimationFrame(addParticles)
  // Allow the initial centred position to render first.
  positionFrame = requestAnimationFrame(() => {
    targetFrame = requestAnimationFrame(() => {
      position.value = props.finalPosition
    })
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frameId)
  cancelAnimationFrame(positionFrame)
  cancelAnimationFrame(targetFrame)
})

const handleClick = (click) => {
  if (click) {
    navigateTo(click)
  }
}

const hoveredIndex = ref(null)

function particleOffset(index) {
  const base = (index / amount.value) * 100 + (props.startAngle / 360) * 100

  if (hoverMode === 'details' || hoveredIndex.value === null) return `${base}%`

  // Distancia respecto al seleccionado, teniendo en cuenta el cierre del círculo.
  const total = count.value
  const distance = ((index - hoveredIndex.value + total / 2 + total) % total) - total / 2

  // Separar los dos vecinos de cada lado.
  const shift =
    distance === 0 || Math.abs(distance) > 2
      ? 0
      : Math.sign(distance) * (3 - Math.abs(distance)) * 1.5

  return `${base + shift}%`
}
</script>
<template>
  <div class="relative w-full h-full">
    <div
      class="wheelPosition"
      :style="{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }"
    >
      <div
        class="container"
        :style="{
          '--min-font-size': `${props.minFontSize}px`,
          '--max-font-size': `${props.maxFontSize}px`,
          '--circle-radius': `${props.circleRadius}px`,
        }"
        :class="{ 'spin-enabled': props.spinEnabled }"
      >
        <!--    :class="[particles[(i - 1) % particles.length].class]"
              :style="{
            offsetDistance: `${((i - 1) / amount) * 100 + (props.startAngle / 360) * 100}%`,
          }"
        -->

        <svg
          v-if="props.includeGreeting"
          class="inner-text text-primary"
          viewBox="0 0 100 100"
        >
          <defs>
            <path
              id="inner-circle"
              d="M 50,13 a 37,37 0 1,0 0,74 a 37,37 0 1,0 0,-74"
            />
            <path
              id="outer-circle"
              d="M 50,5 a 45,45 0 1,0 0,90 a 45,45 0 1,0 0,-90"
            />
          </defs>

          <text
            font-size="12"
            fill="currentColor"
          >
            <textPath
              href="#inner-circle"
              startOffset="50%"
              text-anchor="middle"
              class="greeting"
            >
              <template
                v-for="(letter, index) in lines[0]"
                :key="index"
              >
                <tspan
                  v-if="letter.visible"
                  class="letter shrink-cursor font-light"
                  fill="currentColor"
                  :style="{ '--letter-color': letter.color }"
                >
                  {{ letter.character }}
                </tspan>
              </template>
            </textPath>
          </text>

          <text
            font-size="6"
            fill="currentColor"
          >
            <textPath
              href="#outer-circle"
              startOffset="50%"
              text-anchor="middle"
              class="text-primary/30"
            >
              <template
                v-for="(letter, index) in lines[1]"
                :key="index"
              >
                <tspan
                  v-if="letter.visible"
                  class="letter shrink-cursor"
                  fill="currentColor"
                  :style="{ '--letter-color': letter.color }"
                >
                  {{ letter.character }}
                </tspan>
              </template>
            </textPath>
          </text>
        </svg>

        <div
          v-for="i in count"
          :key="i"
          class="text-center text-primary font-semibold group flex flex-col gap-1 items-center justify-center"
          :class="[
            particles[(i - 1) % particles.length].class,
            {
              'expand-hover': hoverMode === 'expand',
              'group/particle': hoverMode === 'details',
            },
          ]"
          :style="{
            offsetDistance: particleOffset(i - 1),
            zIndex:
              hoverMode === 'expand' && hoveredIndex === i - 1
                ? 100
                : particles[(i - 1) % particles.length].zIndex,
          }"
          @mouseenter="hoverMode === 'expand' && (hoveredIndex = i - 1)"
          @mouseleave="hoveredIndex = null"
          @click="handleClick(particles[(i - 1) % particles.length].click)"
        >
          <div
            class="shrink-cursor"
            :style="{
              opacity: particles[(i - 1) % particles.length].opacity,
            }"
          >
            {{ particles[(i - 1) % particles.length].text }}
          </div>

          <div
            v-if="hoverMode === 'details' && particles[(i - 1) % particles.length].details"
            class="text-sm opacity-100 group-hover/particle:opacity-0 transition-opacity duration-300"
          >
            {{ particles[(i - 1) % particles.length].details }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.inner-text {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  /* Fit within the particle circle, leaving some breathing room */
  width: max(0px, calc(var(--circle-radius) * 2 - 24px));
  height: auto;

  overflow: visible;
}

.wheelPosition {
  position: absolute;
  transform: translate(-50%, -50%);
  transition:
    left 600ms ease-in-out,
    top 600ms ease-in-out;
}

.container {
  display: inline-grid;
  font-size: var(--max-font-size);

  animation: shrink-text 3.3125s linear forwards;

  & > div {
    grid-area: 1 / 1;
    font-size: inherit;
    width: max-content;
    line-height: 0;
    offset-path: circle(var(--circle-radius));
    offset-anchor: left center;
    offset-rotate: auto -90deg;

    position: relative;
    z-index: inherit;
    transform-origin: left center;

    transition:
      transform 250ms ease,
      offset-distance 250ms ease;
  }

  & > div.expand-hover:hover {
    z-index: 100;
    transform: translateX(20px) scale(1.15);
    text-shadow: 10px 10px 150px currentColor;
  }
}

.container.spin-enabled {
  animation:
    shrink-text 3.3125s linear forwards,
    spin 600s linear infinite;
}

@keyframes shrink-text {
  to {
    font-size: var(--min-font-size);
  }
}

@keyframes shrink-radius {
  from {
    offset-path: circle(360px);
  }
  to {
    offset-path: circle(150px);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.greeting .letter {
  display: inline-block;
  white-space: pre; /* Preserve spaces between words. */

  animation: reveal-flash 700ms ease-out;
  transition: color 300ms ease 500ms;
}

.greeting .letter:hover {
  color: var(--letter-color);
  animation: bounce 700ms ease;
  transition-delay: 0ms;
}

@keyframes reveal-flash {
  from {
    color: var(--letter-color);
  }

  to {
    color: inherit;
  }
}
@keyframes bounce {
  0%,
  100% {
    baseline-shift: 0;
  }

  35% {
    baseline-shift: 3px;
  }

  55% {
    baseline-shift: -1.5px;
  }

  70% {
    baseline-shift: 1px;
  }

  85% {
    baseline-shift: 0;
  }
}
</style>
