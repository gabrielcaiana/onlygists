<script setup lang="ts">
import SocialForm from '@/modules/auth/components/SocialForm/SocialForm.vue';

const loading:Ref<boolean> = ref(false);

const handleGithubLogin = () => {
  loading.value = true;
  // TODO: Implement the login with Github
}
</script>

<template>
  <section class="w-screen h-screen flex flex-col items-center justify-center gap-5 bg-gray-50">
    <Logo />
    <SocialForm :loading="loading" @wants-login-with-github="handleGithubLogin" />
  </section>
</template>
