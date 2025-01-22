<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Separator, type SeparatorProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<
  SeparatorProps & { class?: HTMLAttributes['class'], label?: string }
>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="
      cn(
        'yshrink-0 ybg-border yrelative',
        props.orientation === 'vertical' ? 'yw-px yh-full' : 'yh-px yw-full',
        props.class,
      )
    "
  >
    <span
      v-if="props.label"
      :class="cn('ytext-xs ytext-muted-foreground ybg-background yabsolute ytop-1/2 yleft-1/2 y-translate-x-1/2 y-translate-y-1/2 yflex yjustify-center yitems-center',
                 props.orientation === 'vertical' ? 'yw-[1px] ypx-1 ypy-2' : 'yh-[1px] ypy-1 ypx-2',
      )"
    >{{ props.label }}</span>
  </Separator>
</template>
