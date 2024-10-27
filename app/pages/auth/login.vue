<script setup lang="ts">
import Login from '@/modules/auth/screens/Login/Login.vue'

useHead({
  title: 'Entrar | 🤩 onlygists',
})

definePageMeta({
  middleware: ['guest'],
})
</script>
<template>
  <div>
    <Login />
  </div>
</template>
