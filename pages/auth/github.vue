<script lang="ts" setup>
import OAuthRedirect from '@/modules/auth/screens/OAuthRedirect/OAuthRedirect.vue'

definePageMeta({
  middleware: ['guest'],
})
</script>

<template>
  <OAuthRedirect />
</template>
