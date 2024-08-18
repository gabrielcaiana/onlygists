<script setup lang="ts">
import { useGistDelete } from '@/modules/gists//composables/useGistDelete/useGistDelete'
import { useGistUpdate } from '@/modules/gists//composables/useGistUpdate/useGistUpdate'
import CodeEdit from '@/modules/gists/components/CodeEdit/CodeEdit.vue'
import HeadLineEdit from '@/modules/gists/components/HeadLineEdit/HeadLineEdit.vue'
import { useGist } from '@/modules/gists/composables/useGist/useGist'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider

const router = useRouter()
const route = useRoute()

const gistId = ref(route.params.id as string)

const { gist } = useGist({ id: gistId.value })

const { remove, loading: laodingRemove } = useGistDelete({ gist })

const { loading: loadingUpdate, headline, code, safeParse, update, errors } = useGistUpdate({ gist })

const confirm = useConfirm()

const handleLanguageChange = (lang: string) => {
  code.value.lang = lang
}

const handleUpdateGist = async () => {
  const isValid = safeParse().success

  if (!isValid) return

  const response = await update()

  if (response?.id) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}

const handleDeleteGist = () => {
  confirm.require({
    group: 'delete-gist',
    position: 'bottom',
    header: 'Deletar gist',
    message: 'Você tem certeza que deseja deletar esse gist?',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Quero deletar',
    accept: async () => {
      const response = await remove()

      if (response?.id) {
        router.push(`/${user.value?.username}`)
      }
    },
  })
}
</script>

<template>
  <ConfirmDialog group="delete-gist" />

  <WidgetDefault title="Editar gist" class="my-5">
    <HeadLineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>

  <WidgeDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgeDefault>

  <div class="flex gap-2">
    <Button
      :loading="loadingUpdate"
      label="Atualizar"
      icon="pi pi-plus"
      icon-pos="right"
      class="mt-10"
      @click="handleUpdateGist"
    />

    <Button :loading="laodingRemove" label="Deletar" class="mt-10" severity="danger" @click="handleDeleteGist" />
  </div>
</template>
