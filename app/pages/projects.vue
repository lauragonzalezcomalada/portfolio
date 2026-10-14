<script setup>
const projects = [
  {
    orientation: 'right',
    title: 'AI-powered Contract Processing Platform',
    shortDescription:
      'An AI-assisted workflow that extracts structured information from real estate contracts, presents it for human validation and synchronises confirmed data with CRM systems.',
    description: {
      title: `AI-powered Contract Processing Platform`,
      sections: [
        {
          label: `The challenge`,
          description: `Real estate transactions involve purchase contracts, broker agreements and supporting addenda, with essential information scattered across documents. Manually transferring property details, financial terms and deadlines into a CRM is time-consuming and prone to errors.`,
        },
        {
          label: `My contribution`,
          description: `I developed the document upload and extraction workflow, integrated Claude for AI-assisted processing, and built the interface for reviewing and editing extracted information. I also implemented data persistence with Supabase and contract-specific field mappings for CRM synchronisation.`,
        },
        {
          label: `How it works`,
          description: `Users upload the documents associated with a transaction. The platform analyses them together and extracts information such as property details, purchase price, key dates, contact information and broker compensation.`,
        },
        {
          label: `Key technical challenges`,
          description: `<ul> <li> <span class="font-semibold">Processing multiple documents:</span> combining information from related PDFs while preserving rules about which document can supply each field.</li>
<li> <span class="font-semibold">Handling uncertainty:</span> returning missing values explicitly and providing field-level confidence scores.</li>
<li> <span class="font-semibold">Keeping compensation data distinct:</span> separating buyer-broker compensation, seller-paid compensation and seller concessions.</li>
<li> <span class="font-semibold">Mapping data to the CRM:</span> translating a consistent extraction format into the appropriate custom fields for each contract type.</li>
</ul>`,
        },
        {
          label: `Product value`,
          description: `The platform brings document processing, human review and CRM updates into one workflow, reducing repetitive data entry while keeping users in control of the information submitted.`,
        },
        {
          label: `Technologies`,
          description: `Nuxt.js · Node.js · Supabase · Tailwind CSS · Claude API · CRM APIs`,
        },
      ],
    },
    keys: [
      'AI Integration',
      'Document Processing',
      'CRM Integration',
      'Supabase',
      'Nuxt.js',
      'Node.js',
      'Tailwind CSS',
    ],
  },
  {
    orientation: 'left',
    title: 'Dynamic Form Builder',
    shortDescription:
      'A configurable form platform that enables non-technical users to create dynamic forms with reusable components, conditional logic, and automatic CRM synchronisation.',
    description: {
      title: 'Dynamic Form Builder',
      sections: [
        {
          label: 'The challenge',
          description: `Different workflows require different information, but creating and maintaining a separate form for every use case introduces repetitive development work. Teams need a flexible way to configure forms without relying on a developer for every change.`,
        },
        {
          label: 'My contribution',
          description: `I developed a configurable form system with reusable input components, conditional field visibility and validation. I connected form submissions to CRM workflows and used Supabase to persist form configurations and submission data.`,
        },
        {
          label: 'How it works',
          description: `Users configure forms using reusable components and define conditions that determine which fields appear. As someone completes a form, the interface adapts to their answers and validates the relevant inputs. Submitted information is mapped to the corresponding CRM fields and synchronised automatically.`,
        },
        {
          label: 'Key technical challenges',
          description: `<ul>
        <li><span class="font-semibold">Reusable field components:</span> supporting different input types through a consistent configuration and component interface.</li>
        <li><span class="font-semibold">Conditional logic:</span> keeping field visibility and validation aligned as answers change.</li>
        <li><span class="font-semibold">Reactive form state:</span> coordinating updates between nested components, dependent fields and validation rules.</li>
        <li><span class="font-semibold">CRM integration:</span> translating configurable form submissions into the field structure expected by the CRM.</li>
      </ul>`,
        },
        {
          label: 'Product value',
          description: `The platform gives teams more control over their data collection workflows, reduces repetitive form development and removes the need to manually transfer submissions into the CRM. Reusable components provide a consistent experience across different forms.`,
        },
        {
          label: 'Technologies',
          description: 'Nuxt.js · Node.js · Supabase · Tailwind CSS · CRM APIs',
        },
      ],
    },
    keys: [
      'Form Builder',
      'Dynamic Forms',
      'CRM Integration',
      'Supabase',
      'Nuxt.js',
      'Node.js',
      'Tailwind CSS',
    ],
  },
  {
    orientation: 'right',
    title: 'Local Events & Community Platform',
    shortDescription:
      'A web and mobile platform for publishing local events, managing ticket sales, and discovering nearby activities based on location, interests, and availability.',
    description: {
      title: 'Local Events & Community Platform',
      sections: [
        {
          label: 'The challenge',
          description: `Local event discovery and organisation often involve separate tools for promotion, ticketing and payments. The goal was to bring these activities together, helping organisers manage their events and making it easier for people to find activities that fit their interests and schedules.`,
        },
        {
          label: 'My contribution',
          description: `I developed the web platform and a companion mobile app using Flutter, implementing event publishing, ticket management, attendance tracking and location-based discovery. I also integrated banking functionality to support payment workflows. The earlier web implementation used Python and Django on the backend, with Angular and Vue on the frontend; I am planning its migration to Nuxt.js, Express, Node.js and Supabase.`,
        },
        {
          label: 'How it works',
          description: `Organisers publish local events and projects, manage ticket sales and track attendance. Users browse activities through an interactive map and filter results by location, interests and dates. The web platform and Flutter mobile app provide access to these workflows, with banking integration supporting payments.`,
        },
        {
          label: 'Key technical challenges',
          description: `<ul>
        <li><span class="font-semibold">Location-based discovery:</span> combining interactive map search with filters for interests and dates.</li>
        <li><span class="font-semibold">Ticket management:</span> coordinating ticket sales and attendance records for each event.</li>
        <li><span class="font-semibold">Banking integration:</span> connecting payment workflows with event and ticket data.</li>
        <li><span class="font-semibold">Web and mobile experiences:</span> adapting event discovery and management workflows to browser and mobile interfaces.</li>
      </ul>`,
        },
        {
          label: 'Product value',
          description: `The platform connects local communities with relevant activities while giving organisers a central place to publish events, manage tickets and track participation. Web and mobile access supports both advance planning and discovery on the go.`,
        },
        {
          label: 'Technologies',
          description: `Current implementation: Python · Django · Angular · Vue.js · Flutter · Banking integration<br>
      Planned web migration: Nuxt.js · Express · Node.js · Supabase · Tailwind CSS`,
        },
      ],
    },
    keys: [
      'Event Management',
      'Ticket Sales',
      'Map-based Discovery',
      'Banking Integration',
      'Flutter',
      'Django',
      'Vue.js',
    ],
  },
  {
    orientation: 'left',
    title: 'Forensic Report Automation Platform',
    shortDescription:
      'A configurable document generation platform that transforms structured form submissions into professional Word reports for forensic experts and expert witnesses.',
    description: {
      title: 'Forensic Report Automation Platform',
      sections: [
        {
          label: 'The challenge',
          description: `Preparing expert reports involves organising case information, drafting recurring sections and maintaining consistent document formatting. Repeating this work manually takes time and can introduce omissions or inconsistencies across reports.`,
        },
        {
          label: 'My contribution',
          description: `I developed a configurable workflow that connects structured form inputs with report generation, including editable Word (.docx) generation. I built the form interface and document generation logic using Nuxt.js.`,
        },
        {
          label: 'How it works',
          description: `Users enter case information through structured forms. The platform uses the submitted data and configured report structure to assemble a formatted document. Reports can be exported as editable Word documents for further review and refinement.`,
        },
        {
          label: 'Key technical challenges',
          description: `<ul>
        <li><span class="font-semibold">Configurable report structures:</span> supporting different reporting requirements while reusing common sections and generation logic.</li>
        <li><span class="font-semibold">Data-to-document mapping:</span> placing submitted information into the appropriate report sections and handling optional or missing values.</li>
      </ul>`,
        },
        {
          label: 'Product value',
          description: `The platform reduces repetitive drafting and formatting work, helping professionals prepare reports more consistently. Word export gives experts the flexibility to refine the content before finalising it.`,
        },
        {
          label: 'Technologies',
          description: 'Nuxt.js · Tailwind CSS · DOCX generation',
        },
      ],
    },
    keys: ['Document Generation', 'Forensic Reports', 'DOCX Export', 'Nuxt.js', 'Tailwind CSS'],
  },
]

const container = ref(null)
const drawingEnabled = ref(false)
const animationFinished = ref(false)
let sketch
let disposed = false

const mouseX = ref(0)
const mouseY = ref(0)

let xCenter
let yCenter

const wheelTarget = computed(() => ({
  // Keep the wheel opposite the modal.
  x: detailsOpen.value ? (pushedLeft.value ? 0.75 : 0.25) : 0.5,
  y: 0.5,
}))

const txt = 'PROJECTS'
const txt2 = 'AI-powered Contract Processing Platform'

onMounted(async () => {
  const { default: P5 } = await import('p5')

  if (disposed) return
  let size = 300
  const minSize = 35
  const shrinkSpeed = 80

  addEventListener('mousemove', (event) => {
    mouseX.value = event.clientX
    mouseY.value = event.clientY
  })

  sketch = new P5((p) => {
    p.setup = () => {
      p.createCanvas(container.value.clientWidth, container.value.clientHeight)
      xCenter = p.width / 2
      yCenter = p.height / 2
      p.frameRate(60)
      p.textAlign(p.LEFT, p.CENTER)
    }
    p.draw = () => {
      p.background(255, 255, 255)
      size = Math.max(minSize, size - (shrinkSpeed * p.deltaTime) / 1000)
      p.textSize(size)

      let amount = Math.min(p.frameCount / 5, 70)
      let step = 360 / amount
      const opacities = [1, 0.2, 0.8, 0.2]

      p.push()

      const targetX = wheelTarget.value.x * p.width
      const targetY = wheelTarget.value.y * p.height
      // Smooth movement, independent of frame rate.
      const easing = 1 - Math.exp((-5 * p.deltaTime) / 2000)

      xCenter += (targetX - xCenter) * easing
      yCenter += (targetY - yCenter) * easing

      p.push()
      p.translate(xCenter, yCenter)

      for (let i = 0; i < amount; i++) {
        const alpha = opacities[i % 4] * 255

        let rotation = step * i
        p.push()
        p.rotate(p.radians(rotation + p.frameCount / 100))
        p.fill(255, 51, 65, alpha)
        p.stroke(255, 51, 65, alpha)
        p.textFont('Bricolage Grotesque')
        p.text(txt, 80, 0)
        p.pop()
      }
      p.pop()
      p.pop()
      animationFinished.value = size <= minSize
    }
  }, container.value)
})

onBeforeUnmount(() => {
  disposed = true
  sketch?.remove()
})
const detailsOpen = ref(false)
const pushedLeft = ref(false)

const openProjectDetails = (project) => {
  console.log('project: ', project)
  detailsOpen.value = !detailsOpen.value
  if (detailsOpen.value) {
    if (project.orientation === 'left') {
      pushedLeft.value = true
    } else {
      pushedLeft.value = false
    }
  } else {
    pushedLeft.value = false
  }
}
const onModalOpenChange = (open) => {
  // Close modal event
  if (!open) {
    pushedLeft.value = false
    detailsOpen.value = false
  }
}
</script>

<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <div
      ref="container"
      class="absolute inset-0 w-full h-full shrink-cursor"
    />

    <div
      v-if="animationFinished"
      class="absolute z-20 grid px-10"
      :class="
        detailsOpen
          ? /*pushedLeft
            ? 'grid-cols-1 gap-x-0 gap-y-4 right-5'
            : 'grid-cols-1 gap-x-0 gap-y-4 left-5'*/ 'hidden'
          : 'grid-cols-1 md:grid-cols-2 gap-x-[50dvw] gap-y-[2dvh]'
      "
    >
      <div
        v-for="project in projects"
        :key="project.title"
        class="project-card shrink-cursor relative isolate overflow-hidden flex flex-col gap-2 max-w-xs bg-white text-primary p-4 rounded-2xl shadow-lg shadow-primary-200 hover:scale-102 transition-all duration-500 hover:shadow-lg"
      >
        <h2 class="text-xl font-bold">{{ project.title }}</h2>
        <p
          v-if="!detailsOpen"
          class="text-xs"
        >
          {{ project.shortDescription }}
        </p>
        <div
          v-if="!detailsOpen"
          class="flex flex-wrap gap-2"
        >
          <div
            v-for="key in project.keys"
            :key="key"
          >
            <UBadge
              :label="key"
              variant="outline"
              class="ring-primary/70 text-primary/70"
            />
          </div>
        </div>
        <UModal
          :ui="{
            content: [
              'top-[9dvh] translate-x-0 translate-y-0',
              'w-[50dvw] max-w-none ring-0 border-0 shadow-2xl shadow-primary-500',
              'transition-[left] duration-1000 ease-in-out',
              pushedLeft ? 'left-[5dvw]' : 'left-[45dvw]',
            ].join(' '),
            overlay: 'bg-primary-100/20 backdrop-blur-2xs',
          }"
          @update:open="onModalOpenChange"
        >
          <UButton
            trailing-icon="i-heroicons-chevron-right"
            variant="link"
            size="sm"
            class="self-end mt-auto text-primary/70 hover:text-primary"
            @click="openProjectDetails(project)"
            >Project Details
          </UButton>
          <template #content>
            <div
              class="flex flex-col gap-4 p-8 shrink-cursor scrollable overflow-y-auto bg-primary text-white max-h-[85dvh] min-w-[50dvw] no-border"
            >
              <h2 class="text-3xl font-bold">{{ project.description.title }}</h2>
              <div
                v-for="section in project.description.sections"
                :key="section.label"
              >
                <h3 class="text-lg font-semibold">{{ section.label }}</h3>
                <div
                  class="text-sm"
                  v-html="section.description"
                ></div>
              </div>
            </div>
          </template>
        </UModal>
      </div>
    </div>
  </div>
  <!--  <div
    id="projects"
    class="min-h-[calc(100dvh-4rem)] relative flex flex-col items-center justify-center m-10"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="project in projects"
        :key="project.title"
        class="project-card shrink-cursor relative isolate overflow-hidden flex flex-col gap-4 h-[calc(50dvh-3rem)] bg-primary text-white p-4 rounded-xl hover:scale-102 transition-all duration-500 hover:shadow-lg"
      >
        <h2 class="text-2xl font-bold">{{ project.title }}</h2>
        <p class="text-sm">{{ project.shortDescription }}</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="key in project.keys"
            :key="key"
          >
            <UBadge
              :label="key"
              variant="outline"
              class="ring-white/70 text-white/70"
            />
          </div>
        </div>
        <UModal :ui="{ content: ' min-w-[calc(100dvw-50dvw)] no-border' }">
          <UButton
            trailing-icon="i-heroicons-chevron-right"
            variant="link"
            size="sm"
            class="self-end mt-auto text-white/70 hover:text-white"
            >Project Details
          </UButton>
          <template #content>
            <div
              class="flex flex-col gap-4 p-8 shrink-cursor scrollable overflow-y-auto bg-red-500 text-white"
            >
              <h2 class="text-3xl font-bold">{{ project.description.title }}</h2>
              <div
                v-for="section in project.description.sections"
                :key="section.label"
              >
                <h3 class="text-lg font-semibold">{{ section.label }}</h3>
                <div
                  class="text-sm"
                  v-html="section.description"
                ></div>
              </div>
            </div>
          </template>
        </UModal>
      </div>
    </div>
    <div class="flex justify-center text-sm text-primary items-center mt-10">
      Do you want to know more about my work?
      <UButton
        variant="link"
        to="/LauraGonzalezComalada_CV.pdf"
        external
        target="_blank"
        label="Click here"
        class="shrink-cursor hover:font-semibold transition-all duration-300 ease-in-out"
      />
    </div>
  </div> -->
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
}

.project-card:hover::before {
  opacity: 1;
}

.project-card:hover,
.project-card:hover * {
  color: #fefefe;
}

.project-card,
.project-card * {
  transition: color 200ms ease;
}

.project-card::selection,
.project-card *::selection {
  background-color: var(--ui-secondary);
  color: var(--ui-primary);
}

.project-card {
  animation: fade-in 1500ms ease-out both;
}
</style>
