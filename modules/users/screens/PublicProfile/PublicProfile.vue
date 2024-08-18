<script setup lang="ts">
import GistCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'
import WidgeCondensed from '@/modules/reports/components/Widget/Condensed/Condensed.vue'
import WidgetGroup from '@/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widget/Group/Loader.vue'
import PublicHeadlineEmpty from '@/modules/users/components/PublicHeadline/Empty.vue'
import PublicHeadline from '@/modules/users/components/PublicHeadline/PublicHeadline.vue'

const route = useRoute()
const router = useRouter()
const services = useServices()

const { data: user } = await useAsyncData('user-public-profile', () => {
  const username = route.params.username as string
  return services.users.readOneByUsername(username)
})

const handleNavigateToDetail = (id: string) => {
  const { username } = route.params
  router.push(`/${username}/gist/${id}`)
}

useSeoMeta({
  title: `${user.value?.name} - @${user.value?.username}`,
  ogTitle: `${user.value?.name} - @${user.value?.username}`,
  description: `Veja os gists de ${user.value?.name} no onlygists`,
  ogDescription: `Veja os gists de ${user.value?.name} no onlygists`,
})
</script>

<template>
  <PublicHeadline
    v-if="user"
    :avatar-url="user.avatarUrl"
    :name="user.name"
    :bio="user.bio"
    :city="user.address?.city"
    :state="user.address?.state"
    class="my-10"
  />

  <PublicHeadlineEmpty v-else />

  <WidgetGroup>
    <WidgetGroupLoader :loading="false" :amount="3">
      <WidgeCondensed :value="10" label="Gists do total" />
      <WidgeCondensed :value="5" label="Gists gratuitos" />
      <WidgeCondensed :value="5" label="Gists pagos" />
    </WidgetGroupLoader>
  </WidgetGroup>

  <WidgetDefault title="Todos os gists">
    <GistCardGroup>
      <GistCardGroupLoader :loading="false">
        <GistCardItem
          v-for="i in 5"
          id="123"
          :key="i"
          title="useCurrentUser.ts"
          description="Hook para controlar a **store** do usuário"
          :price="10"
          lang="Typescript"
          @tap="handleNavigateToDetail"
        />
      </GistCardGroupLoader>
    </GistCardGroup>
  </WidgetDefault>
</template>
