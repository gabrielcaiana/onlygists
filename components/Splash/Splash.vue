<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="w-full h-full flex items-center justify-center" v-if="loading">
      <span class="animate-pulse text-6xl">🤩</span>
  </div>

  <slot v-else />
</template>


