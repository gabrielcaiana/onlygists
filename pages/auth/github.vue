<script lang="ts" setup>
import OAuthRedirect from '@/modules/auth/screens/OAuthRedirect/OAuthRedirect.vue'

useHead({
  title: 'Redirecionamento | 🤩 onlygists',
})

definePageMeta({
  middleware: ['guest'],
})
</script>

<template>
  <OAuthRedirect />
</template>
