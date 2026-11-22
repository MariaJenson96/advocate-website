import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { motion } from 'motion/react'
import { navLinks, site } from '@/config/site'
import { useScrolled } from '@/hooks/use-scrolled'
import { useActiveSection } from '@/hooks/use-active-section'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'
import { Monogram } from '@/components/common/monogram'
import { NavAnchor } from '@/components/common/nav-anchor'
import { Button } from '@/components/ui/button'
import { MobileMenu } from './mobile-menu'

const sectionIds = navLinks.map((l) => l.id)

export function Header() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const scrolled = useScrolled(40)
  const active = useActiveSection(sectionIds, isHome)
  const [menuOpen, setMenuOpen] = useState(false)
  const solid = scrolled || !isHome || menuOpen

  const isActive = (id: string) => (isHome ? active === id : pathname.startsWith('/articles') && id === 'articles')

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease, delay: 0.1 }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500 ease-luxe',
        solid ? 'border-gold/20 bg-black/92 backdrop-blur-md' : 'border-transparent bg-transparent',
      )}
    >
      <div className={cn('container-luxe flex items-center justify-between gap-6 transition-[height] duration-500 ease-luxe', solid ? 'h-18' : 'h-20 md:h-24')}>
        <Link to="/" className="group flex min-w-0 items-center gap-3.5 xl:shrink-0" aria-label={`${site.displayName} — home`}>
          <Monogram className="h-9 transition-transform duration-500 ease-luxe group-hover:scale-105 sm:h-11" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate font-display text-lg font-semibold leading-tight tracking-wide text-white sm:text-xl">{site.displayName}</span>
            <span className="eyebrow truncate text-[0.5rem] tracking-[0.12em] text-gold xs:text-[0.54rem] xs:tracking-[0.18em] sm:text-[0.6rem] sm:tracking-[0.26em]">{site.designation}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-6 2xl:gap-9">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavAnchor
                  section={link.id}
                  data-active={isActive(link.id)}
                  aria-current={isActive(link.id) ? 'location' : undefined}
                  className={cn(
                    'gold-underline whitespace-nowrap text-[0.74rem] font-medium tracking-[0.1em] uppercase 2xl:text-[0.8rem] 2xl:tracking-[0.12em] transition-colors duration-300 hover:text-gold',
                    isActive(link.id) ? 'text-gold' : 'text-white/80',
                  )}
                >
                  {link.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <NavAnchor section="appointment">Book Appointment</NavAnchor>
          </Button>
          <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} isActive={isActive} />
        </div>
      </div>
    </motion.header>
  )
}
