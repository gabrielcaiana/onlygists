<script setup lang="ts">
import type { MyselfContextProvider } from '@/modules/users/composables/useMyself/types'
import { myselfKey } from '@/modules/users/composables/useMyself/useMyself'

const { user } = inject(myselfKey) as MyselfContextProvider
</script>

<template>
  <div>
    {{ user?.name }}
  </div>
</template>
