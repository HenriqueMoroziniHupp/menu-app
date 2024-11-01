import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import Components from 'unplugin-vue-components/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    Components({
      resolvers: [PrimeVueResolver()]
    }),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        theme_color: '#f59e0b'
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'pioneiro.upzini.localhost',
    port: 5174
  }
})
