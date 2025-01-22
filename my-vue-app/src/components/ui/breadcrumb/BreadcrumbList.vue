<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ol
    :class="cn('yflex yflex-wrap yitems-center ygap-1.5 ybreak-words ytext-sm ytext-muted-foreground sm:ygap-2.5', props.class)"
  >
    <slot />
  </ol>
</template>
