// import path from 'node:path'

import vue from '@vitejs/plugin-vue'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },

  dir: {
    app: 'app'
  },

  modules: [
    'nuxt-primevue',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@unlok-co/nuxt-stripe'
  ],

  css: ['primeicons/primeicons.css'],

  googleFonts: {
    base64: true,
    fontsDir: 'assets/fonts',
    overwriting: true,
    families: {
      Inter: [300, 500, 800]
    }
  },

  primevue: {
    options: { unstyled: true },
    importPT: { as: 'Lara', from: './assets/presets/lara/' }

    // not work in Windows
    // importPT: {
    //   as: 'lara',
    //   from: path.resolve(__dirname, './assets/presets/lara/'),
    // },
  },

  supabase: {
    redirect: false
  },

  ogImage: {
    fonts: ['Inter:400', 'Inter:700']
  },

  site: {
    url: process.env.SITE_URL
  },

  imports: {
    dirs: [
      './composables/useMarkdown',
      './composables/useServices',
      './composables/useLogger'
    ]
  },

  stripe: {
    client: {
      key: process.env.STRIPE_CLIENT_KEY
    },
    server: {
      key: process.env.STRIPE_SECRET_KEY
    }
  },

   nitro: {
    rollupConfig: {
      // @ts-ignore
      plugins: [vue()]
    },
  },

  runtimeConfig: {
    stripeProductId5BRL: process.env.STRIPE_PRODUCT_ID_5BRL,
    stripeProductId10BRL: process.env.STRIPE_PRODUCT_ID_10BRL,
    stripeProductId25BRL: process.env.STRIPE_PRODUCT_ID_25BRL,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    resendKey: process.env.RESEND_KEY,
    public: {
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.SITE_URL
    }
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2024-09-01'
})
