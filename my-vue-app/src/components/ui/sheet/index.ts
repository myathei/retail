import { cva, type VariantProps } from 'class-variance-authority'

export { default as Sheet } from './Sheet.vue'
export { default as SheetClose } from './SheetClose.vue'
export { default as SheetContent } from './SheetContent.vue'
export { default as SheetDescription } from './SheetDescription.vue'
export { default as SheetFooter } from './SheetFooter.vue'
export { default as SheetHeader } from './SheetHeader.vue'
export { default as SheetTitle } from './SheetTitle.vue'
export { default as SheetTrigger } from './SheetTrigger.vue'

export const sheetVariants = cva(
  'yfixed yz-50 ygap-4 ybg-background yp-6 yshadow-lg ytransition yease-in-out data-[state=open]:yanimate-in data-[state=closed]:yanimate-out data-[state=closed]:yduration-300 data-[state=open]:yduration-500',
  {
    variants: {
      side: {
        top: 'yinset-x-0 ytop-0 yborder-b data-[state=closed]:yslide-out-to-top data-[state=open]:yslide-in-from-top',
        bottom:
            'yinset-x-0 ybottom-0 yborder-t data-[state=closed]:yslide-out-to-bottom data-[state=open]:yslide-in-from-bottom',
        left: 'yinset-y-0 yleft-0 yh-full yw-3/4 yborder-r data-[state=closed]:yslide-out-to-left data-[state=open]:yslide-in-from-left sm:ymax-w-sm',
        right:
            'yinset-y-0 yright-0 yh-full yw-3/4 yborder-l data-[state=closed]:yslide-out-to-right data-[state=open]:yslide-in-from-right sm:ymax-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

export type SheetVariants = VariantProps<typeof sheetVariants>
