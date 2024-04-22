import { useSession } from "@/modules/auth/composables/useSession/useSession";
import type { User } from "@/modules/users/entities/User/User";
import type { MyselfContextProvider } from "./types";
import type { InjectionKey } from "vue";

export const myselfKey = Symbol("myself") as InjectionKey<MyselfContextProvider>

export function useMyself() {
  const { logAndTrack } = useLogger()
  const services = useServices()
  const session = useSession()
  const loading:Ref<boolean> = ref(true)
  const user = ref<User>()

  provide<MyselfContextProvider>(myselfKey, { user, loading })

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