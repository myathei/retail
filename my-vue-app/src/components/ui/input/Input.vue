<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { useVModel } from '@vueuse/core'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input v-model="modelValue" :class="cn('yflex yh-10 yw-full yrounded-md yborder yborder-input ybg-background ypx-3 ypy-2 ytext-sm yring-offset-background file:yborder-0 file:ybg-transparent file:ytext-sm file:yfont-medium placeholder:ytext-muted-foreground focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-ring focus-visible:yring-offset-2 disabled:ycursor-not-allowed disabled:yopacity-50', props.class)">
</template>
