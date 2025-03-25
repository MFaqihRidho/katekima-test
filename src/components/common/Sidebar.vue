<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const navRoutes = [
  {
    name: 'Berries',
    to: '/berries',
  },
  {
    name: 'Add New Berries',
    to: '/product/create',
  },
]
</script>

<template>
  <div class="w-full">
    <nav class="fixed z-[92] left-0 w-60 h-screen bg-gray-200 transition-all duration-150">
      <!-- logo and button -->

      <div class="relative w-56 px-5 py-4">
        <div class="relative w-full flex items-center justify-center">
          <!-- logo -->
          <button class="text-2xl font-medium" @click="router.push('/berries')">Berry App</button>
        </div>
      </div>

      <!-- menu -->
      <ul class="flex-col flex overflow-y-auto">
        <router-link
          v-for="route in navRoutes"
          class="hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-800 text-white"
          :to="route.to"
        >
          <li class="px-5 py-2.5 text-sm font-medium">{{ route.name }}</li>
        </router-link>
      </ul>
    </nav>
  </div>
</template>
