import { useSession } from "@/modules/auth/composables/useSession/useSession";
import type { User } from "@/modules/users/entities/User/User";

export function useMyself() {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const session = useSession()
  const loading:Ref<boolean> = ref(true)
  const user = ref<User>()

  const fetchUser = async () => {
    try {
      const response = await services.users.getMyself(session.user.value?.id!)

      if(!response) {
        return null
      }

      user.value = response
    } catch (error) {
      logAndTrack(error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => fetchUser())

  return {
    loading,
    user
  }
}