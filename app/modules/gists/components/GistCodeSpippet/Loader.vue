<script setup lang="ts">
defineProps<{
  loading: boolean
}>()
</script>
<template>
  <div v-if="loading" class="w-full flex flex-col gap-2 py-8">
    <Skeleton width="100%" height="20rem" />
  </div>

  <slot v-else />
</template>
