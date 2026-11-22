import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp, stagger, viewport } from '@/lib/motion'

type Tag = 'div' | 'section' | 'ul' | 'li' | 'article' | 'header' | 'p' | 'h2' | 'span' | 'ol'

interface RevealProps {
  children: ReactNode
  className?: string
  as?: Tag
  variants?: Variants
  /** When set, children that are <Reveal.Item> animate in sequence */
  staggerChildren?: number
  delay?: number
}

const tags = {
  div: motion.div, section: motion.section, ul: motion.ul, li: motion.li, article: motion.article,
  header: motion.header, p: motion.p, h2: motion.h2, span: motion.span, ol: motion.ol,
}

/** Fades & slides content up when it scrolls into view. */
export function Reveal({ children, className, as = 'div', variants, staggerChildren, delay = 0 }: RevealProps) {
  const Comp = tags[as]
  const v = variants ?? (staggerChildren !== undefined ? stagger(staggerChildren, delay) : fadeUp)
  return (
    <Comp className={className} variants={v} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </Comp>
  )
}

/** Child of a staggered <Reveal> */
export function RevealItem({ children, className, as = 'div', variants = fadeUp }: Omit<RevealProps, 'staggerChildren' | 'delay'>) {
  const Comp = tags[as]
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  )
}
