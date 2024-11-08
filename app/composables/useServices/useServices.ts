import axios from 'axios'

import AuthService from '@/modules/auth/services/services'
import GistService from '@/modules/gists/services/services'
import PaymentService from '@/modules/payments/services/services'
import ReportService from '@/modules/reports/services/services'
import UserService from '@/modules/users/services/services'
import type { Database } from '~/libs/supabase/schema'

export function useServices() {
  const config = useRuntimeConfig()
  const supabaseClient = useSupabaseClient<Database>()
  const httpClient = axios.create({
    baseURL: '/api'
  })

  const redirectGithub = `${config.public.siteUrl}/auth/github`

  return {
    auth: AuthService(supabaseClient, { redirectTo: redirectGithub }),
    users: UserService(supabaseClient, httpClient),
    gists: GistService(supabaseClient),
    reports: ReportService(supabaseClient),
    payments: PaymentService(supabaseClient, httpClient)
  }
}
