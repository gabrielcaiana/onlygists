import type { SaleVirtual } from '@/modules/payments/entities/Sale/Sale'

interface UseSalesListOptions {
  userId: string
}

export function useSalesList({ userId }: UseSalesListOptions) {
  const { logAndTrace } = useLogger()
  const services = useServices()
  const loading = ref<boolean>(true)
  const sales = ref<SaleVirtual[]>([])

  const fetchSales = async () => {
    loading.value = true

    try {
      const response = await services.payments.readAllSales(userId)
      sales.value = response
    } catch (e) {
      logAndTrace(e)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchSales()
  })

  return {
    sales,
    loading
  }
}
