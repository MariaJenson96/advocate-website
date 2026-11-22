import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useSmoothScroll } from './smooth-scroll'

/** Scrolls to top on route change, or to the #section in the URL. */
export function ScrollManager() {
  const { pathname, hash, state } = useLocation()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    if ((state as { skipScroll?: boolean } | null)?.skipScroll) return
    if (hash) {
      // Wait a frame for the destination page to render
      const id = hash.slice(1)
      let tries = 0
      const tick = () => {
        if (document.getElementById(id)) scrollTo(id, { immediate: true })
        else if (tries++ < 20) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
      return
    }
    scrollTo(0, { immediate: true })
  }, [pathname, hash, state, scrollTo])

  return null
}
