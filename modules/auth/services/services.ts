import type { SupabaseClient } from '@supabase/supabase-js'

import type { Database } from '~/libs/supabase/schema'

interface ServiceOptions {
  redirectTo: string
}

export default (client: SupabaseClient<Database>, options: ServiceOptions) => ({
  async signInWithGithub() {
    const response = await client.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: options.redirectTo },
    })
    return response
  },

  async signOut() {
    const response = await client.auth.signOut()
    return response
  },
})
