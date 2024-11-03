import { useClipboard, useShare } from '@vueuse/core'

export function useUserProfileActions() {
  const toast = useToast()
  const { share: nativeShare, isSupported } = useShare()
  const { copy } = useClipboard()

  const share = async (username: string) => {
    const url = `${window.location.origin}/${username}`
    if (!isSupported.value) {
      await copy(url)

      toast.add({
        severity: 'info',
        summary: 'Sucesso!',
        detail: 'Link de perfil copiado!'
      })

      return
    }

    nativeShare({
      title: 'Perfil do onygists',
      text: `Confira o perfil do @${username} no onygists!`,
      url
    })
  }

  return {
    share
  }
}
