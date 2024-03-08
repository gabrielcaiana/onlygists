<script setup lang="ts">
defineProps<{
  loading: boolean
}>()

const emits = defineEmits<{
  (e: 'wants-login-with-github' ): void
}>()
</script>

<template>
  <div class="flex flex-col gap-2 justify-center items-center bg-gray-50 ronded p-6">
    <h2 class="font-[Inter] text-gray-700 font-regular">Entra com a sua conta</h2>
    <Button 
      label="Continuar com o Github"
      icon="pi pi-github" 
      icon-pos="right"
      :loading="loading"
      @click="() => emits('wants-login-with-github')"
     />
  </div>
</template>

