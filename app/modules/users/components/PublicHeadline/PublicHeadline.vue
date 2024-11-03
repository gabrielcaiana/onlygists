<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    avatarUrl: string
    bio?: string
    city?: string
    state?: string
  }>(),
  {
    name: 'Gabriel Caiana',
    avatarUrl: 'https://avatars.githubusercontent.com/u/26663338?v=4',
    bio: 'Software Engineer at @Petlove',
    city: 'Mogi das Cruzes',
    state: 'SP'
  }
)
</script>

<template>
  <div class="w-full flex flex-col justify-center items-center gap-2">
    <div class="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
      <img :src="avatarUrl" :alt="name" class="w-full" />
    </div>
    <h1
      class="font-[Inter] text-gray-700 text-center font-bold text-2xl md:text-3xl"
    >
      {{ name }}
    </h1>
    <p
      v-if="bio"
      class="font-[Inter] text-gray-700 text-center font-regular md:text-lg"
    >
      {{ bio }}
    </p>
    <p
      v-if="city && state"
      class="font-[Inter] text-gray-500 font-regular md:text-base"
    >
      <i class="pi pi-map-marker" />
      {{ city }}, {{ state }}
    </p>
  </div>
</template>
