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
  includeInnerMessage: {
    type: Boolean,
    default: false,
  },
  innerMessage: {
    type: Array,
    required: false,
    default: ['home.greeting_line1', 'home.greeting_line2'],
  },
  greetingSize: {
    type: Number,
    default: 12,
  },
  includeVinilImage: {
    type: Boolean,
    default: false,
  },
})

const startAngle = ref(props.startAngle)
const runningAnimation = ref(true)

const palette = [
  'var(--color-blue-500)',
  'var(--color-green-500)',
  'var(--color-yellow-500)',
  'var(--color-purple-500)',
]

const texts = computed(() => [t(props.innerMessage[0]), t(props.innerMessage[1])])

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
      // class: [particle.class, index > originals.length - 1 ? 'pointer-events-none' : ''],
      class: [
        particle.class ?? 'text-primary',
        index > originals.length - 1 ? [] : ['pointer-events-auto', 'shrink-cursor'],
      ],
      zIndex: props.maxCount - index,
    }
  })
})

const amount = ref(1)
//const count = computed(() => Math.ceil(amount.value))
const count = computed(() => Math.min(particles.value.length, Math.ceil(amount.value)))

let frameId
let startTime

const animatedFontSize = ref(props.maxFontSize)
const introAngle = ref(0)
const introDone = ref(false)

function animateIntro(time) {
  startTime ??= time

  const duration = 3000
  const elapsed = Math.min(time - startTime, duration)

  // Equivalent to Processing's frameCount, independent of screen refresh rate.
  const frameCount = (elapsed * 60) / 1000

  // Processing: amount = frameCount
  amount.value = Math.min(particles.value.length, Math.max(1, frameCount))

  // Processing: textSize(240 - frameCount * 2)
  animatedFontSize.value = Math.max(props.minFontSize, props.maxFontSize - frameCount * 2)

  // Faster than the example: two complete turns in three seconds.
  introAngle.value = frameCount * 4

  if (elapsed < duration) {
    frameId = requestAnimationFrame(animateIntro)
  } else {
    animatedFontSize.value = props.minFontSize
    introDone.value = true
    runningAnimation.value = false
  }
}

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
  // frameId = requestAnimationFrame(addParticles)
  frameId = requestAnimationFrame(animateIntro)
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
    window.open(click, '_blank')
  }
}

const hoveredIndex = ref(null)

function particleOffset(index) {
  const base = (index / amount.value) * 100 + ((startAngle.value + introAngle.value) / 360) * 100

  //const base = (index / amount.value) * 100 + (startAngle.value / 360) * 100

  if (hoveredIndex.value === null) return `${base}%`

  // Distancia respecto al seleccionado, teniendo en cuenta el cierre del círculo.
  const total = count.value
  const distance = ((index - hoveredIndex.value + total / 2 + total) % total) - total / 2

  // Separar los dos vecinos de cada lado. Details needs a bit more room for the caption.
  const strength = hoverMode.value === 'details' ? 2.2 : 1.5
  const shift =
    distance === 0 || Math.abs(distance) > 2
      ? 0
      : Math.sign(distance) * (3 - Math.abs(distance)) * strength

  return `${base + shift}%`
}
const particleDetailsVisible = ref([])

const makeDetailsVisible = (index) => {
  if (runningAnimation.value) return
  particleDetailsVisible.value[index] = true
  runningAnimation.value = true
  startAngle.value = -(index * 360) / amount.value
  setTimeout(() => {
    runningAnimation.value = false
  }, 600)
}

function hoverParticle(index) {
  hoveredIndex.value = index
  if (hoverMode.value === 'details') makeDetailsVisible(index)
}
</script>
<template>
  <div class="relative w-full h-full pointer-events-none">
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
        :class="{
          'intro-running': !introDone,
          'spin-enabled': introDone && props.spinEnabled,
        }"
      >
        <!-- @animationend.self="runningAnimation = !$event.animationName.includes('shrink-text')"-->
        <!--    :class="[particles[(i - 1) % particles.length].class]"
              :style="{
            offsetDistance: `${((i - 1) / amount) * 100 + (props.startAngle / 360) * 100}%`,
          }"
        -->

        <img
          v-if="props.includeVinilImage"
          src="/vinil.png"
          @click="handleClick('https://www.youtube.com/watch?v=dQw4w9WgXcQ')"
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-35 h-auto pointer-events-auto shrink-cursor spin"
        />

        <svg
          v-if="props.includeInnerMessage"
          class="inner-text text-primary pointer-events-auto"
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
            :font-size="`${props.greetingSize}px`"
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
            :font-size="`${props.greetingSize * 0.5}px`"
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
          class="text-center font-semibold flex flex-col gap-4 justify-center"
          :class="[
            particles[(i - 1) % particles.length].class,
            {
              'expand-hover': hoverMode === 'expand',
              'group/particle': hoverMode === 'details',
            },
          ]"
          :style="{
            offsetDistance: particleOffset(i - 1),
            zIndex: hoveredIndex === i - 1 ? 100 : particles[(i - 1) % particles.length].zIndex,
          }"
          @mouseenter="hoverParticle(i - 1)"
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
            v-if="hoverMode === 'details' && particles[i - 1].details"
            :class="{ 'is-visible': particleDetailsVisible[i - 1] }"
            class="particle-details text-sm group-hover/particle:opacity-100 transition-opacity duration-300"
            @mouseenter="hoverParticle(i - 1)"
          >
            {{ particles[i - 1].details }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.inner-image {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  width: max(0px, calc(var(--circle-radius) * 2 - 12px));
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  pointer-events: none;
}

.particle-details {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 0.75rem;

  width: max-content;
  line-height: 1.4;
  pointer-events: none;
  text-wrap: wrap;
  text-align: left;
  max-width: 20dvw;
  opacity: 0;
}

.particle-details.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: translate(0, 0);
}

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
    line-height: 1;
    offset-path: circle(var(--circle-radius));
    offset-anchor: left center;
    offset-rotate: auto -90deg;

    position: relative;
    z-index: inherit;
    transform-origin: left center;

    transition:
      transform 500ms ease,
      offset-distance 1.5s ease;
  }

  & > div.expand-hover:hover {
    z-index: 100;
    transform: translateX(20px) scale(1.15);
    text-shadow: 10px 10px 150px currentColor;
  }
}

.container.intro-running > div {
  transition: none;
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

.spin {
  animation: spin 8s linear infinite;
}

@keyframes spin {
  from {
    rotate: 0deg;
  }

  to {
    rotate: 360deg;
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
