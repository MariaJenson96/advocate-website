import type { ComponentProps, MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useSmoothScroll } from '@/components/layout/smooth-scroll'

export const MENU_EXIT_MS = 450

interface NavAnchorProps extends Omit<ComponentProps<typeof Link>, 'to'> {
  section: string
  onNavigate?: () => void
}

/**
 * Links to a section on the home page. On the home page it smooth-scrolls;
 * elsewhere it navigates to "/#section" and the ScrollManager takes over.
 */
export function NavAnchor({ section, onNavigate, onClick, ...props }: NavAnchorProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { scrollTo } = useSmoothScroll()
  const to = section === 'home' ? '/' : `/#${section}`

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    onNavigate?.()
    if (pathname === '/' && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
      e.preventDefault()
      const go = () => (section === 'home' ? scrollTo(0) : scrollTo(section))
      // When closing the mobile menu, wait for its exit animation and scroll-lock release
      if (onNavigate) window.setTimeout(go, MENU_EXIT_MS + 40)
      else go()
      navigate(to, { replace: true, preventScrollReset: true, state: { skipScroll: true } })
    }
  }
  return <Link to={to} onClick={handleClick} {...props} />
}
