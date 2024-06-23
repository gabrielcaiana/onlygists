import type { SupabaseClient } from '@supabase/supabase-js'
import { v4 as uuidV4 } from 'uuid'

import type { Database } from '@/libs/supabase/schema.js'

import type { CreateOptions } from './types'

export default (client: SupabaseClient<Database>) => ({
  async create({ title, description, price, content, lang, profileId }: CreateOptions) {
    const id = uuidV4()
    const isPaid = price !== 0

    await client.from('gists').insert({
      id,
      title,
      description,
      price,
      content,
      lang,
      profile_id: profileId,
      is_paid: isPaid,
    })

    return { id }
  },
})
