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
    phone: '',
  },
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="name">Nome</label>
        <InputText id="name" placeholder="Gabriel Caiana" v-model="user.name" />
        <small class="text-red-500 font-medium" v-if="errors?.name">{{ errors.name?._errors[0] }}</small>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="site">Site</label>
        <InputText id="site" placeholder="site.com.br" v-model="user.site" />
        <small class="text-red-500 font-medium" v-if="errors?.site">{{ errors.site?._errors[0] }}</small>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="bio">Bio</label>
        <InputText id="bio" placeholder="Software Engineer" v-model="user.bio" />
        <small class="text-red-500 font-medium" v-if="errors?.bio">{{ errors.bio?._errors[0] }}</small>
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="phone">Telefone</label>
        <InputText id="phone" placeholder="(99) 9 9999-9999" v-model="user.phone" v-maska data-maska="(##) # ####-####" />
        <small class="text-red-500 font-medium" v-if="errors?.phone">{{ errors.phone?._errors[0] }}</small>
      </div>
    </div>
  </div>
</template>
