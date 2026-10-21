// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', name: 'English', language: 'en-US', file: 'en.json' },
      { code: 'es', name: 'Español', language: 'es-ES', file: 'es.json' },
      { code: 'cat', name: 'Català', language: 'ca-ES', file: 'cat.json' },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    compilation: {
      strictMessage: false,
      escapeHtml: false,
    },
  },
  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
    fallback: 'light',
  },
  devServer: { port: 3005 },
})
