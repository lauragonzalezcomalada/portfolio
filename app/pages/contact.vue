<script setup>
import { z } from 'zod'

const { t } = useI18n()

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

const shapeVisible = ref(false)
const lifeVisible = ref(false)
const visionVisible = ref(false)
const ideaVisible = ref(false)
const gotVisible = ref(false)
</script>

<template>
  <div class="relative h-full w-full flex flex-col items-center justify-center gap-15">
    <div class="flex mx-auto items-center text-center">
      <div class="text-primary-500 text-3xl font-ligth">
        <span
          class="got shrink-cursor"
          :class="{ 'is-visible': gotVisible }"
          @mouseenter.once="gotVisible = true"
          >Got
        </span>
        a clear
        <span
          class="vision shrink-cursor"
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
          class="idea shrink-cursor"
          :class="{ 'is-visible': ideaVisible }"
          @mouseenter.once="ideaVisible = true"
          >idea
        </span>
        <span
          class="shape shrink-cursor"
          :class="{ 'is-visible': shapeVisible }"
          @mouseenter.once="shapeVisible = true"
          >shape</span
        >? Let’s bring it to
        <span
          class="life shrink-cursor"
          :class="{ 'is-visible': lifeVisible }"
          @mouseenter.once="lifeVisible = true"
          >life</span
        >
        together.
      </div>
    </div>
    <!-- <svg
      class="absolute w-full h-full overflow-visible animate-[spin_20s_linear_infinite]"
      viewBox="0 0 80 80"
    >
      <defs>
        <path
          id="textCirclePath"
          d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          fill="none"
        />
      </defs>
      <text class="text-[6px] fill-primary-600 font-medium tracking-[0.2em] uppercase">
        <textPath
          href="#textCirclePath"
          startOffset="0%"
        >
          CONTACT ME
        </textPath>
      </text>
    </svg> -->

    <div
      class="relative isolate flex flex-col gap-2 items-center justify-center w-[35vw] h-[25vw] text-white"
    >
      <div class="circle-text">
        <span
          v-for="(letter, index) in [...'EM TCATNOC']"
          :key="index"
          :style="{
            '--angle': `${index * 10 - 45}deg`,
          }"
        >
          {{ letter === ' ' ? '\u00A0' : letter }}
        </span>
      </div>
      <div
        aria-hidden="true"
        class="absolute inset-0 -z-10 rounded-full bg-[var(--cursor-hover-color,#ef4444)] blur-3xl pointer-events-none"
      />
      <UForm
        :schema="emailSchema"
        :state="emailState"
        @submit="sendEmail"
        class="w-[20vw] flex flex-col gap-4"
      >
        <div class="flex gap-4 items-center">
          <UFormField
            label="Your email"
            name="destEmail"
            class="w-full"
            v-slot="{ error }"
            :ui="{ error: 'hidden', label: 'text-white font-semibold' }"
          >
            <div class="flex items-center gap-3">
              <UInput
                v-model="emailState.destEmail"
                placeholder="your-email@example.com"
                class="flex-1 min-w-0 shrink-cursor"
                :ui="{
                  base: 'text-primary-500 bg-white placeholder:text-primary-500 font-semibold ring-0 focus-visible:ring-0',
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

        <div class="flex gap-4 items-center">
          <UFormField
            label="Message"
            name="message"
            class="w-full"
            v-slot="{ error }"
            :ui="{ error: 'hidden', label: 'text-white font-semibold' }"
          >
            <div class="flex items-end gap-3 justify-end">
              <UTextarea
                placeholder="Tell me about your project"
                class="w-full shrink-cursor"
                :rows="6"
                :ui="{
                  base: 'text-primary-500 bg-white placeholder:text-primary-500 font-semibold ring-0 focus-visible:ring-0',
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
        <div class="flex justify-center w-full">
          <UButton
            trailing-icon="i-heroicons-envelope"
            class="shrink-cursor self-end p-2 px-8 shadow-2xl text-[color:var(--cursor-hover-color,#ef4444)]"
            variant="solid"
            type="submit"
            color="neutral"
            :ui="{
              root: 'bg-white',
            }"
          >
            SEND
          </UButton>
        </div>
      </UForm>
    </div>
    <div class="absolute bottom-0 w-full h-20 flex items-center justify-end pe-10 text-primary-500">
      or contact me at <span class="font-semibold ps-1"> lauragonzalezcomalada@gmail.com</span>
    </div>

    <!-- <div class="absolute inset-0 w-full h-full flex items-center justify-center">
    
    </div> -->
  </div>
</template>

<style scoped>
.circle-text {
  --size: 30vmin;
  --radius: calc(var(--size));

  position: absolute;
  width: var(--size);
  height: var(--size);
  color: var(--cursor-hover-color, #ef4444);
  animation: lower-half-spin 8s ease-in-out infinite alternate;
  pointer-events: none;
}

.circle-text span {
  position: absolute;
  left: 50%;
  top: 50%;
  font-size: calc(var(--size) * 0.12);
  font-weight: 500;
  white-space: pre;
  transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(0px - var(--radius)))
    rotate(180deg);
}

@keyframes lower-half-spin {
  from {
    transform: rotate(135deg);
  }
  to {
    transform: rotate(225deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .circle-text {
    animation: none;
  }
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
</style>
