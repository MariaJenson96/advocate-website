import { cn } from '@/lib/utils'
import { site } from '@/config/site'

/** Professional initials mark — a gold-framed square with serif initials. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid size-11 shrink-0 place-items-center border border-gold/80 font-display text-lg font-semibold tracking-wider text-gold',
        'after:absolute after:inset-1 after:border after:border-gold/25',
        className,
      )}
    >
      {site.initials}
    </span>
  )
}
