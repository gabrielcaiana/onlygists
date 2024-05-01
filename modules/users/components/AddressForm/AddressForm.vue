<script setup lang="ts">
import type { Address } from '@/modules/users/entities/Address/Address'

defineProps<{
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'trigger-address-search'): void
}>()

const address = defineModel<Address>({
  required: true,
  default: {
    zipCode: '',
    number: '',
    street: '',
    city: '',
    state: '',
    complement: '',
    neighborhood: '',
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">

    <div class="flex flex-col lg:flex-row gap-2">
      <div class="flex flex-col lg:flex-row gap-2 flex-1">
        <div class="flex flex-col gap-2 flex-1">
          <label for="cep">
            CEP
            <i v-if="loading" class="pi pi-spinner text-green-500 animate-spin" />
          </label>
          <InputText 
            v-model="address.zipCode" 
            placeholder="00000-000" 
            id="cep" 
            v-maska
            data-maska="#####-###"
            @blur="() => emit('trigger-address-search')" 
          />
        </div>

        <div class="flex flex-col gap-2 flex-1">
          <label for="number">Número</label>
          <InputText v-model="address.number" placeholder="000" id="number" />
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="city">Cidade</label>
        <InputText v-model="address.city" placeholder="São Paulo" id="city" />
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="state">Estado</label>
        <InputText v-model="address.state" placeholder="SP" id="state" />
      </div>
    </div>

    <div class="flex flex-col md:flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <label for="neighborhood">Bairro</label>
        <InputText v-model="address.neighborhood" placeholder="Jardim Paulista" id="neighborhood" />
      </div>
      <div class="flex flex-col gap-2 flex-1">
        <label for="complement">Complemento</label>
        <InputText v-model="address.complement" placeholder="Apto, Bloco etc..." id="complement" />
      </div>
    </div>

  </div>
</template>
