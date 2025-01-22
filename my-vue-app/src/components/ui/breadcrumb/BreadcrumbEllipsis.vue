<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import { MoreHorizontal } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    role="presentation"
    aria-hidden="true"
    :class="cn('yflex yh-9 yw-9 yitems-center yjustify-center', props.class)"
  >
    <slot>
      <MoreHorizontal class="yh-4 yw-4" />
    </slot>
    <span class="ysr-only">More</span>
  </span>
</template>
