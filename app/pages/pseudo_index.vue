<script setup>
import { z } from 'zod'
import confetti from '@hiseb/confetti'

const charactersShown = ref(0)
const totalCharacters = segments.reduce((total, segment) => total + segment.text.length, 0)

onMounted(() => {
  const interval = setInterval(() => {
    charactersShown.value++

    if (charactersShown.value >= totalCharacters) {
      clearInterval(interval)
    }
  }, 100)

  onUnmounted(() => clearInterval(interval))
})

function visibleText(segmentIndex) {
  const previousLength = segments
    .slice(0, segmentIndex)
    .reduce((total, segment) => total + segment.text.length, 0)

  return segments[segmentIndex].text.slice(0, Math.max(0, charactersShown.value - previousLength))
}

const shapeVisible = ref(false)
const lifeVisible = ref(false)
const visionVisible = ref(false)
const ideaVisible = ref(false)
const gotVisible = ref(false)

const scrollPosition = useState('depth-scroll-position', () => 0)
const sectionSpacing = 1200
const sectionCount = 4

function sectionStyle(index) {
  const z = scrollPosition.value - index * sectionSpacing
  const opacity = Math.max(0, 1 - Math.abs(z) / 1000)

  const entrance = Math.min(1, Math.max(0, -z / 1000))
  const angle = (entrance * Math.PI) / 3

  const y = -200 * Math.sin(angle)
  const tilt = entrance * -20

  return {
    transform: `
      translate3d(0, ${y}px, ${z}px)
      rotateX(${tilt}deg)
    `,
    opacity,
    visibility: opacity > 0 ? 'visible' : 'hidden',
    pointerEvents: opacity > 0.5 ? 'auto' : 'none',
  }
}

function handleWheel(event) {
  // Preserve browser zoom / trackpad pinch.
  if (event.ctrlKey) return
  event.preventDefault()

  // Wheel input can be measured in pixels, lines, or pages.
  const multiplier =
    event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? event.currentTarget.clientHeight : 1

  const movement = event.deltaY * multiplier

  scrollPosition.value = Math.max(
    0,
    Math.min(scrollPosition.value + movement, (sectionCount - 1) * sectionSpacing)
  )
}

const startSendEmailAnimation = ref(false)
const emailSentSuccess = ref(false)
const emailSentError = ref(false)
const progress = ref(0)
let timer

const sendEmail = async () => {
  startSendEmailAnimation.value = true
  progress.value = 5
  clearInterval(timer)
  timer = setInterval(() => {
    progress.value += (90 - progress.value) * 0.08
  }, 200)

  try {
    await $fetch('/api/send', {
      method: 'POST',
      body: {
        replyToEmail: emailState.value.destEmail,
        subject: emailState.value.subject,
        message: emailState.value.message,
      },
    })
    progress.value = 100
    emailSentSuccess.value = true
    confetti({
      position: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
      count: 300,
      size: 2,
      velocity: 300,
      fade: false,
      color: ['#20bf55', '#ff3341', '#5e7ce2', '#fee440', '#802097'],
    })
  } catch (error) {
    progress.value = 100
    emailSentError.value = true
  } finally {
    clearInterval(timer)
  }
}

const emailState = ref({
  destEmail: '',
  subject: "Let's work together!",
  message: '',
})

const emailSchema = z.object({
  destEmail: z.email("There's something wrong...").min(1, 'Required'),
  subject: z.string().optional(),
  message: z.string().min(1, "Come on, don't be shy!"),
})
</script>

<template>
  <div
    ref="scrollTrack"
    class="scroll-track text-black/90 depth-page"
    @wheel="handleWheel"
  >
    <div class="viewport">
      <section
        class="depth-section"
        :style="sectionStyle(0)"
      >
        <div class="flex flex-col">
          <div class="text-[70px] font-bold">
            <div class="max-w-5xl items-center mx-auto">
              <template
                v-for="(segment, index) in segments"
                :key="index"
              >
                <span :class="segment.class">
                  <span :class="{ 'reveal-flash': visibleText(index).length > 0 }">
                    {{ visibleText(index) }}
                  </span>
                </span>

                <br
                  v-if="segment.breakAfter && visibleText(index).length === segment.text.length"
                />
              </template>
              <span
                class="cursor font-semibold text-[70px]"
                aria-hidden="true"
                >|</span
              >
            </div>
          </div>
          <div
            class="text-md absolute bottom-20 right-20"
            :class="charactersShown >= totalCharacters ? 'block' : 'hidden'"
          >
            I like making things—sometimes useful, sometimes playful, always an excuse to figure
            something out.
          </div>
        </div>
      </section>
      <section
        class="depth-section"
        :style="sectionStyle(1)"
      >
        <div class="flex m-10 mt-30 max-w-5xl mx-auto items-center gap-10">
          <div class="max-w-xl text-xl">
            I studied Telecommunications Engineering at ETSETB, part of UPC – BarcelonaTech. After
            graduating, I started building for the web, exploring new techniques and turning
            creative ideas into working projects. I now build end-to-end solutions using modern
            technologies to make useful, intuitive, and playful digital experiences.
          </div>
          <img
            src="/jo_no_fons.png"
            class="w-50 h-auto"
          />
        </div>
      </section>
      <section
        class="depth-section"
        :style="sectionStyle(2)"
      >
        <div class="flex m-10 my-50 max-w-5xl mx-auto items-center text-center">
          <div class="text-black text-5xl font-light">
            <span
              class="got"
              :class="{ 'is-visible': gotVisible }"
              @mouseenter.once="gotVisible = true"
              >Got
            </span>
            a clear
            <span
              class="vision"
              :class="{ 'is-visible': visionVisible }"
              @mouseenter.once="visionVisible = true"
            >
              vision
              <img
                src="/eye.png"
                alt=""
                class="vision-eyes"
              />
            </span>

            or an
            <span
              class="idea"
              :class="{ 'is-visible': ideaVisible }"
              @mouseenter.once="ideaVisible = true"
              >idea
            </span>
            <span
              class="shape"
              :class="{ 'is-visible': shapeVisible }"
              @mouseenter.once="shapeVisible = true"
              >shape</span
            >? Let’s bring it to
            <span
              class="life"
              :class="{ 'is-visible': lifeVisible }"
              @mouseenter.once="lifeVisible = true"
              >life</span
            >
            together.
          </div>
        </div>
      </section>
      <section
        class="depth-section"
        :style="sectionStyle(3)"
      >
        <div
          class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden w-full max-w-5xl rounded-2xl text-primary shadow-xl/30 shadow-primary-900"
        >
          <div
            aria-hidden="true"
            class="emailCard absolute inset-0 bg-primary origin-left border-4 border-primary p-4 px-8 rounded-2xl transition-transform duration-700 ease-out z-20 flex w-full h-full items-center justify-center"
            :style="{ transform: `scaleX(${progress / 100})` }"
          >
            <div
              v-if="emailSentSuccess"
              class="flex flex-col gap-4 items-center justify-center"
            >
              <div class="text-white text-3xl font-bold">Thanks for reaching me out!</div>

              <div class="text-white text-xl">I will get back to you as soon as possible</div>
            </div>
            <div
              v-else-if="emailSentError"
              class="emailSentError flex flex-col items-center justify-center gap-4"
            >
              <div class="text-white text-2xl font-bold">
                Ooops, looks like something went wrong...
              </div>
              <div class="text-white text-lg">
                Just try it manually sending an email to
                <a
                  href="mailto:lauragonzalezcomalada@gmail.com?subject=Let's work together!&body=Tell me about your project"
                  class="shrink-cursor"
                >
                  lauragonzalezcomalada@gmail.com
                </a>
              </div>
            </div>
          </div>

          <UForm
            :schema="emailSchema"
            :state="emailState"
            class="relative z-10 space-y-4 border-4 border-primary p-4 px-8 rounded-2xl"
            @submit="sendEmail"
          >
            <div class="flex gap-4 items-center border-b py-2 border-dashed">
              <div>from:</div>
              <UFormField
                name="destEmail"
                class="w-full"
                v-slot="{ error }"
                :ui="{ error: 'hidden' }"
              >
                <div class="flex items-center gap-3">
                  <UInput
                    v-model="emailState.destEmail"
                    placeholder="your-email@example.com"
                    class="flex-1 min-w-0 shrink-cursor"
                    :ui="{
                      base: 'text-red-500 placeholder:text-red-500 font-semibold',
                    }"
                  />

                  <span
                    v-if="error"
                    class="text-sm text-primary font-bold shrink-0"
                    role="alert"
                  >
                    {{ error }}
                  </span>
                </div>
              </UFormField>
            </div>
            <div class="flex gap-4 items-center border-b pb-2 border-dashed">
              <div>to:</div>
              <div class="font-semibold">lauragonzalezcomalada@gmail.com</div>
            </div>
            <div class="flex gap-4 items-center border-b pb-2">
              <div>Subject:</div>
              <UInput
                placeholder="Let's work together!"
                class="w-full shrink-cursor"
                :ui="{
                  base: 'text-red-500 placeholder:text-red-500 font-semibold',
                }"
                v-model="emailState.subject"
              />
            </div>
            <div class="flex gap-4 items-center border-b pb-4">
              <UFormField
                name="message"
                class="w-full"
                v-slot="{ error }"
                :ui="{ error: 'hidden' }"
              >
                <div class="flex items-end gap-3 justify-end">
                  <UTextarea
                    placeholder="Tell me about your project"
                    class="w-full shrink-cursor"
                    :rows="6"
                    :ui="{
                      base: 'text-red-500 placeholder:text-red-500',
                    }"
                    v-model="emailState.message"
                  />
                  <span
                    v-if="error"
                    class="text-sm text-primary font-bold shrink-0"
                    role="alert"
                  >
                    {{ error }}
                  </span>
                </div>
              </UFormField>
            </div>
            <div class="flex justify-end w-full">
              <UButton
                trailing-icon="i-heroicons-envelope"
                class="shrink-cursor self-end p-2 px-8 shadow-2xl"
                variant="solid"
                type="submit"
              >
                SEND
              </UButton>
            </div>
          </UForm>
        </div>
      </section>
    </div>
  </div>
</template>
<style scoped>
.emailCard:has(.emailSentError) {
  animation: fade-black 500ms ease-out both;
}
@keyframes fade-black {
  0% {
    background-color: var(--ui-primary);
    border-color: var(--ui-primary);
    color: var(--ui-secondary);
  }

  100% {
    background-color: #330003;
    border-color: #330003;
    color: #ffffff;
  }
}

@keyframes fly {
  0% {
    opacity: 0;
    transform: translateY(-100vw);
  }

  70% {
    opacity: 1;
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes left-entrance {
  0% {
    opacity: 0;
    transform: translateX(-100vw);
  }

  70% {
    opacity: 1;
    transform: translateX(-10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.reveal-flash {
  animation: reveal-flash 700ms step-end;
}

@keyframes reveal-flash {
  from {
    color: var(--reveal-color, inherit);
  }

  to {
    color: inherit;
  }
}

.depth-page {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scroll-track {
  position: relative;
  width: 100%;
}

.viewport {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  perspective: 1400px;
  perspective-origin: center;
  background: white;
}

.depth-section {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  transform-origin: center;
  backface-visibility: hidden;
}

.vision {
  position: relative;
  display: inline-block;
}

.vision-eyes {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 2rem;
  height: auto;
  max-width: none;
  margin-bottom: 0.25rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease;
}

.vision.is-visible .vision-eyes {
  opacity: 1;
}

.idea.is-visible {
  font-style: italic;
}

.shape.is-visible {
  font-family: 'Rock 3D', system-ui;
}

.got.is-visible {
  font-family: 'GameOfThronesFont', system-ui;
  font-size: 28px;
}

.life {
  transition: color 300ms ease;
}

.life.is-visible {
  color: var(--color-yellow-500);
}
.hover-appear {
  opacity: 0;
}

.hover-appear:mouse-in {
  opacity: 1;
  transition: transform 100ms ease-in;
}
.project-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  border-radius: inherit;
  background: var(--cursor-hover-color, #f59e0b);
  opacity: 0;
  /*transition: opacity 500ms ease-in;*/
}

.project-card:hover::before {
  opacity: 1;
}

.project-card::selection,
.project-card *::selection {
  background-color: var(--ui-secondary);
  color: var(--ui-primary);
}

.orbit-plane {
  position: absolute;
  inset: 0;
  overflow: visible;

  transform: rotate(var(--axis-angle));
  transition: transform 100ms ease-out;
}

.orbit-item {
  position: absolute;
  inset: 0;
  width: max-content;
  height: max-content;

  /* Almost circular, but with a visible orientation */
  offset-path: ellipse(var(--orbit-radius) calc(var(--orbit-radius) * 0.9) at 50% 50%);

  offset-anchor: center;
  offset-rotate: 0deg;

  animation: orbit 12s linear infinite;
}

.orbit-text {
  display: block;
  white-space: nowrap;

  /* Keep labels horizontal when the orbit axis rotates */
  transform: rotate(calc(-1 * var(--axis-angle)));
  transition: transform 100ms ease-out;
}

@keyframes orbit {
  from {
    offset-distance: 0%;
  }

  to {
    offset-distance: 100%;
  }
}

.letter {
  display: inline-block;
  font-size: 1em;
  transition:
    color 300ms ease 500ms,
    transform 300ms ease 1000ms;
}

.letter:hover {
  animation: bounce 700ms ease;
  transition-delay: 0ms;
}

.cursor {
  animation: blink 700ms step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@keyframes bounce {
  0%,
  100% {
    transform: translateX(0);
  }

  35% {
    transform: translateX(-10px);
  }

  55% {
    transform: translateX(6px);
  }

  70% {
    transform: translateX(-4px);
  }

  85% {
    transform: translateX(0);
  }
}

.fall-in {
  animation: fall-in 2000ms ease-out both;
}

@keyframes fall-in {
  0% {
    opacity: 0;
    transform: translateY(-100vh);
  }

  10% {
    opacity: 1;
    transform: translateY(12px);
  }

  30% {
    opacity: 1;
    transform: translateY(-10px);
  }

  70% {
    opacity: 1;
    transform: translateY(5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.right-entrance {
  animation: right-entrance 2000ms ease-out both;
}

@keyframes right-entrance {
  0% {
    opacity: 0;
    transform: translateX(100vw);
  }

  50% {
    opacity: 1;
    transform: translateX(-10px);
  }

  70% {
    opacity: 1;
    transform: translateX(10px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.bottom-entrance {
  animation: bottom-entrance 2000ms ease-out both;
}

@keyframes bottom-entrance {
  0% {
    opacity: 0;
    transform: translateY(100vh);
  }

  50% {
    opacity: 1;
    transform: translateY(-10px);
  }

  70% {
    opacity: 1;
    transform: translateY(5px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.projects-title {
  position: absolute;
  top: 100px;
  left: 100px;

  /* Visually starts at 10px, 10px */
  opacity: 0;
  transform: translate(-90px, -90px);

  transition:
    opacity 700ms ease-out,
    transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.projects-title.is-visible {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
