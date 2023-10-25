<script setup lang="ts">
// import useSetting from '../hooks/useSetting'
import { useConfigStore } from '@renderer/store/useConfigStore'

const enumeratorPromise = await navigator.mediaDevices.enumerateDevices()
const mediaDevices = enumeratorPromise.filter((device) => device.kind.includes('videoinput'))
// videoinput

const { config } = useConfigStore()
</script>

<template>
  <main class="bg-[#2c3e50] w-screen h-screen p-5 flex flex-col gap-5 pt-10">
    <h2 class="text-gray-50 text-center text-sm opacity-70 mb-0">参数设置</h2>
    <el-select v-model="config.deviceId" placeholder="请选择设备" filterable size="large">
      <el-option
        v-for="it of mediaDevices"
        :key="it.deviceId"
        :label="it.label"
        :value="it.deviceId"
      />
    </el-select>
    <el-input v-model="config.borderWidth" placeholder="边框宽度"></el-input>
    <el-input v-model="config.borderColor" placeholder="边框颜色"></el-input>
  </main>
</template>
