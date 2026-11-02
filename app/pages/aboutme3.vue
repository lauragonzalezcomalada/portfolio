<script setup>
const { t, tm, rt } = useI18n()
const isIntro = ref(true)
const countries = computed(() =>
  tm('aboutme.country_list').map((country) => ({
    text: rt(country),
  }))
)

const path = computed(() =>
  tm('aboutme.path').map((item) => ({
    text: rt(item.text),
    details: rt(item.details),
    class: rt(item.class || 'text-warning font-light'),
  }))
)

const references = computed(() =>
  tm('aboutme.references').map((item) => ({
    text: rt(item.text),
    click: rt(item.href),
    class: rt(item.class || 'text-warning font-light'),
  }))
)

const pathScroll = ref(0)
const sectionSpacing = 900

const activeIndex = computed(() => {
  const index = Math.round(pathScroll.value / sectionSpacing)
  return Math.min(Math.max(0, index), Math.max(0, path.value.length - 1))
})

const typedTitle = ref([])
const typedDetails = ref([])

function typedSlice(text, count) {
  return Array.from(text ?? '')
    .slice(0, count ?? 0)
    .join('')
}

let typingInterval

function startTyping(index) {
  clearInterval(typingInterval)

  const item = path.value[index]
  if (!item) return

  const titleLen = Array.from(item.text).length
  const detailsLen = Array.from(item.details).length

  if (
    (typedTitle.value[index] ?? 0) >= titleLen &&
    (typedDetails.value[index] ?? 0) >= detailsLen
  ) {
    return
  }

  typedTitle.value[index] = 0
  typedDetails.value[index] = 0

  typingInterval = setInterval(() => {
    const titleShown = typedTitle.value[index] ?? 0
    const detailsShown = typedDetails.value[index] ?? 0

    if (titleShown < titleLen) {
      typedTitle.value[index] = titleShown + 1
      typedTitle.value = [...typedTitle.value]
      return
    }

    if (detailsShown < detailsLen) {
      typedDetails.value[index] = detailsShown + 1
      typedDetails.value = [...typedDetails.value]
      return
    }

    clearInterval(typingInterval)
  }, 40)
}

onMounted(() => {
  setTimeout(() => {
    isIntro.value = false
    startTyping(activeIndex.value)
  }, 3000)

  watch(activeIndex, (index) => {
    if (!isIntro.value) startTyping(index)
  })
})

onBeforeUnmount(() => clearInterval(typingInterval))

function sectionStyle(index) {
  const radius = 520
  const step = Math.PI / 3.5
  const theta = (index - pathScroll.value / sectionSpacing) * step

  // Vertical circle in YZ, viewed along Z: next goes up and back, previous down and back.
  const y = radius * (Math.cos(theta) - 1)
  const z = -radius * Math.sin(theta)
  const tilt = -(theta * 180) / Math.PI / 3
  const opacity = Math.max(0, (Math.cos(theta) - 0.3) / 0.85)

  return {
    transform: `
      translate3d(0, ${y}px, ${z}px)
      rotateX(${tilt}deg)
    `,
    opacity,
    visibility: opacity > 0.05 ? 'visible' : 'hidden',
    zIndex: Math.round(200 + z),
  }
}

function handlePathWheel(event) {
  if (event.ctrlKey) return

  event.preventDefault()
  event.stopPropagation()

  const multiplier =
    event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? event.currentTarget.clientHeight : 1

  const movement = event.deltaY * multiplier
  const maxScroll = Math.max(0, (path.value.length - 1) * sectionSpacing)

  pathScroll.value = Math.max(0, Math.min(pathScroll.value + movement, maxScroll))
}
</script>

<template>
  <div class="relative -mt-16 h-screen w-full overflow-hidden">
    <div class="absolute inset-0 pointer-events-none">
      <SpinningWheel
        :finalPosition="{ x: 20, y: 40 }"
        :opacities="[1, 0.6, 0.8, 0.6]"
        :pParticles="countries"
        :minFontSize="30"
        :maxCount="22"
        :circleRadius="80"
        :includeShadows="false"
        :spinEnabled="true"
        :includeInnerMessage="true"
        :innerMessage="['aboutme.countries_line1', 'aboutme.countries_line2']"
        :greetingSize="22"
      />
    </div>

    <!-- <div
      v-if="isIntro"
      class="absolute inset-0 pointer-events-none"
    >
      <SpinningWheel
        :finalPosition="{ x: 75, y: 50 }"
        :opacities="[1, 0.6, 0.8, 0.6]"
        :pParticles="path.map((p) => ({ text: p.text, class: p.class }))"
        :minFontSize="30"
        :maxCount="50"
        :circleRadius="50"
        :includeShadows="true"
        :spinEnabled="true"
      />
    </div> -->

    <div
      v-if="!isIntro"
      class="absolute inset-0 flex pointer-events-none items-center justify-center"
    >
      <div
        class="path-scroll pointer-events-auto w-[min(90vw,56rem)] px-20 h-[80vh]"
        @wheel="handlePathWheel"
      >
        <div class="path-viewport shrink-cursor">
          <section
            v-for="(p, index) in path"
            :key="p.text"
            class="path-section"
            :style="sectionStyle(index)"
          >
            <div class="flex flex-col items-start text-left px-20 w-full max-w-lg">
              <div
                class="text-2xl"
                :class="p.class"
              >
                {{ typedSlice(p.text, typedTitle[index]) }}
              </div>
              <div
                class="text-xl text-black/70"
                :class="p.class"
              >
                {{ typedSlice(p.details, typedDetails[index]) }}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <div class="absolute inset-0 pointer-events-none">
      <SpinningWheel
        :finalPosition="{ x: 80, y: 60 }"
        :opacities="[1, 1, 1]"
        :pParticles="references"
        :minFontSize="25"
        :startAngle="-25"
        :maxCount="30"
        :circleRadius="70"
        :includeShadows="true"
        :spinEnabled="false"
        :includeVinilImage="true"
      />
    </div>

    <!--
    <aside class="absolute inset-0 pointer-events-none">
      <p class="absolute right-10 top-[11%] text-[10px] tracking-[0.35em] uppercase text-black/30">
        {{ t('aboutme.currently_into') }}
      </p>

      <a
        v-for="item in references"
        :key="item.text"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        class="reference shrink-cursor group pointer-events-auto absolute origin-right text-right font-semibold leading-none"
        :class="item.class"
        :style="item.style"
      >
        <span
          class="block transition-transform duration-300 group-hover:-translate-x-2 group-hover:italic"
        >
          {{ item.text }}
        </span>
        <span
          class="mt-1 block text-[10px] font-normal not-italic tracking-[0.2em] uppercase text-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          {{ t(item.noteKey) }}
        </span>
      </a>
    </aside>
    -->
  </div>
</template>

<style scoped>
.path-scroll {
  overflow: hidden;
}

.path-viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  perspective: 1100px;
  perspective-origin: center;
  transform-style: preserve-3d;
}

.path-section {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  transform-origin: center;
  backface-visibility: hidden;
}

.reference {
  text-decoration: none;
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
.move-to {
  animation: move-to 1s ease-in-out;
}

@keyframes move-to {
  from {
    transform: translate(50%, 50%);
  }

  to {
    transform: translate(20px, 80px);
  }
}
</style>
