import path from "node:path"

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: [
    "nuxt-primevue",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    '@nuxtjs/supabase'
  ],
  css: ["primeicons/primeicons.css"],
  googleFonts: {
    base64: true,
    fontsDir: "assets/fonts",
    overwriting: true,
    families: {
      "Inter": [300, 500, 800],
    },
  },
  primevue: {
    options: { unstyled: true },
    importPT: {
      as: 'lara',
      from: path.resolve(__dirname, './assets/presets/lara/')
    }
  },
  supabase: {
    redirect: false
  },
  imports: {
    dirs: [
      './composables/useMarkdown',
      './composables/useServices',
      './composables/useLogger'
    ]
  },
  runtimeConfig: {
    public: {
      nodeEnv: process.env.NODE_ENV,
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      siteUrl: process.env.SITE_URL,
    },
  },
});