<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '@/modules/users/components/HeadlineEdit/Loader.vue'
import BasicInfoForm from '@/modules/users/components/BasicInfoForm/BasicInfoForm.vue'
import AddressForm from '@/modules/users/components/AddressForm/AddressForm.vue'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself';
import { useUserProfileActions } from '@/modules/users/composables/useUserProfileActions/useUserProfileActions'
import { useAddressUpdate } from '@/modules/users/composables/userAddressUpdate/userAddressUpdate';
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types';

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

const { loading: addressLoading, searchZipCode, address } = useAddressUpdate({
  user
})

const handleShare = (username: string) => {
  share(username)
}

const handleNavigateToProfile = (username: string) => {
  router.push(`/${username}`)
}

const handleZipcodeSearch = () => searchZipCode()
</script>

<template>
  <div>
    <HeadlineEditLoader :loading="loading">
      <HeadlineEdit class="my-10" :username="nickname" :avatar-url="profilePick" @share="handleShare"
        @navigate-to-profile="handleNavigateToProfile" />
    </HeadlineEditLoader>

    <pre>
      {{ user }}
    </pre>

    <WidgetDefault title="Informações básicas">
      <BasicInfoForm v-model="user" />
    </WidgetDefault>

    <WidgetDefault title="Endereço" class="mt-5">
      <AddressForm 
        v-model="address" 
        :loading="addressLoading" 
        @trigger-address-search="handleZipcodeSearch" 
      />
    </WidgetDefault>
  </div>
</template>
