<script setup>
const { t, tm, rt, localePath } = useI18n()

/*
const container = ref(null)
const drawingEnabled = ref(false)
const animationFinished = ref(false)
let sketch
let disposed = false

const mouseX = ref(0)
const mouseY = ref(0)

let xCenter
let yCenter

const wheelTarget = computed(() => ({
  // Keep the wheel opposite the modal.
  x: detailsOpen.value ? (pushedLeft.value ? 0.75 : 0.25) : 0.5,
  y: 0.5,
}))

*/

const projects = computed(() => tm('projects.projects'))
const txt = t('projects.spinningWeel')
/*
onMounted(async () => {
  const { default: P5 } = await import('p5')

  if (disposed) return
  let size = 300
  const minSize = 35
  const shrinkSpeed = 80

  addEventListener('mousemove', (event) => {
    mouseX.value = event.clientX
    mouseY.value = event.clientY
  })

  sketch = new P5((p) => {
    p.setup = () => {
      p.createCanvas(container.value.clientWidth, container.value.clientHeight)
      xCenter = p.width / 2
      yCenter = p.height / 2
      p.frameRate(60)
      p.textAlign(p.LEFT, p.CENTER)
    }
    p.draw = () => {
      p.background(255, 255, 255)
      size = Math.max(minSize, size - (shrinkSpeed * p.deltaTime) / 1000)
      p.textSize(size)

      let amount = Math.min(p.frameCount / 5, 70)
      let step = 360 / amount
      const opacities = [1, 0.2, 0.8, 0.2]

      p.push()

      const targetX = wheelTarget.value.x * p.width
      const targetY = wheelTarget.value.y * p.height
      // Smooth movement, independent of frame rate.
      const easing = 1 - Math.exp((-5 * p.deltaTime) / 2000)

      xCenter += (targetX - xCenter) * easing
      yCenter += (targetY - yCenter) * easing

      p.push()
      p.translate(xCenter, yCenter)

      for (let i = 0; i < amount; i++) {
        const alpha = opacities[i % 4] * 255

        let rotation = step * i
        p.push()
        p.rotate(p.radians(rotation + p.frameCount / 100))
        p.fill(255, 51, 65, alpha)
        p.stroke(255, 51, 65, alpha)
        p.textFont('Bricolage Grotesque')
        p.text(txt, 80, 0)
        p.pop()
      }
      p.pop()
      p.pop()
      animationFinished.value = size <= minSize
    }
  }, container.value)
})
*/
/*
onBeforeUnmount(() => {
  disposed = true
  sketch?.remove()
})*/

const detailsOpen = ref(false)
const pushedLeft = ref(false)

const wheelTarget = computed(() => ({
  x: detailsOpen.value
    ? pushedLeft.value
      ? 75 // Modal on the left → wheel on the right
      : 25 // Modal on the right → wheel on the left
    : 50,
  y: 50,
}))

const openProjectDetails = (project) => {
  detailsOpen.value = !detailsOpen.value
  if (detailsOpen.value) {
    if (project.orientation === 'left') {
      pushedLeft.value = true
    } else {
      pushedLeft.value = false
    }
  } else {
    pushedLeft.value = false
  }
}
const onModalOpenChange = (open) => {
  // Close modal event
  if (!open) {
    pushedLeft.value = false
    detailsOpen.value = false
  }
}
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <!-- <div
      ref="container"
      class="absolute inset-0 w-full h-full shrink-cursor"
    /> -->
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <SpinningWheel
        :finalPosition="wheelTarget"
        :opacities="[1, 0.3, 0.8, 0.3]"
        :pParticles="[
          {
            text: t('projects.spinningWeel'),
          },
        ]"
        :minFontSize="30"
        :maxCount="70"
        :circleRadius="80"
        :includeShadows="false"
        :spinEnabled="false"
        :includeInnerMessage="false"
      />
    </div>

    <div
      class="absolute z-20 grid px-10"
      :class="detailsOpen ? 'hidden' : 'grid-cols-1 md:grid-cols-2 gap-x-[50dvw] gap-y-1'"
    >
      <div
        v-for="project in projects"
        :key="project.title"
        @click="openProjectDetails(project)"
        class="project-card shrink-cursor relative isolate overflow-hidden flex flex-col gap-2 max-w-sm bg-white text-primary p-4 rounded-2xl shadow-lg shadow-primary-200 hover:scale-102 transition-all duration-500 hover:shadow-lg"
      >
        <h2 class="text-xl font-bold">{{ rt(project.title) }}</h2>
        <p
          v-if="!detailsOpen"
          class="text-xs"
        >
          {{ rt(project.shortDescription) }}
        </p>
        <div
          v-if="!detailsOpen"
          class="flex flex-wrap gap-2"
        >
          <div
            v-for="key in project.keys"
            :key="key"
          >
            <UBadge
              :label="rt(key)"
              variant="outline"
              class="ring-primary/70 text-primary/70"
            />
          </div>
        </div>
        <UButton
          trailing-icon="i-heroicons-chevron-right"
          variant="link"
          size="sm"
          class="self-end mt-auto text-primary/70 hover:text-primary"
          >Project Details
        </UButton>
        <UModal
          :ui="{
            content: [
              'top-[9dvh] translate-x-0 translate-y-0',
              'w-[80dw] md:w-[50dvw] max-w-none ring-0 border-0 shadow-2xl shadow-primary-500',
              'transition-[left] duration-1000 ease-in-out',
              pushedLeft ? 'left-[5dvw]' : 'left-[45dvw]',
            ].join(' '),
            overlay: 'bg-primary-50/10 backdrop-blur-2xs',
          }"
          @update:open="onModalOpenChange"
          :open="detailsOpen"
        >
          <template #content>
            <div
              class="flex flex-col gap-4 p-8 shrink-cursor scrollable overflow-y-auto bg-primary text-white max-h-[85dvh] min-w-[50dvw] no-border"
            >
              <h2 class="text-3xl font-bold">{{ rt(project.description.title) }}</h2>
              <div
                v-for="section in project.description.sections"
                :key="section.label"
              >
                <h3 class="text-lg font-semibold">{{ rt(section.label) }}</h3>
                <div
                  class="text-sm"
                  v-html="rt(section.description)"
                ></div>
              </div>
            </div>
          </template>
        </UModal>
      </div>
    </div>
  </div>
  <!--  <div
    id="projects"
    class="min-h-[calc(100dvh-4rem)] relative flex flex-col items-center justify-center m-10"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="project in projects"
        :key="project.title"
        class="project-card shrink-cursor relative isolate overflow-hidden flex flex-col gap-4 h-[calc(50dvh-3rem)] bg-primary text-white p-4 rounded-xl hover:scale-102 transition-all duration-500 hover:shadow-lg"
      >
        <h2 class="text-2xl font-bold">{{ project.title }}</h2>
        <p class="text-sm">{{ project.shortDescription }}</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="key in project.keys"
            :key="key"
          >
            <UBadge
              :label="key"
              variant="outline"
              class="ring-white/70 text-white/70"
            />
          </div>
        </div>
        <UModal :ui="{ content: ' min-w-[calc(100dvw-50dvw)] no-border' }">
          <UButton
            trailing-icon="i-heroicons-chevron-right"
            variant="link"
            size="sm"
            class="self-end mt-auto text-white/70 hover:text-white"
            >Project Details
          </UButton>
          <template #content>
            <div
              class="flex flex-col gap-4 p-8 shrink-cursor scrollable overflow-y-auto bg-red-500 text-white"
            >
              <h2 class="text-3xl font-bold">{{ project.description.title }}</h2>
              <div
                v-for="section in project.description.sections"
                :key="section.label"
              >
                <h3 class="text-lg font-semibold">{{ section.label }}</h3>
                <div
                  class="text-sm"
                  v-html="section.description"
                ></div>
              </div>
            </div>
          </template>
        </UModal>
      </div>
    </div>
    <div class="flex justify-center text-sm text-primary items-center mt-10">
      Do you want to know more about my work?
      <UButton
        variant="link"
        to="/LauraGonzalezComalada_CV.pdf"
        external
        target="_blank"
        label="Click here"
        class="shrink-cursor hover:font-semibold transition-all duration-300 ease-in-out"
      />
    </div>
  </div> -->
</template>

<style scoped>
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  background: var(--cursor-hover-color, #f59e0b);
  opacity: 0;
}

.project-card:hover::before {
  opacity: 1;
}

.project-card:hover,
.project-card:hover * {
  color: #fefefe;
}

.project-card,
.project-card * {
  transition: color 200ms ease;
}

.project-card::selection,
.project-card *::selection {
  background-color: var(--ui-secondary);
  color: var(--ui-primary);
}

.project-card {
  animation: fade-in 2s ease-out both 3s;
}
</style>
