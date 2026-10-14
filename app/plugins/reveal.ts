// app/plugins/reveal.ts

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<HTMLElement>('reveal', {
    mounted(element) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return
          
          if (entry.isIntersecting) {
            element.classList.add('is-visible')
          } else {
            element.classList.remove('is-visible')
          }
        },
        {
          threshold: 0.2,
        },
      )

      observer.observe(element)
    },

    getSSRProps() {
      return {}
    },
  })
})