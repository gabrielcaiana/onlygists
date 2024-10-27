<script setup lang="ts">
import CodeEdit from '@/modules/gists/components/CodeEdit/CodeEdit.vue'
import HeadLineEdit from '@/modules/gists/components/HeadLineEdit/HeadLineEdit.vue'
import { useGistCreate } from '@/modules/gists/composables/useGistCreate/useGistCreate'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider

const router = useRouter()

const { loading: loadingCreate, headline, code, safeParse, create, errors } = useGistCreate({ user })

const handleLanguageChange = (lang: string) => {
  code.value.lang = lang
}

const handleCreateGist = async () => {
  const isValid = safeParse().success

  if (!isValid) return

  const response = await create()

  if (response?.id) {
    router.push(`/${user.value?.username}/gist/${response.id}`)
  }
}
</script>

<template>
  <WidgetDefault title="Qual gist você quer criar" class="my-5">
    <HeadLineEdit v-model="headline" :errors="errors" @language-change="handleLanguageChange" />
  </WidgetDefault>

  <WidgeDefault title="Show me the code">
    <ClientOnly>
      <CodeEdit v-model="code" :errors="errors" />
    </ClientOnly>
  </WidgeDefault>

  <Button
    :loading="loadingCreate"
    label="Criar"
    icon="pi pi-plus"
    icon-pos="right"
    class="mt-10"
    @click="handleCreateGist"
  />
</template>
