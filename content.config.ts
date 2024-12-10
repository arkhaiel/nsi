import { defineCollection } from '@nuxt/content'

export const collections = {
  content: defineCollection({
    type: 'page',
    source: '../../nsi-md/**/*.md',
  }),
}
