export function useLogger() {
  const config = useRuntimeConfig()
  const isProd = config.public.nodeEnv === 'production'
  const { $consola } = useNuxtApp()

  const logAndTrace = (...args: any[]) => {
    if (isProd) {
      // TODO: send to sentry
      return
    }

    $consola.log({ args })
  }

  return {
    logAndTrace
  }
}
