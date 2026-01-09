import { createApp } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import { primeVuePassThrough } from './primevue-pt'

const app = createApp(App)
app.use(ToastService)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
  pt: primeVuePassThrough, // Estilos customizados globais
})

app.mount('#app')
