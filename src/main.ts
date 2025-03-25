import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'
import en from './locales/en.json'
import id from './locales/id.json'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const i18n = createI18n({
  locale: 'en',
  messages: {
    en,
    id,
  },
})
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(ToastPlugin)
app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
