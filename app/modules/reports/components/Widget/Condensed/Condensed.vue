<script setup lang="ts">
defineProps<{
  value: number | string
  label: string
}>()
</script>

<template>
  <div class="flex flex-1 flex-col bg-white p-5 rounded-xl">
    <span class="font-[Inter] text-4xl text-primary-500 font-bold"> {{ value }}</span>
    <span class="font-[Inter] text-xl text-gray-700">{{ label }}</span>
  </div>
</template>
