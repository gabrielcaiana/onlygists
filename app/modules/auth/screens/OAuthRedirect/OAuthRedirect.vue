<script setup lang="ts">
const router = useRouter()
const navigateToPanel = async () => {
  await wait(2000)
  router.push('/app/panel')
}

onMounted(() => navigateToPanel())
</script>

<template>
  <MainContent>
    <template #content>
      <p class="font-[Inter] text-gray-800 text-base 🤩">🤩 Redirecionando...</p>
    </template>
  </MainContent>
</template>
