<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn('yflex yflex-col ygap-y-2 ytext-center sm:ytext-left', props.class)
    "
  >
    <slot />
  </div>
</template>
