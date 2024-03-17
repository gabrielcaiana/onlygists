<script setup lang="ts">
import PublicHeadline from '@/modules/gists/components/PublicHeadline/PublicHeadline.vue'
import GistCodeSpippet from '@/modules/gists/components/GistCodeSpippet/GistCodeSpippet.vue'
import LazyDialogPaymentSuccess from '@/modules/payments/components/DialogPaymentSuccess/DialogPaymentSuccess.vue';
import LazyDialogPaymentError from '@/modules/payments/components/DialogPaymentError/DialogPaymentError.vue';

const route = useRoute()
const isPaymentSuccessfully:Ref<boolean> = ref(false)
const isPaymentFail:Ref<boolean> = ref(false)

onMounted(() => {
  const { success_payment, fail_payment } = route.query

  if(success_payment) {
    isPaymentSuccessfully.value = true
  }

  if(fail_payment) {
    isPaymentFail.value = true
  }
})

</script>

<template>
  <div>
    <PublicHeadline />
    <GistCodeSpippet />
    <LazyDialogPaymentSuccess v-model:visible="isPaymentSuccessfully" />
    <LazyDialogPaymentError v-model:visible="isPaymentFail" />
  </div>
</template>
