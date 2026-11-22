import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal, RevealItem } from './reveal'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  tone?: 'dark' | 'light'
  align?: 'left' | 'center'
  className?: string
  id?: string
  as?: 'h1' | 'h2'
}

/** Eyebrow label + large serif heading + optional intro. */
export function SectionHeading({ eyebrow, title, intro, tone = 'dark', align = 'left', className, id, as = 'h2' }: SectionHeadingProps) {
  const Heading = as
  return (
    <Reveal staggerChildren={0.1} className={cn('flex max-w-3xl flex-col gap-6', align === 'center' && 'mx-auto items-center text-center', className)}>
      <RevealItem className={cn('flex items-center gap-4', tone === 'dark' ? 'text-gold' : 'text-black')}>
        <span className={cn('h-px w-10', tone === 'dark' ? 'bg-gold' : 'bg-gold')} aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
        {align === 'center' && <span className="h-px w-10 bg-gold" aria-hidden="true" />}
      </RevealItem>
      <RevealItem>
        <Heading id={id} className={cn('text-h2', tone === 'dark' ? 'text-white' : 'text-black')}>
          {title}
        </Heading>
      </RevealItem>
      {intro && (
        <RevealItem>
          <p className={cn('max-w-2xl text-base leading-relaxed md:text-lg', tone === 'dark' ? 'text-white/65' : 'text-black/65')}>{intro}</p>
        </RevealItem>
      )}
    </Reveal>
  )
}
