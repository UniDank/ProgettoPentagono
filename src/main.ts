import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { resetStore } from './stores/resetStore'
import App from './App.vue'

const pinia = createPinia()
pinia.use(resetStore)

createApp(App)
  .use(pinia)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
