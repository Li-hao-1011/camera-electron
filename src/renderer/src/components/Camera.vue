<script lang="ts" setup>
import { onMounted } from 'vue'
// import useSetting from '../hooks/useSetting'
import { useConfigStore } from '@renderer/store/useConfigStore'

const { config } = useConfigStore()
onMounted(() => {
  // Put variables in global scope to make them available to the browser console.
  const video = document.querySelector('video')!
  const constraints = {
    audio: false,
    video: { deviceId: config.deviceId, width: 1920, height: 1080 }
  } as MediaStreamConstraints

  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream
    video.play()
  })
})
</script>

<template>
  <main
    class="w-screen h-screen overflow-hidden"
    :class="{ 'rounded-full': config.rounded }"
    :style="{
      border: `${config.borderWidth} solid ${config.borderColor}`
    }"
  >
    <video class="object-cover h-full" :class="{ 'rounded-full': config.rounded }"></video>
    <!-- :style="{ borderRadius: '12px' }" -->
  </main>
</template>

<style scoped lang="scss"></style>
