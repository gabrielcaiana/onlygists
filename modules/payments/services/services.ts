// implement
import type { SupabaseClient } from '@supabase/supabase-js'
import type { AxiosInstance } from 'axios'

import type { Database } from '@/libs/supabase/schema'

import { readAllSalesAdapter, type ReadAllSalesRow } from './adapters'

export default (client: SupabaseClient<Database>, httpClient: AxiosInstance) => ({
  async readAllSales(userId: string) {
    const response = await client
      .from('sales')
      .select('id, customer_email, created_at, gists(title, profile_id, price)')
      .eq('gists.profile_id', userId)
      .returns<ReadAllSalesRow[]>()

    return readAllSalesAdapter(response.data)
  },
})
