import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { gallery } from '@/data/gallery'
import { site } from '@/config/site'
import { ease } from '@/lib/motion'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'
import { useSmoothScroll } from '@/components/layout/smooth-scroll'

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState(1)
  const { stop, start } = useSmoothScroll()
  const thumbs = useRef<(HTMLButtonElement | null)[]>([])
  const lastIndex = useRef(0)
  const open = index !== null

  useEffect(() => {
    if (open) stop()
    else start()
  }, [open, stop, start])

  const step = useCallback((delta: number) => {
    setDirection(delta)
    setIndex((i) => {
      if (i === null) return i
      const next = (i + delta + gallery.length) % gallery.length
      lastIndex.current = next
      return next
    })
  }, [])

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1)
    if (e.key === 'ArrowLeft') step(-1)
  }

  const current = index !== null ? gallery[index] : null

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-pad bg-white text-black">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="gallery-title"
            tone="light"
            eyebrow="Gallery"
            title={
              <>
                Moments from <span className="italic">the Practice</span>
              </>
            }
          />
          <Reveal className="max-w-md text-black/60 lg:pb-2">
            <p>A glimpse of {site.displayName} at work — in chambers, with clients and in the wider legal community.</p>
          </Reveal>
        </div>

        <Reveal as="ul" staggerChildren={0.08} className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 lg:gap-6">
          {gallery.map((img, i) => (
            <RevealItem as="li" key={img.src} className="mb-5 break-inside-avoid lg:mb-6">
              <button
                type="button"
                ref={(el) => {
                  thumbs.current[i] = el
                }}
                onClick={() => {
                  setDirection(1)
                  lastIndex.current = i
                  setIndex(i)
                }}
                aria-label={`View larger: ${img.caption}`}
                className="group relative block w-full overflow-hidden bg-black text-left focus-visible:outline-offset-4"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full grayscale transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.05]"
                />
                {/* gold frame draws in on hover */}
                <span aria-hidden="true" className="pointer-events-none absolute inset-3 scale-95 border border-gold opacity-0 transition-all duration-700 ease-luxe group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-linear-to-t from-black/90 to-transparent px-6 pb-5 pt-16">
                  <span>
                    <span className="eyebrow block text-[0.58rem] text-gold">{img.category}</span>
                    <span className="mt-2 block font-display text-xl text-white">{img.caption}</span>
                  </span>
                  <span aria-hidden="true" className="grid size-10 shrink-0 translate-y-2 place-items-center border border-gold/60 text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <Expand className="size-4" />
                  </span>
                </span>
              </button>
            </RevealItem>
          ))}
        </Reveal>
      </div>

      {/* Lightbox */}
      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <AnimatePresence>
          {open && current && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm" />
              </Dialog.Overlay>
              <Dialog.Content
                asChild
                forceMount
                onKeyDown={onKeyDown}
                aria-describedby={undefined}
                onCloseAutoFocus={(e) => {
                  // Return focus to the photo that is currently shown
                  e.preventDefault()
                  thumbs.current[lastIndex.current]?.focus({ preventScroll: true })
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="fixed inset-0 z-[90] flex flex-col px-4 py-4 sm:px-8 sm:py-6"
                >
                  <div className="flex items-center justify-between gap-4">
                    <p className="eyebrow text-[0.62rem] text-gold" aria-live="polite">
                      {String((index ?? 0) + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
                    </p>
                    <Dialog.Close asChild>
                      <button type="button" aria-label="Close gallery" className="grid size-11 place-items-center border border-gold/40 text-white transition-colors hover:border-gold hover:bg-gold hover:text-black">
                        <X className="size-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center py-6">
                    <AnimatePresence mode="wait" custom={direction} initial={false}>
                      <motion.figure
                        key={current.src}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: direction * -40 }}
                        transition={{ duration: 0.45, ease }}
                        className="flex size-full flex-col items-center justify-center"
                      >
                        <img src={current.src} alt={current.alt} width={current.width} height={current.height} className="max-h-[calc(100%-4.5rem)] w-auto max-w-full border border-gold/30 object-contain" />
                        <figcaption className="mt-5 text-center">
                          <Dialog.Title className="font-display text-2xl text-white">{current.caption}</Dialog.Title>
                          <span className="eyebrow mt-1.5 block text-[0.58rem] text-gold">{current.category}</span>
                        </figcaption>
                      </motion.figure>
                    </AnimatePresence>
                  </div>

                  <div className="flex items-center justify-center gap-3">
                    {[
                      { label: 'Previous image', delta: -1, Icon: ChevronLeft },
                      { label: 'Next image', delta: 1, Icon: ChevronRight },
                    ].map(({ label, delta, Icon }) => (
                      <button
                        key={label}
                        type="button"
                        aria-label={label}
                        onClick={() => step(delta)}
                        className="grid size-12 place-items-center border border-gold/40 text-white transition-colors hover:border-gold hover:bg-gold hover:text-black"
                      >
                        <Icon className="size-5" />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </section>
  )
}
