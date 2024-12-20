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
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxthub/core',
    '@nuxt/content',
    '@nuxt/ui',
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
      langs: ['py', 'md', 'http'],
    },
    sources: {
      content: mdSource,
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
