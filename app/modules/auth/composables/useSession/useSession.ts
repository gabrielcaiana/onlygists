export function useSession() {
  const user = useSupabaseUser()
  const services = useServices()

  const isLogged = () => !!user.value

  const logout = async () => {
    const response = await services.auth.signOut()
    return response
  }

  return {
    user,
    isLogged,
    logout,
  }
}
