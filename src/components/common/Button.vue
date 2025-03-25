<script setup lang="ts">
import Loading from './Loading.vue'
import { defineProps } from 'vue'

// Mendefinisikan properti dengan TypeScript
const props = defineProps({
  variant: {
    type: String,
    default: 'main',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <!-- Komponen tombol yang dapat memiliki dua varian: main dan secondary -->
  <button
    :class="[
      'px-4 py-2 rounded-lg font-semibold transition duration-200',
      props.variant === 'main' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800',
      disabled ? 'opacity-50 !cursor-not-allowed' : '',
    ]"
    :disabled="disabled || isLoading"
  >
    <Loading v-if="isLoading" />
    <slot v-else />
  </button>
</template>
