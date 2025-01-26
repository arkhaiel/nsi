import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**/*',
        prefix: '',
      },
      schema: z.object({
        icon: z.string(),
        landing: z.boolean(),
      }),
    }),
  },
})
