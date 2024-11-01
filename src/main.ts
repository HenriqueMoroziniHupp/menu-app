import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'
import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primevue/themes'

import App from './App.vue'
import router from './router'

import '@/assets/styles.scss'
import '@/assets/tailwind.css'

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03'
    }
  }
})

const app = createApp(App)
const head = createHead()
app
  .use(createPinia())
  .use(PrimeVue, {
    theme: {
      preset: MyPreset,
      options: {
        darkModeSelector: '.app-dark'
      }
    },
    ripple: true
  })
  .use(router)
  .use(head)

app.mount('#app')
