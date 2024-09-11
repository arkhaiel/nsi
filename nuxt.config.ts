export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
          integrity: 'sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+',
          crossorigin: 'anonymous',
        },
      ],
    },
  },
  content: {
    experimental: {
      clientDB: true,
    },
    markdown: {
      remarkPlugins: [
        'remark-math',
      ],
      rehypePlugins: [
        'rehype-katex',
      ],
    },
    highlight: {
      preload: ['py', 'md'],
    },
  },
  compatibilityDate: '2024-07-30',
  future: { compatibilityVersion: 4 },
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxthub/core',
    '@nuxt/eslint',
    '@nuxt/content',
    '@nuxt/ui',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@nuxt/image',
  ],

  hub: {
    database: true,
  },

  runtimeConfig: {
    public: {
      helloText: 'Hello from the Edge 👋',
    },
  },

  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  devtools: { enabled: true },
})
