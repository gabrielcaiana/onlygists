// @ts-ignore
import type { SupabaseClient } from '@supabase/supabase-js'
import type { AxiosInstance } from 'axios'

import type { Database } from '@/libs/supabase/schema'

import { readAllSalesAdapter, type ReadAllSalesRow } from './adapters'
import type {
  CreateCheckoutOptions,
  CreateCheckoutResponse,
  CreatePayoutCheckoutResponse,
  IsAccountValidResponse,
} from './types'

export default (client: SupabaseClient<Database>, httpClient: AxiosInstance) => ({
  async readAllSales(userId: string) {
    const response = await client
      .from('sales')
      .select('id, customer_email, created_at, gists(title, profile_id, price)')
      .eq('gists.profile_id', userId)
      .returns<ReadAllSalesRow[]>()

    return readAllSalesAdapter(response.data)
  },

  async createCheckout({ username, gistId, price }: CreateCheckoutOptions) {
    const response = await httpClient.post<CreateCheckoutResponse>(`/payments/checkout`, {
      username,
      gistId,
      price,
    })
    return response
  },

  async createPayoutAccount(email: string) {
    const response = await httpClient.post<CreatePayoutCheckoutResponse>(`/payments/accounts`, { email })
    return response
  },

  async isAccountValid(accountId: string) {
    const response = await httpClient.get<IsAccountValidResponse>(`/payments/accounts/${accountId}/valid`)
    return response
  },
})
