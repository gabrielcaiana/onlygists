import type { SupabaseClient } from '@supabase/supabase-js'

import type { Database } from '@/libs/supabase/schema'

export default (client: SupabaseClient<Database>) => ({
  async totalGistsPublished(userId: string) {
    const response = await client.from('gists').select('*', { count: 'exact' }).match({ profile_id: userId })
    return response.count
  },

  async totalFreeGistsPublished(userId: string) {
    const response = await client
      .from('gists')
      .select('*', { count: 'exact' })
      .match({ profile_id: userId, is_paid: false })
    return response.count
  },

  async totalPaidGistsPublished(userId: string) {
    const response = await client
      .from('gists')
      .select('*', { count: 'exact' })
      .match({ profile_id: userId, is_paid: true })
    return response.count
  },

  async totalSoldGistsPublished(userId: string) {
    const response = await client
      .from('sales')
      .select('*, gists(profile_id)', { count: 'exact', head: true })
      .match({ 'gists.profile_id': userId })
    return response.count
  },
})
