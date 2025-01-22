import { cva, type VariantProps } from 'class-variance-authority'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva(
  'yinline-flex yitems-center yrounded-full yborder ypx-2.5 ypy-0.5 ytext-xs yfont-semibold ytransition-colors focus:youtline-none focus:yring-2 focus:yring-ring focus:yring-offset-2',
  {
    variants: {
      variant: {
        default:
          'yborder-transparent ybg-primary ytext-primary-foreground hover:ybg-primary/80',
        secondary:
          'yborder-transparent ybg-secondary ytext-secondary-foreground hover:ybg-secondary/80',
        destructive:
          'yborder-transparent ybg-destructive ytext-destructive-foreground hover:ybg-destructive/80',
        outline: 'ytext-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
