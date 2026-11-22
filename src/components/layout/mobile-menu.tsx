import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { Mail, Phone, X } from 'lucide-react'
import { useEffect } from 'react'
import { navLinks, site } from '@/config/site'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'
import { MENU_EXIT_MS, NavAnchor } from '@/components/common/nav-anchor'
import { Button } from '@/components/ui/button'
import { useSmoothScroll } from './smooth-scroll'

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  isActive: (id: string) => boolean
}

const list = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.25 } } }
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

/** Full-screen menu built on Radix Dialog (focus trap, Esc to close, aria). */
export function MobileMenu({ open, onOpenChange, isActive }: MobileMenuProps) {
  const { stop, start } = useSmoothScroll()
  useEffect(() => {
    if (open) stop()
    else start()
  }, [open, stop, start])

  const close = () => onOpenChange(false)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="group relative grid size-11 place-items-center border border-gold/40 transition-colors duration-300 hover:border-gold xl:hidden"
        >
          <span className="flex w-5 flex-col items-end gap-1.5" aria-hidden="true">
            <span className="h-px w-5 bg-white transition-all duration-500 group-hover:bg-gold" />
            <span className="h-px w-3.5 bg-gold transition-all duration-500 group-hover:w-5" />
            <span className="h-px w-5 bg-white transition-all duration-500 group-hover:bg-gold" />
          </span>
        </button>
      </Dialog.Trigger>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                initial={{ clipPath: 'inset(0 0 100% 0)' }}
                animate={{ clipPath: 'inset(0 0 0% 0)' }}
                exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: MENU_EXIT_MS / 1000, ease } }}
                transition={{ duration: 0.75, ease }}
                className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-black bg-grid xl:hidden"
              >
                <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
                <div className="container-luxe flex h-20 shrink-0 items-center justify-between border-b border-gold/20">
                  <span className="eyebrow text-gold">Menu</span>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="grid size-11 place-items-center border border-gold/40 text-white transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-black"
                    >
                      <X className="size-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Mobile" className="container-luxe flex flex-1 flex-col justify-center py-10">
                  <motion.ol variants={list} initial="hidden" animate="show" className="flex flex-col">
                    {navLinks.map((link, i) => (
                      <motion.li key={link.id} variants={item} className="border-b border-white/8">
                        <NavAnchor
                          section={link.id}
                          onNavigate={close}
                          className={cn(
                            'group flex items-baseline gap-5 py-4 font-display text-[2.1rem] leading-none transition-colors duration-300 hover:text-gold sm:text-5xl',
                            isActive(link.id) ? 'text-gold' : 'text-white',
                          )}
                        >
                          <span className="font-sans text-xs tracking-[0.2em] text-gold/70">{String(i + 1).padStart(2, '0')}</span>
                          <span className="transition-transform duration-500 ease-luxe group-hover:translate-x-2">{link.label}</span>
                        </NavAnchor>
                      </motion.li>
                    ))}
                  </motion.ol>
                  <motion.div variants={item} initial="hidden" animate="show" transition={{ delay: 0.7 }} className="mt-10">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                      <NavAnchor section="appointment" onNavigate={close}>
                        Book Appointment
                      </NavAnchor>
                    </Button>
                  </motion.div>
                </nav>

                <div className="container-luxe flex shrink-0 flex-col gap-3 border-t border-gold/20 py-6 text-sm text-white/70 sm:flex-row sm:gap-8">
                  <a href={`tel:${site.contact.phoneHref}`} className="flex items-center gap-3 hover:text-gold">
                    <Phone className="size-4 text-gold" aria-hidden="true" /> {site.contact.phone}
                  </a>
                  <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 hover:text-gold">
                    <Mail className="size-4 text-gold" aria-hidden="true" /> {site.contact.email}
                  </a>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
