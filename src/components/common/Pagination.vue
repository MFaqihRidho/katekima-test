<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  pageSizes: {
    type: Array as () => number[],
    default: () => [10, 30, 50],
  },
})

const emit = defineEmits(['update:currentPage', 'update:itemsPerPage'])

const localItemsPerPage = ref(props.itemsPerPage)

watch(
  () => props.itemsPerPage,
  (newValue) => {
    localItemsPerPage.value = newValue
  },
)

const displayedPages = computed(() => {
  const totalPagesToShow = 5
  const pages: number[] = []

  if (props.totalPages <= totalPagesToShow) {
    // Show all pages if we have less than totalPagesToShow
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Calculate range of pages to show
    let startPage = Math.max(1, props.currentPage - Math.floor(totalPagesToShow / 2))
    let endPage = startPage + totalPagesToShow - 1

    if (endPage > props.totalPages) {
      endPage = props.totalPages
      startPage = Math.max(1, endPage - totalPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
  }

  return pages
})

const startItem = computed(() => {
  if (props.totalItems === 0) return 0
  return (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const changePage = (page: number) => {
  if (page < 1 || page > props.totalPages) return
  emit('update:currentPage', page)
}

const changeItemsPerPage = () => {
  emit('update:itemsPerPage', localItemsPerPage.value)
}
</script>

<template>
  <div class="flex items-center justify-between mt-4">
    <div class="flex items-center space-x-2">
      <span>{{ $t('pagination.rowsPerPage') }}:</span>
      <select
        v-model="localItemsPerPage"
        class="border rounded-lg bg-gray-800 text-white px-2 py-1"
        @change="changeItemsPerPage"
      >
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>

    <div class="flex items-center space-x-1">
      <button
        @click="changePage(1)"
        type="button"
        class="px-3 py-1 rounded-lg bg-gray-800 text-white border cursor-pointer"
        :disabled="currentPage === 1"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      >
        &laquo;
      </button>

      <button
        @click="changePage(currentPage - 1)"
        class="px-3 py-1 rounded-lg bg-gray-800 text-white border cursor-pointer"
        :disabled="currentPage === 1"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
      >
        &lsaquo;
      </button>

      <div class="flex space-x-1">
        <template v-for="page in displayedPages" :key="page">
          <button
            @click="changePage(page)"
            class="px-3 py-1 rounded-lg text-gray-800 border-gray-800 cursor-pointer border"
            :class="{ 'bg-gray-800 text-white': page === currentPage }"
          >
            {{ page }}
          </button>
        </template>
      </div>

      <button
        @click="changePage(currentPage + 1)"
        class="px-3 py-1 rounded-lg bg-gray-800 text-white border"
        :disabled="currentPage === totalPages"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      >
        &rsaquo;
      </button>

      <button
        @click="changePage(totalPages)"
        class="px-3 py-1 rounded-lg bg-gray-800 text-white border"
        :disabled="currentPage === totalPages"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
      >
        &raquo;
      </button>
    </div>

    <div>
      {{ $t('pagination.showing') }} {{ startItem }}-{{ endItem }} {{ $t('pagination.of') }}
      {{ totalItems }}
    </div>
  </div>
</template>
