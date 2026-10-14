<script setup>
const route = useRoute()
const scrollLine = ref(null)
const lineHeight = ref(0)
const footerEl = ref(null)

const scrollPosition = useState('depth-scroll-position', () => 0)

const depthProgress = computed(() => {
  const maxDepth = 3 * 1200 // Four sections, three transitions.

  return Math.min(1, Math.max(0, scrollPosition.value / maxDepth))
})

const updateLineHeight = () => {
  if (!scrollLine.value || !footerEl.value) return

  const lineTop = scrollLine.value.getBoundingClientRect().top
  const footerTop = footerEl.value.getBoundingClientRect().top
  const spacing = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1

  const endpoint = Math.min(window.innerHeight, footerTop) - spacing

  lineHeight.value = Math.max(0, endpoint - lineTop)
}
onMounted(() => {
  updateLineHeight()

  window.addEventListener('scroll', updateLineHeight, { passive: true })
  window.addEventListener('resize', updateLineHeight)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateLineHeight)
  window.removeEventListener('resize', updateLineHeight)
})
</script>
<template>
  <div class="relative screen-layout">
    <header
      class="fixed inset-x-0 top-0 h-16 z-50 px-4 flex items-center justify-center gap-12 screen-header bg-white"
      @click="navigateTo('/')"
    >
      <h1
        variant="link"
        class="left-entrance font-semibold text-black/20 hover:text-red-500 shrink-cursor"
        @click="navigateTo('/projects')"
      >
        Projects
      </h1>
      <h1
        variant="link"
        class="bottom-entrance font-semibold text-black/20 hover:text-red-500 shrink-cursor"
        @click="navigateTo('/aboutme')"
      >
        About me
      </h1>
      <h1 class="right-entrance font-semibold text-black/20 hover:text-red-500">Contact</h1>
    </header>
    <main class="pt-16 screen-content">
      <slot />
      <div
        v-if="route.path === '/'"
        class="scroll-arrow"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 240 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            class="scroll-arrow__curve"
            pathLength="1"
            :style="{ strokeDashoffset: 1 - depthProgress }"
            d="
              M 180 20
              C 210 90, 210 170, 180 240
              C 168 268, 230 270, 230 300
              C 230 340, 150 340, 150 300
              C 150 270, 190 270, 190 350
              C 190 410, 205 435, 205 465
              C 205 525, 140 570, 80 570
              L 0 570
            "
          />

          <path
            class="scroll-arrow__head"
            :style="{ opacity: depthProgress >= 0.99 ? 1 : 0 }"
            d="M 20 560 L 0 570 L 20 580"
          />
        </svg>
      </div>
    </main>
    <!--  <footer
      ref="footerEl"
      class="bg-primary p-4 flex w-full justify-center shrink-cursor screen-footer"
    >
   
      <UButton
        to="mailto:lauragonzalezcomalada@gmail.com?subject=Hello%20Laura!%20Want%20to%20catch%20up%20with%20you!"
        external
        label="lauragonzalezcomalada@gmail.com"
        class="text-white font-bold text-lg"
      />
    </footer>-->
    <DrawingOverlay v-if="route.path === '/'" />
  </div>
</template>

<style scoped>
.screen-layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.screen-header,
.screen-footer {
  flex-shrink: 0;
}

.screen-content {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.scroll-arrow {
  position: absolute;
  top: 5rem;
  bottom: 12rem;
  right: 1rem;
  width: clamp(70px, 20vw, 190px);
  pointer-events: none;
  z-index: 50;
  color: var(--color-red-500);
}

.scroll-arrow svg {
  display: block;
  width: 100%;
  height: 100%;
}

.scroll-arrow__curve,
.scroll-arrow__head {
  stroke: currentColor;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.scroll-arrow__curve {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.scroll-arrow__head {
  opacity: 0;
  transition: opacity 150ms ease;
}

@keyframes draw-arrow {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes show-arrowhead {
  to {
    opacity: 1;
  }
}

.left-entrance {
  animation: left-entrance 2000ms ease-out both;
}

@keyframes left-entrance {
  0% {
    opacity: 0;
    transform: translateX(-100vw);
  }

  50% {
    opacity: 1;
    transform: translateX(10px);
  }

  70% {
    opacity: 1;
    transform: translateX(-20px);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
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
    transform: translateX(20px);
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
</style>
