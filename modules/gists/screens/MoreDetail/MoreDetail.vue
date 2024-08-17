<script setup lang="ts">
import { useSession } from '@/modules/auth/composables/useSession/useSession'
import GistCodeSpippet from '@/modules/gists/components/GistCodeSpippet/GistCodeSpippet.vue'
import PublicHeadlineLoader from '@/modules/gists/components/PublicHeadline/Loader.vue'
import PublicHeadline from '@/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import LazyDialogPaymentError from '@/modules/payments/components/DialogPaymentError/DialogPaymentError.vue'
import LazyDialogPaymentSuccess from '@/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'

const { user, loading } = inject(myselfKey) as MyselfContextProvider

const route = useRoute()
const router = useRouter()
const isPaymentSuccessfully: Ref<boolean> = ref(false)
const isPaymentFail: Ref<boolean> = ref(false)

const hasOwner = computed(() => user.value?.username === route.params.username)

const handleNavigateToGistEdit = () => router.push(`/app/gist/${route.params.id}/edit`)

onMounted(() => {
  const { success_payment, fail_payment } = route.query

  if (success_payment) {
    isPaymentSuccessfully.value = true
  }

  if (fail_payment) {
    isPaymentFail.value = true
  }
})
</script>

<template>
  <div>
    <PublicHeadlineLoader :loading="loading">
      <PublicHeadline />
    </PublicHeadlineLoader>
    <GistCodeSpippet />

    <div class="flex flex-col md:flex-row gap-2">
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
