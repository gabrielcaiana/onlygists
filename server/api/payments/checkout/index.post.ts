import { useServerStripe } from "#stripe/server";
import { serverSupabaseClient } from "#supabase/server";
import { Database } from "@/libs/supabase/schema";
import { zh } from 'h3-zod'
import { z } from 'zod' 

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const body = await zh.useSafeValidatedBody(
    event,
    z.object({
      username: z.string(),
      gistId: z.string(),
      // ?TODO: não enviar o price no body, mas sim buscar no banco de dados por meio do gistId
      // ! isso é necessário por questões de segurança
      price: z.string()
    })
  )

  if(!body.success) {
    throw createError({
      status: 400,
      statusMessage: body.error.message
    })
  }

  const { price, username, gistId } = body.data

  const prices: Record<string, string> = {
    '5': config.stripeProductId5BRL,
    '10': config.stripeProductId10BRL,
    '25': config.stripeProductId25BRL,
  }
  
  if(!prices[price]) {
    throw createError({
      status: 400,
      statusMessage: `try pay ${username} but gist price is not valid: ${price}`
    })
  }

  const stripe = await useServerStripe(event)
  const supabase = await serverSupabaseClient<Database>(event)

  const response = await supabase
  .from('profiles')
  .select('payment_connected_account')
  .eq('username', username)
  .maybeSingle()

  if(!response.data) {
    throw createError({
      status: 404,
      statusMessage: `${username} not found`
    })
  }

  if(!response.data.payment_connected_account) {
    throw createError({
      status: 422,
      statusMessage: `stripe account of ${username} not configured`
    })
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [
      {
        price: prices[price],
        quantity: 1
      }
    ],
    payment_intent_data: {
      transfer_data: {
        amount: Math.round(Number(price) * 100),
        destination: response.data.payment_connected_account
      }
    },
    client_reference_id: gistId,
    success_url: `${config.public.siteUrl}/${username}/gist/${gistId}?success_payment=true`,
    cancel_url: `${config.public.siteUrl}/${username}/gist/${gistId}?fail_payment=true`
  })

  return {
    id: session.id,
    checkoutUrl: session.url
  }
})