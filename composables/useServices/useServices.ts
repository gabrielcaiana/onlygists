import AuthService from '@/modules/auth/services/services'
import UserService from '@/modules/users/services/services'
import type { Database } from '~/libs/supabase/schema'

export function useServices() {
  const config = useRuntimeConfig()
  const supabaseClient = useSupabaseClient<Database>()

  return {
    auth: AuthService(supabaseClient, {
      redirectTo: `${config.public.siteUrl}/auth/github`
    }),
    users: UserService(supabaseClient),
  }
}