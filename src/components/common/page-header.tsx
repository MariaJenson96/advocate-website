import { motion } from 'motion/react'
import { Link } from 'react-router'
import { ChevronRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { ease } from '@/lib/motion'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  crumbs: { label: string; to?: string }[]
  children?: ReactNode
}

/** Hero band for inner pages, with breadcrumbs. */
export function PageHeader({ eyebrow, title, intro, crumbs, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-gold/20 bg-black pb-16 pt-36 md:pb-20 md:pt-44">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
      <div className="container-luxe relative">
        <motion.nav aria-label="Breadcrumb" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <ol className="flex flex-wrap items-center gap-2 text-xs text-white/50">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.to ? (
                  <Link to={c.to} className="gold-underline hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-gold">
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && <ChevronRight className="size-3 text-gold/60" aria-hidden="true" />}
              </li>
            ))}
          </ol>
        </motion.nav>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.3 }} className="eyebrow mt-10 flex items-center gap-4 text-gold">
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          {eyebrow}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease, delay: 0.4 }} className="mt-6 max-w-5xl text-h1 text-white">
          {title}
        </motion.h1>
        {intro && (
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.55 }} className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
            {intro}
          </motion.p>
        )}
        {children}
      </div>
    </header>
  )
}
