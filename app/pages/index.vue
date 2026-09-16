<script setup>
const segments = [
  { text: "Hi, I'm " },
  { text: 'L', class: 'letter-l letter hover:text-red-500 shrink-cursor' },
  { text: 'a', class: 'letter-a-1 letter hover:text-blue-500 shrink-cursor' },
  { text: 'u', class: 'letter-u letter hover:text-green-500 shrink-cursor' },
  { text: 'r', class: 'letter-r letter hover:text-yellow-500 shrink-cursor' },
  { text: 'a', class: 'letter-a-2 letter hover:text-purple-500 shrink-cursor' , breakAfter: true},
  { text: "and I'm a " },
 /* { text: 'f', class: 'letter-l letter hover:text-red-500' },
  { text: 'u', class: 'letter-a-1 letter hover:text-blue-500' },
  { text: 'l', class: 'letter-u letter hover:text-green-500' },
  { text: 'l', class: 'letter-r letter hover:text-yellow-500' },
  { text: '-', class: 'letter-r letter hover:text-yellow-500' },
  { text: 's', class: 'letter-a-2 letter hover:text-purple-500' },
  { text: 't', class: 'letter-a-2 letter hover:text-green-500' },
  { text: 'a', class: 'letter-a-2 letter hover:text-blue-500' },
  { text: 'c', class: 'letter-a-2 letter hover:text-yellow-500' },
  { text: 'k', class: 'letter-a-2 letter hover:text-red-500' },
  { text: ' '},*/
  { text: 's', class: 'letter-a-2 letter hover:text-green-500 shrink-cursor' },
  { text: 'o', class: 'letter-a-2 letter hover:text-blue-500 shrink-cursor' },
  { text: 'f', class: 'letter-a-2 letter hover:text-purple-500 shrink-cursor' },
  { text: 't', class: 'letter-a-2 letter hover:text-yellow-500 shrink-cursor' },
  { text: 'w', class: 'letter-a-2 letter hover:text-red-500 shrink-cursor' },
  { text: 'a', class: 'letter-a-2 letter hover:text-blue-500 shrink-cursor' },
  { text: 'r', class: 'letter-a-2 letter hover:text-green-500 shrink-cursor' },
  { text: 'e', class: 'letter-a-2 letter hover:text-yellow-500 shrink-cursor'  },
  { text: ' ',},
  { text: 'e', class: 'letter-a-2 letter hover:text-red-500 shrink-cursor' },
  { text: 'n', class: 'letter-a-2 letter hover:text-blue-500 shrink-cursor' },
  { text: 'g', class: 'letter-a-2 letter hover:text-green-500 shrink-cursor ' },
  { text: 'i', class: 'letter-a-2 letter hover:text-yellow-500 shrink-cursor' },
  { text: 'n', class: 'letter-a-2 letter hover:text-red-500 shrink-cursor' },
  { text: 'e', class: 'letter-a-2 letter hover:text-blue-500 shrink-cursor' },
  { text: 'e', class: 'letter-a-2 letter hover:text-green-500 shrink-cursor' },
  { text: 'r', class: 'letter-a-2 letter hover:text-yellow-500 shrink-cursor' },
 
]

const charactersShown = ref(0)

const totalCharacters = segments.reduce(
  (total, segment) => total + segment.text.length,
  0
)

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

  return segments[segmentIndex].text.slice(
    0,
    Math.max(0, charactersShown.value - previousLength)
  )
}

</script>

<template>


  <div class="header fixed top-0 left-0 w-full p-4 flex items-center gap-12 justify-center bg-white">
    <h1 class="fall-in font-semibold text-black/20 hover:text-red-500 hover:animate-bounce hover:duration-700">
      Projects
    </h1>
    <h1 class="bottom-entrance font-semibold text-black/20 hover:text-red-500">
      About me
    </h1>
    <h1 class="right-entrance font-semibold text-black/20 hover:text-red-500">
      Contact
    </h1>
  </div>
  <div
    class="
      relative flex min-h-screen
      items-center justify-center
      text-black/90 
    "
  >
    <h1 class="text-start text-5xl font-bold ">
      <template
        v-for="(segment, index) in segments"
        :key="index"
      >
        <span :class="segment.class">
          {{ visibleText(index) }}
        </span>

        <br
          v-if="
            segment.breakAfter &&
            visibleText(index).length === segment.text.length
          "
        >
      </template>
      <span class="cursor" aria-hidden="true">|</span>

    </h1>

    <div class="scroll-arrow" aria-hidden="true">
      <div class="scroll-arrow__line" />
    </div>

    <!-- <UButton
      icon="i-heroicons-chevron-down"
      variant="link"
      to="#work"
      class="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      View my work
    </UButton> -->
  </div>
  <div id="work" class="h-screen">
    hola work
  </div>
</template>

<style scoped>
.letter{
  display: inline-block;
  font-size: 1em;
  transition:
    color 300ms ease 500ms,
    transform 300ms ease 1000ms;
}

.letter:hover {
  animation: bounce 700ms ease ;
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
  right: 3rem;
  bottom: 2rem;
  width: 2rem;
}

.scroll-arrow__line {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 0;
  background: var(--color-red-500);
  transform: translateX(-50%);
  animation: extend-line 3.5s ease-out forwards;
}

/* Arrowhead */
.scroll-arrow__line::after {
  content: "";
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
    height: 0;
  }

  to {
    height: 50%;
  }
}
</style>