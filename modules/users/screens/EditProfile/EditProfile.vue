<script setup lang="ts">
import AddressForm from '@/modules/users/components/AddressForm/AddressForm.vue'
import BasicInfoForm from '@/modules/users/components/BasicInfoForm/BasicInfoForm.vue'
import HeadlineEdit from '@/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '@/modules/users/components/HeadlineEdit/Loader.vue'
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'
import { useAddressUpdate } from '@/modules/users/composables/userAddressUpdate/userAddressUpdate'
import { useUserProfileActions } from '@/modules/users/composables/useUserProfileActions/useUserProfileActions'
import { useUserUpdate } from '@/modules/users/composables/useUserUpdate/useUserUpdate'

const { user, loading } = inject(myselfKey) as MyselfContextProvider

const { share } = useUserProfileActions()

const router = useRouter()

const profilePick = computed(() => user.value?.avatarUrl!)

const nickname = computed(() => {
  if (!user.value?.name) {
    return 'Usuário'
  }

  return user.value.name
})

const {
  loading: addressLoading,
  searchZipCode,
  address,
} = useAddressUpdate({
  user,
})

const {
  loading: updateLoading,
  safeParse,
  update,
  errors,
} = useUserUpdate({
  user,
})

const handleShare = (username: string) => {
  share(username)
}

const handleNavigateToProfile = (username: string) => {
  router.push(`/${username}`)
}

const handleZipcodeSearch = () => searchZipCode()

const handleUpdateProfile = () => {
  const isValid = safeParse().success

  if (!isValid || !user.value) return

  user.value.address = address.value
  update()
}
</script>

<template>
  <div>
    <HeadlineEditLoader :loading="loading">
      <HeadlineEdit
        class="my-10"
        :username="nickname"
        :avatar-url="profilePick"
        @share="handleShare"
        @navigate-to-profile="handleNavigateToProfile"
      />
    </HeadlineEditLoader>

    <WidgetDefault title="Informações básicas">
      <BasicInfoForm v-model="user" :errors="errors" />
    </WidgetDefault>

    <WidgetDefault title="Endereço" class="mt-5">
      <AddressForm v-model="address" :loading="addressLoading" @trigger-address-search="handleZipcodeSearch" />
    </WidgetDefault>

    <Button
      :loading="updateLoading"
      class="mt-5 w-full md:w-auto"
      label="Atualizar"
      icon="pi pi-pencil"
      icon-pos="right"
      @click="handleUpdateProfile"
    />
  </div>
</template>
