<script setup lang="ts">
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

const { gist, loading } = useGist({ id: gistId.value })

const { loading: loadingUpdate, headline, code, safeParse, update, errors } = useGistUpdate({ gist })

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
</script>

<template>
  <WidgetDefault title="Editar gist" class="my-5">
    <HeadLineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>

  <WidgeDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgeDefault>

  <Button
    :loading="loadingUpdate"
    label="Atualizar"
    icon="pi pi-plus"
    icon-pos="right"
    class="mt-10"
    @click="handleUpdateGist"
  />
</template>
