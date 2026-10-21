<script setup>
const { t, locale, setLocale } = useI18n()
const localePath = useLocalePath()

const selectedLocale = ref(locale.value || 'en')

watch(selectedLocale, (newLocale) => {
  setLocale(newLocale)
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
