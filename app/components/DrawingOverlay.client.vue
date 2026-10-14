<script setup>
const container = ref(null)
const drawingEnabled = ref(false)

let sketch
let disposed = false

function handleKeyDown(event) {
  // Don't trigger shortcuts while typing in a field.
  if (
    event.target instanceof Element &&
    event.target.closest('input, textarea, select, [contenteditable]')
  )
    return

  if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return

  if (event.key.toLowerCase() === 'd') {
    drawingEnabled.value = !drawingEnabled.value
  }

  if (event.code === 'Space' && drawingEnabled.value) {
    event.preventDefault()
    sketch?.clear()
  }

  if (event.key === 'Escape') {
    drawingEnabled.value = false
  }
}

onMounted(async () => {
  const { default: P5 } = await import('p5')

  if (disposed) return

  sketch = new P5((p) => {
    let previousPoint = null

    p.setup = () => {
      const renderer = p.createCanvas(window.innerWidth, window.innerHeight)

      p.clear()
      p.stroke(getComputedStyle(container.value).color)
      p.strokeWeight(2)

      const canvas = renderer.elt
      canvas.style.touchAction = 'none'

      const getPoint = (event) => {
        const rect = canvas.getBoundingClientRect()

        return {
          x: (event.clientX - rect.left) * (p.width / rect.width),
          y: (event.clientY - rect.top) * (p.height / rect.height),
        }
      }

      canvas.addEventListener('pointerdown', (event) => {
        if (!drawingEnabled.value || event.button !== 0) return

        canvas.setPointerCapture(event.pointerId)
        previousPoint = getPoint(event)
      })

      canvas.addEventListener('pointermove', (event) => {
        if (!drawingEnabled.value) {
          previousPoint = null
          return
        }

        if (!previousPoint) return

        const point = getPoint(event)

        p.line(previousPoint.x, previousPoint.y, point.x, point.y)
        previousPoint = point
      })

      const stopDrawing = () => {
        previousPoint = null
      }

      canvas.addEventListener('pointerup', stopDrawing)
      canvas.addEventListener('pointercancel', stopDrawing)
      canvas.addEventListener('lostpointercapture', stopDrawing)
    }

    p.windowResized = () => {
      p.resizeCanvas(window.innerWidth, window.innerHeight)
      previousPoint = null
    }
  }, container.value)

  window.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  disposed = true
  window.removeEventListener('keydown', handleKeyDown)
  sketch?.remove()
})
</script>

<template>
  <div
    ref="container"
    class="drawing-overlay"
    :class="{ 'is-drawing': drawingEnabled }"
    aria-hidden="true"
  />

  <div class="drawing-hint">
    {{ drawingEnabled ? 'Drag to draw · Space to clear · D to exit' : 'Press D to draw' }}
  </div>
</template>

<style scoped>
.drawing-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  color: var(--ui-primary);
}

.drawing-overlay.is-drawing {
  pointer-events: auto;
  cursor: crosshair;
}

.drawing-overlay :deep(canvas) {
  display: block;
}

.drawing-hint {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  z-index: 101;
  pointer-events: none;
  font-size: 0.75rem;
  color: #bc4749;
}
</style>
