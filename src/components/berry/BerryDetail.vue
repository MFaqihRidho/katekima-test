<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { Berry } from '../../types/berry.type'
import Skeleton from '../common/Skeleton.vue'
// @ts-ignore
import Button from '../common/Button.vue'

const props = defineProps({
  berry: {
    type: Object as () => Berry | null,
    default: null,
  },
  berryList: {
    type: Array as () => Array<{ id: number; name: string }>,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['change-berry'])

const selectedBerryName = ref(props.berry?.name || '')

// Update the selected berry when the berry prop changes
watch(
  () => props.berry,
  (newBerry) => {
    if (newBerry) {
      selectedBerryName.value = newBerry.name
    }
  },
)

// Computed property to format berry options for the dropdown
const berryOptions = computed(() => {
  return props.berryList.map((berry) => ({
    value: berry.name,
    label: berry.name.charAt(0).toUpperCase() + berry.name.slice(1),
  }))
})
</script>

<template>
  <div class="bg-gray-100 rounded-lg shadow p-6">
    <div v-if="isLoading">
      <Skeleton type="detail" />
    </div>

    <div v-else-if="berry">
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('berryDetail.selectOther') }}
        </label>
        <div class="flex items-center space-x-2">
          <select
            v-model="selectedBerryName"
            class="mt-1 block w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
          >
            <option v-for="option in berryOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <Button @click="$emit('change-berry', selectedBerryName)">
            {{ $t('berryDetail.viewButton') }}
          </Button>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-gray-800 capitalize mb-4">
        {{ berry.name }} {{ $t('berryDetail.title') }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">{{ $t('berryDetail.basicInfo') }}</h3>
          <div class="space-y-2">
            <div class="grid grid-cols-2">
              <span class="text-gray-600">{{ $t('berryDetail.growth') }}:</span>
              <span>{{ berry.growth_time }} {{ $t('berryDetail.units.time') }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-600">{{ $t('berryDetail.maxHarvest') }}:</span>
              <span>{{ berry.max_harvest }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-600">{{ $t('berryDetail.size') }}:</span>
              <span>{{ berry.size }} mm</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-600">{{ $t('berryDetail.smoothness') }}:</span>
              <span>{{ berry.smoothness }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-600">{{ $t('berryDetail.soilDryness') }}:</span>
              <span>{{ berry.soil_dryness }}</span>
            </div>
            <div class="grid grid-cols-2">
              <span class="text-gray-600">{{ $t('berryDetail.firmness') }}:</span>
              <span class="capitalize">{{ berry.firmness.name }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">{{ $t('berryDetail.flavors') }}</h3>
          <div class="space-y-2">
            <div v-for="flavor in berry.flavors" :key="flavor.flavor.name" class="grid grid-cols-2">
              <span class="text-gray-600 capitalize">{{ flavor.flavor.name }}:</span>
              <span>{{ flavor.potency }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500 py-8">
      {{ $t('berryDetail.notFound') }}
    </div>
  </div>
</template>
