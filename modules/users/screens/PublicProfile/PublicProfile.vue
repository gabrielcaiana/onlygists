<script setup lang="ts">
import PublicHeadline from '@/modules/users/components/PublicHeadline/PublicHeadline.vue'
import WidgetGroup from '@/modules/reports/components/Widget/Group/Group.vue'
import WidgetGroupLoader from '@/modules/reports/components/Widget/Group/Loader.vue'
import WidgeCondensed from '@/modules/reports/components/Widget/Condensed/Condensed.vue'
import GistCardGroup from '@/modules/gists/components/Card/Group/Group.vue'
import GistCardGroupLoader from '@/modules/gists/components/Card/Group/Loader.vue'
import GistCardItem from '@/modules/gists/components/Card/Item/Item.vue'

const route = useRoute()
const router = useRouter()

const handleNavigateToDetail = (id: string) => {
  const { username } = route.params
  router.push(`/${username}/gists/${id}`)
}
</script>

<template>
  <PublicHeadline />

  <WidgetGroup>
    <WidgetGroupLoader :loading="true" :amount="3">
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
          key="i"
          id="123"
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