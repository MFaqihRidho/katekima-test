<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'table',
    validator: (value: string) => ['table', 'detail', 'form'].includes(value),
  },
  rows: {
    type: Number,
    default: 5,
  },
})
</script>

<template>
  <div class="animate-pulse">
    <div v-if="type === 'table'" class="space-y-2">
      <div v-for="i in rows" :key="i" class="h-10 bg-gray-200 rounded"></div>
    </div>

    <div v-else-if="type === 'detail'" class="space-y-4">
      <div class="h-8 bg-gray-200 rounded w-1/3"></div>
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 rounded w-4/6"></div>
      <div class="h-16 bg-gray-200 rounded w-full"></div>
    </div>

    <div v-else-if="type === 'form'" class="space-y-4">
      <div v-for="i in rows" :key="i">
        <div class="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
        <div class="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  </div>
</template>
