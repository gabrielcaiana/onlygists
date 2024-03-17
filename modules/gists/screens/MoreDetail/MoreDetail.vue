<script setup lang="ts">
import PublicHeadline from '@/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import GistCodeSpippet from '@/modules/gists/components/GistCodeSpippet/GistCodeSpippet.vue'
import DialogPaymentSuccess from '@/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue';

const route = useRoute()
const isPaymentSuccessfully:Ref<boolean> = ref(false)

onMounted(() => {
  const { success_payment } = route.query

  if(success_payment) {
    isPaymentSuccessfully.value = true
  }
})

</script>

<template>
  <div>
    <PublicHeadline />
    <GistCodeSpippet />
    <DialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
  </div>
</template>
