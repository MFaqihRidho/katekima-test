<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import Pagination from '../common/Pagination.vue'
import SkeletonLoader from '../common/Skeleton.vue'
import { useBerryStore } from '../../stores/berry.stores.ts'
import DeleteDialog from '../common/DeleteDialog.vue'
import { useProductStore } from '@/stores/product.store.ts'
import { useToast } from 'vue-toast-notification'
// @ts-ignore
import Button from '../common/Button.vue'

const emit = defineEmits(['search', 'page-change', 'items-per-page-change', 'delete'])

// toast
const toast = useToast()

// berry store
const berryStore = useBerryStore()

// Computed properties to pass store getters directly
const filteredBerries = computed(() => berryStore.filteredBerries)
const paginatedBerries = computed(() => berryStore.paginatedBerries)
const totalPages = computed(() => berryStore.totalPages)

const berries = computed(() => berryStore.berries)

const deleteModal = ref()

onMounted(async () => {
  await berryStore.fetchBerries()
})

// Product store
const productStore = useProductStore()

const handleDelete = async () => {
  try {
    if (!berryStore.selectedBerry) return
    await productStore.removeProduct(berryStore.selectedBerry.id)
    toast.success('Berry deleted successfully')
    deleteModal.value.closeModal()
    berryStore.fetchBerries()
  } catch (error) {
    toast.error('Failed to delete berry')
    console.error(error)
  }
}

const handleCancel = () => {
  deleteModal.value.closeModal()
}
</script>

<template>
  <div class="w-full">
    <div class="mb-4 flex justify-between items-center">
      <div class="relative w-64">
        <input
          type="text"
          @input="(e) => berryStore.setSearchQuery((e.target as HTMLInputElement).value)"
          :value="berryStore.searchQuery"
          class="w-full px-4 py-2 border rounded-lg"
          :placeholder="$t('berryList.searchPlaceholder')"
        />
      </div>

      <router-link to="/product/create">
        <Button>
          <i class="pi pi-plus"></i>
          {{ $t('berryList.addNew') }}
        </Button>
      </router-link>
    </div>

    <div class="overflow-x-auto max-h-[70vh] bg-white rounded-lg shadow">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr class="sticky bg-gray-50 top-0">
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ $t('berryList.columns.no') }}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ $t('berryList.columns.name') }}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ $t('berryList.columns.actions') }}
            </th>
          </tr>
        </thead>
        <tbody v-if="!berryStore.isLoading" class="bg-white divide-y divide-gray-200">
          <tr v-for="(berry, index) in paginatedBerries" :key="berry.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ (berryStore.currentPage - 1) * berryStore.itemsPerPage + index + 1 }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ berry.name }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
              <div class="flex space-x-2">
                <router-link
                  :to="`/berries/${berry.name}`"
                  class="text-white border-2 bg-gray-800 flex items-center justify-center p-2 rounded-xl"
                >
                  <i class="pi pi-info-circle text-2xl"></i>
                </router-link>
                <router-link
                  :to="`/product/edit/${index + 1}`"
                  class="text-white border-2 bg-gray-800 flex items-center justify-center p-2 rounded-xl"
                >
                  <i class="pi pi-pencil text-2xl"></i>
                </router-link>
                <button
                  @click="
                    () => {
                      productStore.setSelectedDeleteProduct(index + 1)
                      deleteModal.openModal()
                    }
                  "
                  class="text-white cursor-pointer border-2 bg-gray-800 flex items-center justify-center p-2 rounded-xl"
                >
                  <i class="pi pi-trash text-2xl"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="berryStore.isLoading" class="p-4">
        <SkeletonLoader type="table" :rows="berryStore.itemsPerPage" />
      </div>

      <div
        v-if="!berryStore.isLoading && paginatedBerries.length === 0"
        class="p-6 text-center text-gray-500"
      >
        {{ $t('berryList.noResults') }}
      </div>
    </div>

    <Pagination
      @update:currentPage="berryStore.setPage"
      @update:itemsPerPage="berryStore.setItemsPerPage"
      :currentPage="berryStore.currentPage"
      :itemsPerPage="berryStore.itemsPerPage"
      :totalPages="totalPages"
      :totalItems="filteredBerries.length"
      :pageSizes="[10, 30, 50]"
    />

    <DeleteDialog
      ref="deleteModal"
      title="Delete Berry"
      message="Are you sure you want to delete this berry? This action cannot be undone."
      cancel-text="Cancel"
      confirm-text="Delete Berry"
      @confirm="handleDelete"
      @cancel="handleCancel"
      :isLoading="productStore.isLoading"
    />
  </div>
</template>
