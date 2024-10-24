import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'

import '@/assets/styles.scss'
import '@/assets/tailwind.css'

const app = createApp(App)
const head = createHead()
app
  .use(createPinia())
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.app-dark'
      }
    }
  })
  .use(router)
  .use(head)

app.mount('#app')
