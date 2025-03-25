<script setup lang="ts">
import Sidebar from '../components/common/Sidebar.vue'
import Navbar from '../components/common/Navbar.vue'
</script>

<template>
  <div>
    <Navbar />
    <Sidebar />
    <div class="min-h-screen flex justify-center pl-60 transition-all duration-150 pt-14">
      <div class="max-w-4xl w-full">
        <slot />
      </div>
    </div>
  </div>
</template>
