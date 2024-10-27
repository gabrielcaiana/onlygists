<script setup lang="ts">
import { useSession } from '@/modules/auth/composables/useSession/useSession'
import GistCodeSpippet from '@/modules/gists/components/GistCodeSpippet/GistCodeSpippet.vue'
import PublicHeadlineEmpty from '@/modules/gists/components/PublicHeadline/Empty.vue'
import PublicHeadlineLoader from '@/modules/gists/components/PublicHeadline/Loader.vue'
import PublicHeadline from '@/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import { useGistContent } from '@/modules/gists/composables/useGistContent/useGistContent'
import LazyDialogPaymentError from '@/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'
import LazyDialogPaymentSuccess from '@/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider

const route = useRoute()
const router = useRouter()
const services = useServices()

const isPaymentSuccessfully: Ref<boolean> = ref(false)
const isPaymentFail: Ref<boolean> = ref(false)
const gistId = ref(route.params.id as string)

const hasOwner = computed(() => user.value?.username === route.params.username)

const handleNavigateToGistEdit = () => router.push(`/app/gist/${gistId.value}/edit`)

// to show loading in client change to useLazyAsyncData
const { data: gist, pending: loading } = useAsyncData('gist-detail', () => {
  return services.gists.readOne(gistId.value)
})

const { gistContent, loading: loadingContent } = useGistContent({
  gist,
})

onMounted(() => {
  const { success_payment, fail_payment } = route.query

  if (success_payment) {
    isPaymentSuccessfully.value = true
  }

  if (fail_payment) {
    isPaymentFail.value = true
  }
})

defineOgImage({
  component: 'GistDetail',
  props: {
    title: () => `${gist.value?.title} by @${gist.value?.profiles.username}`,
    description: () => `Veja o gist de ${gist.value?.profiles.username} no onlygists`,
  },
})

useSeoMeta({
  title: () => `${gist.value?.title} by @${gist.value?.profiles.username}`,
  ogTitle: () => `${gist.value?.title} by @${gist.value?.profiles.username}`,
  description: () => `Veja o gist de ${gist.value?.profiles.username} no onlygists`,
  ogDescription: () => `Veja o gist de ${gist.value?.profiles.username} no onlygists`,
})
</script>

<template>
  <div>
    <PublicHeadlineLoader :loading="loading">
      <PublicHeadline
        v-if="gist"
        :title="gist?.title"
        :lang="gist?.lang"
        :description="gist?.description"
        :author="gist?.profiles.username"
      />
      <PublicHeadlineEmpty v-else />
    </PublicHeadlineLoader>
    <GistCodeSpippet
      v-if="gist"
      :loading="loadingContent"
      :code="gistContent"
      :lang="gist.lang"
      :is-paid="gist.isPaid"
    />

    <div v-if="gist" class="flex flex-col md:flex-row gap-2">
      <Button
        v-if="!hasOwner"
        label="Comprar por 10"
        class="mt-5 w-full md:w-auto"
        icon="pi pi-shopping-bag"
        icon-pos="right"
      />
      <Button
        v-if="useSession().isLogged() && hasOwner"
        label="Editar gist"
        class="mt-5 w-full md:w-auto"
        icon="pi pi-pencil"
        icon-pos="right"
        @click="handleNavigateToGistEdit"
      />
    </div>

    <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
    <LazyDialogPaymentError v-model:visible="isPaymentFail" />
  </div>
</template>
