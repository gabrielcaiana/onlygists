import type { ZodFormattedError } from 'zod'
import { z } from 'zod'

import type { User } from '@/modules/users/entities/User/User'

const schema = z.object({
  username: z.string(),
  name: z.string().min(2, 'Nome é obrigatório'),
  site: z.string().url().optional(),
  bio: z.string().optional(),
  phone: z.string().optional(),
})

interface UseUserUpdateOptions {
  user: Ref<User | undefined>
}

export function useUserUpdate({ user: userRef }: UseUserUpdateOptions) {
  const { logAndTrace } = useLogger()
  const services = useServices()
  const toast = useToast()
  const loading = ref<boolean>(false)
  const user = ref<User>()
  const errors = ref<ZodFormattedError<User>>()

  const safeParse = () => {
    const result = schema.safeParse(user.value)

    if (!result.success) {
      errors.value = result.error.format()
    }

    return result
  }

  const update = async () => {
    if (!user.value) return

    loading.value = true
    try {
      await services.users.update(user.value.id, {
        ...user.value,
      })

      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Perfil atualizado com sucesso',
        life: 3000,
      })
    } catch (error) {
      logAndTrace(error)
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    if (!userRef.value) return

    user.value = userRef.value
  })

  return {
    user,
    loading,
    errors,
    safeParse,
    update,
  }
}