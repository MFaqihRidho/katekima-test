<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocaleStore } from '@/stores/locale.stores'
import { useI18n } from 'vue-i18n'

const localeStore = useLocaleStore()
const { locale } = useI18n()

const changeLanguage = (lang: string) => {
  localeStore.setLocale(lang)
  locale.value = lang
}

onMounted(() => {
  locale.value = localeStore.locale
})
</script>

<template>
  <div class="fixed z-[91] md:pl-56 bg-gray-100 flex h-14 w-full items-center shadow-sd-600">
    <div class="flex h-full w-full items-center justify-between px-10 py-2">
      <!-- title & icon -->
      <div class="flex h-full items-center gap-2 overflow-hidden text-gray-800">
        <i class="pi pi-bars mt-1"></i>
        <p class="font-medium text-lg">
          {{ $route.name }}
        </p>
      </div>

      <select
        class="block w-fit py-1 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500"
        @change="(e) => changeLanguage((e.target as HTMLSelectElement).value)"
        :value="locale"
        name="lang"
        id=""
      >
        <option value="en">English</option>
        <option value="id">Indonesia</option>
      </select>
    </div>
  </div>
</template>
