<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="loading" class="w-full h-full flex items-center justify-center">
    <span class="animate-pulse text-6xl">🤩</span>
  </div>

  <slot v-else />
</template>
