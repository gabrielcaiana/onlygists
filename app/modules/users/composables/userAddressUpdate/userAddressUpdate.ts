import type { Address } from '@/modules/users/entities/Address/Address'
import type { User } from '@/modules/users/entities/User/User'

interface UseAddressUpdateOptions {
  user: Ref<User | undefined>
}

const INITIAL_ADDRESS_INFO = {
  zipCode: '',
  number: '',
  street: '',
  city: '',
  state: '',
  neighborhood: '',
  complement: ''
}

export function useAddressUpdate({ user }: UseAddressUpdateOptions) {
  const { logAndTrace } = useLogger()
  const services = useServices()
  const loading = ref<boolean>(false)

  const address = ref<Address>(INITIAL_ADDRESS_INFO)

  const searchZipCode = async () => {
    if (!address.value.zipCode || address.value.zipCode === '') {
      return
    }

    loading.value = true

    try {
      const response = await services.users.searchAddressByZipCode(
        address.value.zipCode
      )
      address.value = response.data
    } catch (e) {
      logAndTrace(e)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!user.value) {
      return
    }

    address.value = user.value.address ?? INITIAL_ADDRESS_INFO
  })

  return {
    loading,
    address,
    searchZipCode
  }
}
