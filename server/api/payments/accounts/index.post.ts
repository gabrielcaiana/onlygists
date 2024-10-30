import { useServerStripe } from '#stripe/server'
import { serverSupabaseClient } from '#supabase/server'
import { Database } from '@/libs/supabase/schema'

interface RequestOptions {
  email: string
}

export default defineEventHandler(async (event) => {
  const payment = await readBody<RequestOptions>(event)

  if (!payment.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required',
    })
  }

  if (!event.context.auth.isAuthenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const config = useRuntimeConfig()
  const stripe = await useServerStripe(event)
  const supabase = await serverSupabaseClient<Database>(event)

  const account = await stripe.accounts.create({
    type: 'express',
    email: payment.email,
    country: 'BR',
    business_type: 'individual',
  })

  await supabase
    .from('profiles')
    .update({
      payment_connected_account: account.id,
    })
    .eq('email', payment.email)

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${config.public.siteUrl}/app/panel`,
    return_url: `${config.public.siteUrl}/app/panel`,
    type: 'account_onboarding',
  })

  return {
    accountId: account.id,
    onboardingUrl: accountLink.url,
  }
})
