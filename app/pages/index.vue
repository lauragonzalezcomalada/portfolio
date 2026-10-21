<script setup>
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()
console.log('Idioma actual:', locale.value)

const selectedLocale = ref(locale.value || 'en')

watch(selectedLocale, (newLocale) => {
  setLocale(newLocale)
})
const messages = [
  {
    id: 1,
    text: t('home.greeting'),
  },
  {
    id: 2,
    text: 'In which language do you want to visit the site?',
    options: [
      { label: 'English', value: 'en' },
      { label: 'Español', value: 'es' },
      { label: 'Català', value: 'cat' },
    ],
  },
]

const typedText = ref('')
let typingInterval

const typeText = (text) => {
  clearInterval(typingInterval)
  typedText.value = ''

  let charactersShown = 0

  typingInterval = setInterval(() => {
    charactersShown++
    typedText.value = text.slice(0, charactersShown)

    if (charactersShown >= text.length) {
      clearInterval(typingInterval)
    }
  }, 100)
}

onMounted(() => {
  setTimeout(() => {
    typeText(t('home.greeting'))
  }, 3000)
})

onBeforeUnmount(() => {
  clearInterval(typingInterval)
})
</script>

<template>
  <div class="relative h-screen w-full">
    <SpinningWheel
      :opacities="[100, 100, 100, 100]"
      :pParticles="[
        {
          text: t('nav.projects'),
          click: localePath('/projects'),
          class: 'text-primary',
        },
        {
          text: t('nav.about'),
          click: localePath('/aboutme'),
          class: 'text-secondary',
        },
        {
          text: t('nav.contact'),
          click: localePath('/contact'),
          class: 'text-warning',
        },
        {
          text: t('nav.playground'),
          click: localePath('/'),
          class: 'text-success',
        },
      ]"
      :maxCount="35"
      :minFontSize="85"
      :includeShadows="true"
      :spinEnabled="false"
      :startAngle="-20"
      :circleRadius="200"
      :includeGreeting="true"
    />
  </div>

  <div class="absolute top-10 right-0 h-[90%] flex flex-col items-end shrink-cursor px-8 w-1/4">
    <div>
      <USelect
        :items="[
          { label: 'EN', value: 'en' },
          { label: 'ES', value: 'es' },
          { label: 'CAT', value: 'cat' },
        ]"
        v-model="selectedLocale"
        variant="outline"
        color="primary"
        class="text-sm text-gray-500"
      >
      </USelect>
    </div>
  </div>
  <!-- 
      <div class="right-entry flex flex-col gap-0 bg-green-200 w-full absolute top-2/3 right-0">
        <!--   <div class="text-4xl tracking-tight text-primary">
          Hi, this is
          <span class="font-semibold"> Laura González Comalada</span>
        </div>
        <div class="text-3xl tracking-tight text-primary/70">
          Software engineer with an eye for design
        </div> -->
  <!--  <SpinningWheel
          :opacities="[100]"
          :pParticles="[
            {
              text: 'lauragonzalezcomalada',
            },
          ]"
          :maxCount="50"
          :minFontSize="10"
          :maxFontSize="100"
          :includeShadows="false"
          :spinEnabled="true"
          :circleRadius="50"
        />
      </div> -->

  <!--  <div class="flex flex-col gap-0 items-end">
        <div class="text-[60px] font-bold tracking-tight">Hi, I'm Laura</div>
        <div class="text-[60px] font-semibold tracking-tight">Welcome to my site!</div>
        <div class="text-[30px] font-semibold tracking-tight">
          Please choose in which language you want to visit the site
        </div>
      </div> -->
  <!--  </div> -->

  <!-- <div class="absolute bottom-20 w-full flex flex-col items-end shrink-cursor px-8 gap-0">
      <div
        v-for="(message, index) in messages"
        :key="message.id"
        class="message-enter max-w-md"
        :style="{ '--delay': `${3500 + index * 700}ms` }"
        :ui="{ container: 'pb-0!' }"
      >
        <UChatMessage
          side="right"
          :avatar="{
            src: '/jo_no_fons.png',
            loading: 'lazy',
          }"
          :parts="[
            {
              type: 'text',
            },
          ]"
          variant="outline"
          color="primary"
        >
          <template #content>
            <p class="text-sm text-gray-500">{{ typedText }}</p>
            <div
              v-if="message.options"
              class="flex flex-col gap-2"
            >
              <UButton
                v-for="option in message.options"
                :key="option.value"
                :label="option.label"
                :value="option.value"
                @click="setLocale(option.value)"
                variant="outline"
                color="primary"
              >
                {{ option.label }}
              </UButton>
            </div>
          </template>
        </UChatMessage>
      </div>
    </div> -->
  <!-- </div> -->
</template>
<style scoped>
.right-entry {
  /* animation: right-entry-appear 1000ms cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0ms) backwards 2s; */
  animation: enter-from-right 3s ease-out both 3.5s;
}

@keyframes enter-from-right {
  from {
    transform: translateX(100vw);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .right-entry {
    animation: none;
  }
}
</style>
