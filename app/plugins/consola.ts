import consola from 'consola'

export default defineNuxtPlugin((nuxtApp) => {
  consola.wrapConsole()

  nuxtApp.provide('consola', consola)
})