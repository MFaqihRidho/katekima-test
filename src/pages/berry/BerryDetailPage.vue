<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BerryDetail from '../../components/berry/BerryDetail.vue'
import { useBerryStore } from '../../stores/berry.stores'

const route = useRoute()
const router = useRouter()
const berryStore = useBerryStore()

const berryId = route.params.id as string

onMounted(async () => {
  // First, make sure we have all berries loaded for the dropdown
  if (berryStore.berries.length === 0) {
    await berryStore.fetchBerries()
  }

  // Then fetch the specific berry details
  await berryStore.fetchBerryDetail(berryId)
})

const handleChangeBerry = async (berryName: string) => {
  router.push(`/berries/${berryName}`)
  await berryStore.fetchBerryDetail(berryName)
}
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <div class="mb-4">
      <router-link to="/berries" class="text-gray-800 hover:underline flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {{ $t('berryDetail.backToList') }}
      </router-link>
    </div>

    <BerryDetail
      :berry="berryStore.selectedBerry"
      :berryList="berryStore.berries"
      :isLoading="berryStore.isLoading"
      @change-berry="handleChangeBerry"
    />
  </div>
</template>
