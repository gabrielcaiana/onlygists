<script setup lang="ts"">
defineProps<{
  loading: boolean
}>()
</script>

<template>
  <template v-if="loading">
    <Skeleton width="100%" height="15rem" />
    <Skeleton width="100%" height="15rem" />
    <Skeleton width="100%" height="15rem" />
    <Skeleton width="100%" height="15rem" />
    <Skeleton width="100%" height="15rem" />
  </template>

  <slot v-else />
</template>
