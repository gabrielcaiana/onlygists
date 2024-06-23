<script setup lang="ts">
import '@wooorm/starry-night/style/light'

import { common, createStarryNight } from '@wooorm/starry-night'
import { toHtml } from 'hast-util-to-html'

import Loader from './Loader.vue'

const DEFAULT_CODE_SNIPPET = `
  const message = 'Você precisa pagar para ter acesso a este gist :P'
  console.log(message)
`

const props = withDefaults(
  defineProps<{
    isPaid: boolean
    loading: boolean
    code: string
    lang: string
  }>(),
  {
    isPaid: false,
    loading: false,
    code: DEFAULT_CODE_SNIPPET,
    lang: 'typescript',
  },
)

const isLoading: Ref<boolean> = ref(true)
const htmlCode: Ref<string> = ref('')

const registerSintaxeHighlight = async () => {
  isLoading.value = true

  const starryNight = await createStarryNight(common)
  const scope = starryNight.flagToScope(props.lang)
  const tree = starryNight.highlight(props.code, scope!)

  htmlCode.value = toHtml(tree)

  isLoading.value = false
}

onMounted(() => {
  registerSintaxeHighlight()
})
</script>
<template>
  <Loader :loading="isLoading || loading">
    <div v-if="isPaid" class="w-full relative">
      <span class="absolute top-[43%] left-[5o%] z-[999]">
        <i class="pi pi-lock text-3xl text-gray-700" />
      </span>

      <pre
        :class="{ 'blur-sm': isPaid }"
        class="h-full select-none rounded bg-gray-200 p-5 overflow-x-hidden"
        v-html="htmlCode"
      />
    </div>

    <pre v-if="!isPaid" class="w-full rounded bg-gray-200 p-5 overflow-x-scroll" v-html="htmlCode" />
  </Loader>
</template>
