import type { Transition, Variants } from 'motion/react'

/** Shared motion language: one easing, a few durations, consistent reveals. */
export const ease = [0.22, 1, 0.36, 1] as const

export const transition = {
  base: { duration: 0.8, ease } satisfies Transition,
  slow: { duration: 1.1, ease } satisfies Transition,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: transition.base },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: transition.slow },
}

export const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1, ease } },
}

export const stagger = (staggerChildren = 0.09, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Default viewport config for scroll reveals */
export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const
