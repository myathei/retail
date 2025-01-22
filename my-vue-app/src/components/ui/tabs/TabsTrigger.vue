<script setup lang="ts">
import { cn } from '@/lib/utils'
import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<TabsTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="cn(
      'yinline-flex yitems-center yjustify-center ywhitespace-nowrap yrounded-sm ypx-3 ypy-1.5 ytext-sm yfont-medium yring-offset-background ytransition-all focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-ring focus-visible:yring-offset-2 disabled:ypointer-events-none disabled:yopacity-50 data-[state=active]:ybg-background data-[state=active]:ytext-foreground data-[state=active]:yshadow-sm',
      props.class,
    )"
  >
    <span class="ytruncate">
      <slot />
    </span>
  </TabsTrigger>
</template>
