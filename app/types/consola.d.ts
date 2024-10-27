import type consola from 'consola'

export type Consola = typeof consola

declare module '#app' {
  interface NuxtApp {
    $consola: Consola
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $consola: Consola
  }
}
