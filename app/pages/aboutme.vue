<script setup>
const items = [
  { id: 1, text: 'Traveling the world is what I enjoy the most' },
  { id: 2, text: 'Traveling the world is what I enjoy the most' },
  { id: 3, text: 'Traveling the world is what I enjoy the most' },
  { id: 4, text: 'Traveling the world is what I enjoy the most' },
  { id: 5, text: 'Traveling the world is what I enjoy the most' },
  { id: 6, text: 'Traveling the world is what I enjoy the most' },
  { id: 7, text: 'Traveling the world is what I enjoy the most' },
  { id: 8, text: 'Traveling the world is what I enjoy the most' },
  { id: 9, text: 'Traveling the world is what I enjoy the most' },
  { id: 10, text: 'Traveling the world is what I enjoy the most' },
  { id: 11, text: 'Traveling the world is what I enjoy the most' },
  { id: 12, text: 'Traveling the world is what I enjoy the most' },
  { id: 13, text: 'Traveling the world is what I enjoy the most' },
  { id: 14, text: 'Traveling the world is what I enjoy the most' },
  { id: 15, text: 'Traveling the world is what I enjoy the most' },
  { id: 16, text: 'Traveling the world is what I enjoy the most' },
  { id: 17, text: 'Traveling the world is what I enjoy the most' },
  { id: 18, text: 'Traveling the world is what I enjoy the most' },
]
const orbitContainer = ref(null)

const orbitRadius = ref(150)
const axisAngle = ref(0)

const handleMouseMove = (event) => {
  if (!orbitContainer.value) return

  const rect = orbitContainer.value.getBoundingClientRect()

  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  // Unlimited radius controlled by mouseX
  orbitRadius.value = event.clientX * 0.1

  // Axis follows the mouse direction using X and Y
  axisAngle.value = Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI)
}
</script>

<template>
  <div
    id="aboutme"
    class="min-h-[calc(100dvh-4rem)] flex items-center justify-center overflow-visible"
    @mousemove="handleMouseMove"
  >
    <div
      ref="orbitContainer"
      class="relative w-96 h-96 overflow-visible"
      :style="{
        '--orbit-radius': `${orbitRadius}px`,
        '--axis-angle': `${axisAngle}deg`,
      }"
    >
      <!-- Fixed center -->
      <div class="absolute inset-0 z-10 flex items-center justify-center">
        <span class="text-2xl font-bold text-red-500"> About me </span>
      </div>

      <!-- Rotatable orbit axis -->
      <div class="orbit-plane">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="orbit-item"
          :style="{
            animationDelay: `${-index * (12 / items.length)}s`,
          }"
        >
          <span class="orbit-text">
            {{ item.text }}
          </span>
        </div>
      </div>
    </div>
  </div>
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
  font-size: 2.3em;
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

.scroll-arrow {
  position: absolute;
  top: 2rem;
  right: 0.2rem;
  bottom: 2rem;
  width: 2rem;
  pointer-events: none;
  z-index: 50;
}

.scroll-arrow__line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  background: var(--color-red-500);
  transform: translateX(-50%);
  transform-origin: top;
  animation: extend-line 3.5s ease-out forwards;
}

/* Arrowhead */
.scroll-arrow__line::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0.5rem;
  height: 0.5rem;
  border-right: 1.5px solid var(--color-red-500);
  border-bottom: 1.5px solid var(--color-red-500);
  transform: translate(-50%, 0%) rotate(45deg);
}

@keyframes extend-line {
  from {
    transform: translateX(-50%) scaleY(0);
  }

  to {
    transform: translateX(-50%) scaleY(1);
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
