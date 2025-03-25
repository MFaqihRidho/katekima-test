import { defineStore } from 'pinia'

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'en', // Default locale
  }),
  actions: {
    setLocale(newLocale: string) {
      this.locale = newLocale
    },
  },
  persist: {
    storage: localStorage,
    key: 'localeStore',
  },
})
