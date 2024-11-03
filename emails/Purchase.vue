<script setup lang="ts">
import {
  Tailwind,
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text
} from '@vue-email/components'
import { defineProps, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
  }>(),
  {
    name: 'Dev'
  }
)
</script>

<template>
  <Tailwind>
    <Html>
      <Head />
      <Body class="bg-white my-auto mx-auto font-sans">
        <Container
          class="border border-solid border-[#eaeaea] p-[20px] md:p-7 rounded my-[40px] mx-auto max-w-[465px]"
        >
          <Heading
            class="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0"
          >
            Compra aprovada!
          </Heading>

          <Text class="text-black text-[14px] leading-[24px]">
            Olá {{ props.name }}, parabéns pela compra!
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
</template>
