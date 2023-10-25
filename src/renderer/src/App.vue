<script setup lang="ts">
import Camera from './components/Camera.vue'
import { SettingOne, CameraOne, InnerShadowTopLeft, Square } from '@icon-park/vue-next'
import Setting from './components/Setting.vue'
// import type { Page } from './hooks/useSetting'
// import useSetting from './hooks/useSetting'
import { useConfigStore } from '@renderer/store/useConfigStore'
import { Page } from '@renderer/store/types'

const { config } = useConfigStore()
const quit = () => {
  window.api.quit()
}
</script>

<template>
  <Suspense>
    <main class="relative group" @contextmenu="quit">
      <section>
        <SettingOne
          v-if="config.page === Page.Camera"
          theme="outline"
          size="24"
          class="setting-icon text-black opacity-80 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer z-10 hidden group-hover:block"
          @click="config.page = Page.Setting"
        />
        <CameraOne
          v-if="config.page === Page.Setting"
          theme="outline"
          size="24"
          class="setting-icon text-white opacity-80 absolute left-1/2 -translate-x-1/2 mt-3 cursor-pointer z-10"
          @click="config.page = Page.Camera"
        />

        <div
          v-show="config.page === Page.Camera"
          class="setting-icon text-black opacity-80 absolute left-1/2 -translate-x-1/2 bottom-3 mt-3 cursor-pointer z-10"
          @click="config.rounded = !config.rounded"
        >
          <Square v-if="config.rounded" theme="outline" size="24" />
          <InnerShadowTopLeft v-else theme="outline" size="24" />
        </div>
      </section>
      <section>
        <Camera v-if="config.page === Page.Camera" />
        <Setting v-else-if="config.page === Page.Setting" />
        <div v-else></div>
      </section>
    </main>
  </Suspense>
</template>
