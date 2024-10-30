export function useStripeAccountCreate() {
  const { logAndTrace } = useLogger()
  const loading = ref<boolean>(false)

  const services = useServices()

  const create = async (email: string) => {
    try {
      loading.value = true

      const response = await services.payments.createPayoutAccount(email)
      return response.data
    } catch (error) {
      logAndTrace(error)
    } finally {
      loading.value = false
    }
  }

  return {
    create,
    loading,
  }
}
