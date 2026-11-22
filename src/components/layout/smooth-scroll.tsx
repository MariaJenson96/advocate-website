import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion'

const HEADER_OFFSET = -84

type ScrollTarget = string | HTMLElement | number
interface SmoothScrollApi {
  scrollTo: (target: ScrollTarget, opts?: { immediate?: boolean }) => void
  stop: () => void
  start: () => void
}

const SmoothScrollContext = createContext<SmoothScrollApi | null>(null)

/** Lenis smooth scrolling — automatically disabled for reduced-motion users. */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reduced = usePrefersReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, autoRaf: true })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  const scrollTo = useCallback((target: ScrollTarget, opts?: { immediate?: boolean }) => {
    const el = typeof target === 'string' ? document.getElementById(target.replace(/^#/, '')) : target
    if (el === null) return
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(el, { offset: typeof el === 'number' ? 0 : HEADER_OFFSET, immediate: opts?.immediate })
      return
    }
    if (typeof el === 'number') window.scrollTo({ top: el })
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET })
  }, [])

  const stop = useCallback(() => lenisRef.current?.stop(), [])
  const start = useCallback(() => lenisRef.current?.start(), [])

  return <SmoothScrollContext.Provider value={{ scrollTo, stop, start }}>{children}</SmoothScrollContext.Provider>
}

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext)
  if (!ctx) throw new Error('useSmoothScroll must be used inside SmoothScrollProvider')
  return ctx
}
