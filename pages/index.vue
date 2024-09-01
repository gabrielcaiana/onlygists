<script setup lang="ts">
import Home from '@/modules/landing-page/screens/Home/Home.vue'

definePageMeta({
  middleware: ['guest'],
})
</script>

<template>
  <Home />
</template>
