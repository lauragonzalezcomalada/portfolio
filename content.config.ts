import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

const commonSchema = z.object({})

export default defineContentConfig({
  collections: {
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**',
        prefix: '',
      },
      schema: commonSchema,
    }),
    content_es: defineCollection({
      type: 'page',
      source: {
        include: 'es/**',
        prefix: '',
      },
      schema: commonSchema,
    }),
    content_cat: defineCollection({
      type: 'page',
      source: {
        include: 'cat/**',
        prefix: '',
      },
      schema: commonSchema,
    }),
  },
})
