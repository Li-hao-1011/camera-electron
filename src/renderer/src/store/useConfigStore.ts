// stores/counter.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Page } from './types'

type ConfigType = {
  deviceId: string
  page: Page
  borderWidth: string
  borderColor: string
  rounded: boolean
}

export const useConfigStore = defineStore(
  'config',
  () => {
    const config = ref<ConfigType>({
      deviceId: '',
      page: Page.Setting,
      borderWidth: '1px',
      borderColor: 'pink',
      rounded: true
    })

    return { config }
  },
  {
    persist: true // 本地持久化
  }
)
