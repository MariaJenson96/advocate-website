import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Scale } from 'lucide-react'
import { legalDisclaimer, site } from '@/config/site'
import { readStorage, writeStorage } from '@/lib/utils'
import { ease } from '@/lib/motion'
import { Button } from '@/components/ui/button'

/**
 * Bar Council of India disclaimer & consent.
 * Visitors must acknowledge before continuing. Wording must be approved
 * by the advocate. Toggle via site.disclaimerGate.enabled.
 */
export function DisclaimerGate() {
  const { enabled, storageKey } = site.disclaimerGate
  const [open, setOpen] = useState(() => enabled && typeof window !== 'undefined' && readStorage(storageKey) !== 'yes')

  const accept = () => {
    writeStorage(storageKey, 'yes')
    setOpen(false)
  }

  return (
    <Dialog.Root open={open}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-sm"
              />
            </Dialog.Overlay>
            <Dialog.Content
              asChild
              forceMount
              onEscapeKeyDown={(e) => e.preventDefault()}
              onPointerDownOutside={(e) => e.preventDefault()}
              onInteractOutside={(e) => e.preventDefault()}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.7, ease, delay: 0.15 }}
                className="fixed inset-x-4 top-1/2 z-[90] mx-auto max-h-[calc(100dvh-2rem)] max-w-2xl -translate-y-1/2 overflow-y-auto border border-gold/40 bg-black p-7 shadow-gold sm:p-10 md:p-12"
              >
                <div className="flex items-center gap-4 text-gold">
                  <Scale className="size-6" aria-hidden="true" />
                  <span className="eyebrow">Disclaimer</span>
                </div>
                <Dialog.Title className="mt-6 font-display text-3xl text-white sm:text-4xl">Before you continue</Dialog.Title>
                <Dialog.Description asChild>
                  <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/70 sm:text-[0.95rem]">
                    <p>
                      The Bar Council of India does not permit advocates to solicit work or advertise. By clicking “I Agree”, you acknowledge that:
                    </p>
                    <ul className="space-y-3">
                      {[
                        'You are seeking information about the advocate of your own accord, and there has been no advertisement, solicitation or inducement of any sort.',
                        legalDisclaimer,
                        'Any information you obtain or material you download from this website is entirely at your own volition, and transmitting information through it does not create an advocate-client relationship.',
                      ].map((t) => (
                        <li key={t} className="relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-3 before:bg-gold">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Dialog.Description>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Button onClick={accept} size="lg" className="sm:flex-1" autoFocus>
                    I Agree
                  </Button>
                  <Button asChild variant="outline" size="lg" className="sm:flex-1">
                    <a href="https://www.google.com">Exit Website</a>
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}
