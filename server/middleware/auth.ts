import { serverSupabaseUser } from '#supabase/server'

interface AuthContext {
  isAuthenticated: boolean
  user: { id: string } | null
}

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event)
  const user = await serverSupabaseUser(event)

  const isWebhookCall = url.pathname.startsWith('/webhooks')

  if(isWebhookCall) {
    return
  }

  const isApiCall = url.pathname.startsWith('/api')

  if(!isApiCall) {
    return
  }

  const authContext: AuthContext = {
    user,
    isAuthenticated: Boolean(user)
  }

  event.context.auth = authContext
})