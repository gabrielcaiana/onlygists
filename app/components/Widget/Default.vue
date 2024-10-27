<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="rounded-lg p-5 bg-white overflow-x-inherit">
    <div v-if="title" class="flex justify-between items-center">
      <div class="flex flex-col gap-1">
        <h3 class="font-[Inter] text-lg font-bold text-left text-gray-700">{{ title }}</h3>
        <p v-if="subtitle" class="font-[Inter] text-sm text-left text-gray-500">{{ subtitle }}</p>
      </div>
      <slot name="header-actions" />
    </div>

    <div class="py-2">
      <slot />
    </div>
  </div>
</template>
