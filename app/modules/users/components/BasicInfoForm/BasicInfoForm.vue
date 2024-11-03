<script setup lang="ts">
import type { ZodFormattedError } from 'zod'

import type { User } from '@/modules/users/entities/User/User'

defineProps<{
  errors?: ZodFormattedError<User>
}>()

const user = defineModel<User>({
  required: false,
  default: {
    name: '',
    site: '',
    bio: '',
    phone: ''
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="name">Nome</label>
        <InputText id="name" v-model="user.name" placeholder="Gabriel Caiana" />
        <small v-if="errors?.name" class="text-red-500 font-medium">{{
          errors.name?._errors[0]
        }}</small>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="site">Site</label>
        <InputText id="site" v-model="user.site" placeholder="site.com.br" />
        <small v-if="errors?.site" class="text-red-500 font-medium">{{
          errors.site?._errors[0]
        }}</small>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="bio">Bio</label>
        <InputText
          id="bio"
          v-model="user.bio"
          placeholder="Software Engineer"
        />
        <small v-if="errors?.bio" class="text-red-500 font-medium">{{
          errors.bio?._errors[0]
        }}</small>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="phone">Telefone</label>
        <InputText
          id="phone"
          v-model="user.phone"
          v-maska
          placeholder="(99) 9 9999-9999"
          data-maska="(##) # ####-####"
        />
        <small v-if="errors?.phone" class="text-red-500 font-medium">{{
          errors.phone?._errors[0]
        }}</small>
      </div>
    </div>
  </div>
</template>
