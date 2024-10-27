import { useServerStripe } from "#stripe/server";
import { serverSupabaseClient } from "#supabase/server";

interface RequestOptions {
  email: string
}

export default defineEventHandler(async (event) => {
  const payment = await readBody<RequestOptions>(event)

  console.log(payment)

  if(!payment.email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email is required'
    })
  }

  if(!event.context.auth.isAuthenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }
})