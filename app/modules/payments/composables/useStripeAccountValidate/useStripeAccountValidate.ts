export function useStripeAccountValidate() {
  const { logAndTrace } = useLogger()
  const loading = ref<boolean>(false)
  const isValid = ref<boolean>(true)

  const services = useServices()

  const validate = async (accountId?: string) => {
    try {
      if (!accountId || accountId === '') {
        isValid.value = false
        return
      }

      loading.value = true

      const response = await services.payments.isAccountValid(accountId)
      isValid.value = response.data.isValid
    } catch (error) {
      logAndTrace(error)
    } finally {
      loading.value = false
    }
  }

  return {
    isValid,
    loading,
    validate
  }
}
