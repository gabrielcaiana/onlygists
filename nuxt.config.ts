import path from "node:path"

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-primevue", "@nuxtjs/tailwindcss", "@nuxtjs/google-fonts"],
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
  imports: {
    dirs: ['./composables/useMarkdown']
  }
});
