import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

const mdSource = process.env.NODE_ENV === 'development'
  ? {
      driver: 'fs',
      base: '../nsi-md',
    }
  : {
      driver: 'github',
      repo: 'mathieunicolas/nsi-md',
      branch: 'main',
    }

export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/content',
    '@nuxt/ui-pro',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/icon',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
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
  css: ['~/assets/css/main.css'],
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {},
        },
        highlight: {
          theme: {
            // Default theme (same as single string)
            default: 'github-light',
            light: 'github-light',
            // Theme used if `html.dark`
            dark: 'github-dark',
            // Theme used if `html.sepia`
            sepia: 'monokai',
          },
          langs: ['py', 'md', 'http'],
        },
      },
    },
    database: {
      type: 'd1',
      binding: 'content',
    },
  },
  runtimeConfig: {
    session: {
      cookie: {
        domain: '.nsi.rocks',
      },
    },
  },
  devServer: {
    host: 'localhost.com',
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  hub: {
    database: true,
    kv: true,
    // cache: true,
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  // icon: {
  //   clientBundle: {
  //     scan: true,
  //     sizeLimitKb: 512,
  //   },
  // },
})
