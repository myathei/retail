<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-vue-next'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn('ypeer yh-4 yw-4 yshrink-0 yrounded-sm yborder yborder-primary yring-offset-background focus-visible:youtline-none focus-visible:yring-2 focus-visible:yring-ring focus-visible:yring-offset-2 disabled:ycursor-not-allowed disabled:yopacity-50 data-[state=checked]:ybg-primary data-[state=checked]:ytext-primary-foreground',
         props.class)"
  >
    <CheckboxIndicator class="yflex yh-full yw-full yitems-center yjustify-center ytext-current">
      <slot>
        <Check class="yh-4 yw-4" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
