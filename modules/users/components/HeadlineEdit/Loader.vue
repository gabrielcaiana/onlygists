<script lang="ts" setup>
defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="loading" class="flex flex-col gap-2 items-center px-8" >
    <Skeleton shape="circle" size="10rem" />
    <Skeleton width="18rem" height="2rem" />

    <div class="flex gap-2">
      <Skeleton width="8rem" height="2rem" />
      <Skeleton width="8rem" height="2rem" />
    </div>
  </div> 
  <slot v-else />
</template>
