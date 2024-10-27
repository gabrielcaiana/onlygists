import { useServerStripe } from "#stripe/server";

export default defineEventHandler(async (event) => {
  const accountId = getRouterParam(event, 'accountId')

  if(!accountId ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'accountId is required'
    })
  }

  if(!event.context.auth.isAuthenticated) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const stripe = await useServerStripe(event)
  const account = await stripe.accounts.retrieve(accountId)

  return {
    isValid: account.details_submitted
  }
})

