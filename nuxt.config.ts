const cookieDomain = process.env.NODE_ENV === 'development' ? '.localhost.com' : '.nsi.rocks'
export default defineNuxtConfig({
  modules: [
    '@nuxthub/core',
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxtjs/mdc',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@nuxt/scripts',
    '@nuxt/icon',
    '@nuxt/eslint',
    'nuxt-authorization',
    '@vueuse/nuxt',
  ],
  // icon: {
  //   clientBundle: {
  //     scan: true,
  //     sizeLimitKb: 512,
  //   },
  // },
  $development: {
    hub: {
      remote: true,
    },
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
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
          langs: ['py', 'md', 'http', 'typescript'],
        },
      },
    },
  },
  runtimeConfig: {
    mistralAPI: process.env.MISTRAL_API_KEY,
    session: {
      cookie: {
        domain: cookieDomain,
      },
    },
  },
  devServer: {
    host: 'localhost.com',
    https: {
      key: process.env.CAPDEV_SSL_KEY,
      cert: process.env.CAPDEV_SSL_CERT,
    },
  },
  future: { compatibilityVersion: 4 },
  compatibilityDate: '2024-07-30',
  // nitro: {
  //   prerender: {
  //     routes: ['/snt', '/nsi'],
  //     crawlLinks: true,
  //   },
  // },
  hub: {
    database: true,
    kv: true,
    blob: true,
  },
  vite: {
    server: {
      allowedHosts: ['localhost.com', 'rgb.localhost.com', 'lang.localhost.com'],
    },
  },
  eslint: {
    config: {
      stylistic: {
        quotes: 'single',
      },
    },
  },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: './app/assets/icons',
    }],
  },
})