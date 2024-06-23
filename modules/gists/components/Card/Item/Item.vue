<script setup lang="ts">
const { render } = useMarkdown()

const emit = defineEmits<{
  (e: 'tap', id: string): void
}>()

const props = withDefaults(
  defineProps<{
    id: string
    title: string
    description: string
    price: number
    lang: string
  }>(),
  {
    id: '123',
    title: 'useCurrentUser.ts',
    description: 'Hook para controlar o **usuário** logado',
    price: 10,
    lang: 'Typescript',
  },
)

const isFree = computed(() => props.price === 0)
const description = computed(() => render(props.description))
const amount = computed(() => formatCurrency(props.price))

const handleClick = () => emit('tap', props.id)
</script>

<template>
  <div class="card">
    <Card>
      <template #title>
        <div class="flex flex-wrap gap-2">
          {{ title }}
          <Chip :label="lang" icon="pi pi-bolt" class="text-sm" />
        </div>
      </template>
      <template #content>
        <div v-html="description"></div>
      </template>
      <template #footer>
        <Button
          v-if="isFree"
          label="Baixar gratuitamente"
          class="w-full"
          icon="pi pi-shopping-bag"
          icon-pos="right"
          @click="handleClick"
        />
        <Button
          v-else
          :label="`Comprar por ${amount}`"
          class="w-full"
          icon="pi pi-shopping-bag"
          icon-pos="right"
          @click="handleClick"
        />
      </template>
    </Card>
  </div>
</template>
