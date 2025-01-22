<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <div
    :class="
      cn(
        'yflex yflex-col-reverse sm:yflex-row sm:yjustify-end sm:ygap-x-2',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
