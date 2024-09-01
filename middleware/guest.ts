import { useSession } from '@/modules/auth/composables/useSession/useSession'

export default defineNuxtRouteMiddleware((to) => {
  const session = useSession()
  const isLogged = session.isLogged()

  if (isLogged) {
    if (to.path === 'app/panel') return

    return navigateTo({ path: '/app/panel' })
  }
})
