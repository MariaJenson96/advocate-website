import * as AccordionPrimitive from '@radix-ui/react-accordion'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

/** Radix Accordion — full keyboard support (arrows, Home/End, Enter/Space). */
export const Accordion = AccordionPrimitive.Root

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        'group/item relative border-b border-black/12 transition-colors duration-500',
        'before:absolute before:left-0 before:top-0 before:h-full before:w-px before:origin-top before:scale-y-0 before:bg-gold before:transition-transform before:duration-500 before:ease-luxe',
        'data-[state=open]:before:scale-y-100',
        className,
      )}
      {...props}
    />
  )
}

export function AccordionTrigger({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header asChild>
      <h3>
        <AccordionPrimitive.Trigger
          className={cn(
            'group/trigger flex w-full items-center justify-between gap-6 py-6 pl-0 text-left transition-[padding] duration-500 ease-luxe',
            'font-display text-xl leading-snug text-black sm:text-2xl md:py-7',
            'group-data-[state=open]/item:pl-6 focus-visible:outline-offset-2',
            className,
          )}
          {...props}
        >
          <span>{children}</span>
          <span
            aria-hidden="true"
            className="relative grid size-10 shrink-0 place-items-center rounded-full border border-black/15 transition-colors duration-500 group-hover/trigger:border-gold group-data-[state=open]/trigger:border-gold group-data-[state=open]/trigger:bg-gold"
          >
            <span className="absolute h-px w-3.5 bg-black" />
            <span className="absolute h-3.5 w-px bg-black transition-transform duration-500 ease-luxe group-data-[state=open]/trigger:rotate-90 group-data-[state=open]/trigger:scale-y-0" />
          </span>
        </AccordionPrimitive.Trigger>
      </h3>
    </AccordionPrimitive.Header>
  )
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('max-w-3xl pb-8 pl-6 pr-12 text-[0.98rem] leading-relaxed text-black/70', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
