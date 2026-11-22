import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/**
 * Buttons use a "wipe" hover: a pseudo-element sweeps across from the left.
 * All states stay within black / gold / white.
 */
const buttonVariants = cva(
  [
    'group/btn relative isolate inline-flex select-none items-center justify-center gap-3 overflow-hidden text-center sm:whitespace-nowrap',
    'rounded-button font-sans text-[0.74rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.78rem] sm:tracking-[0.2em]',
    'transition-colors duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-60',
    'before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:transition-transform before:duration-500 before:ease-luxe',
    'hover:before:origin-left hover:before:scale-x-100 focus-visible:before:origin-left focus-visible:before:scale-x-100',
  ],
  {
    variants: {
      variant: {
        gold: 'bg-gold text-black before:bg-white',
        outline: 'border border-gold/70 text-white before:bg-gold hover:text-black focus-visible:text-black',
        dark: 'bg-black text-white before:bg-gold hover:text-black focus-visible:text-black',
        light: 'border border-black/20 text-black before:bg-black hover:text-white focus-visible:text-white',
      },
      size: {
        sm: 'min-h-10 px-5 py-2',
        md: 'min-h-12 px-6 py-3 sm:px-7',
        lg: 'min-h-14 px-6 py-4 sm:px-9',
        icon: 'size-11',
      },
    },
    defaultVariants: { variant: 'gold', size: 'md' },
  },
)

export interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { buttonVariants }
