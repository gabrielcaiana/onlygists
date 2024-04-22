<script setup lang="ts">
import HeadlineEdit from '@/modules/users/components/HeadlineEdit/HeadlineEdit.vue'
import HeadlineEditLoader from '@/modules/users/components/HeadlineEdit/Loader.vue'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself';
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types';

const { user, loading } = inject(myselfKey) as MyselfContextProvider

const profilePick = computed(() => user.value?.avatarUrl!)

const nickname = computed(() => {
  if(!user.value?.name) {
    return 'Usuário'
  }

  return user.value.name
})

const handleShare = () => {}
const handleNavigateToProfile = () => {}
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
  </div>
</template>
