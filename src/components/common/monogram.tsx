import { cn } from '@/lib/utils'
import { site } from '@/config/site'

/** SS Legal Firm emblem (eagle with SS / LF). Decorative: the name is always shown beside it. */
export function Monogram({ className }: { className?: string }) {
  return (
    <img
      src={site.logo.mark}
      alt=""
      aria-hidden="true"
      width={320}
      height={229}
      decoding="async"
      className={cn('h-10 w-auto shrink-0 select-none object-contain', className)}
    />
  )
}
