import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/tialwind.css'
import './assets/css/global.scss'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(ElementPlus).use(pinia).mount('#app')
