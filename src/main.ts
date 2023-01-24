import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { resetStore } from './stores/resetStore'
import App from './App.vue'
import { lstat } from 'node:fs/promises'
import { cwd } from 'process'
import { ipcRenderer } from 'electron'

ipcRenderer.on('main-process-message', (_event, ...args) => console.log(...args))

lstat(cwd()).then(console.log).catch(console.error)

const pinia = createPinia()
pinia.use(resetStore)

createApp(App)
  .use(pinia)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
