import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { site } from '@/config/site'
import { ease, lineReveal, stagger } from '@/lib/motion'
import { Button } from '@/components/ui/button'
import { NavAnchor } from '@/components/common/nav-anchor'

const headingLines = [
  { text: 'Committed to Justice.', accent: false },
  { text: 'Dedicated to', accent: false },
  { text: 'Your Rights.', accent: true },
]

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
})

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-black">
      {/* Ambient background: grid, travelling column lines, outlined monogram */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0 hidden md:block">
          <span className="hero-line left-[8%]" />
          <span className="hero-line left-[30%]" />
          <span className="hero-line left-[52%]" />
          <span className="hero-line left-[74%]" />
          <span className="hero-line left-[92%]" />
        </div>
        <span className="animate-drift absolute -left-6 top-1/2 hidden -translate-y-1/2 select-none md:block font-display text-[18rem] font-semibold leading-none text-outline-gold sm:text-[26rem] lg:text-[34rem] 3xl:text-[44rem]">
          {site.initials}
        </span>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent" />
      </div>

      <div className="container-luxe grid items-center gap-16 pb-24 pt-32 md:pt-40 lg:grid-cols-12 lg:gap-10 lg:pb-28 3xl:gap-20">
        <div className="lg:col-span-7">
          <motion.div {...fade(0.3)} className="flex items-center gap-4 text-gold">
            <span className="h-px w-8 shrink-0 bg-gold sm:w-12" aria-hidden="true" />
            <p className="eyebrow text-[0.62rem] tracking-[0.22em] sm:text-eyebrow sm:tracking-eyebrow">Trust • Justice • Integrity</p>
          </motion.div>

          <motion.h1 id="hero-title" variants={stagger(0.13, 0.45)} initial="hidden" animate="show" className="mt-8 text-display text-white">
            {headingLines.map((line) => (
              <span key={line.text} className="block overflow-hidden pb-[0.08em]">
                <motion.span variants={lineReveal} className={line.accent ? 'block italic text-gold' : 'block'}>
                  {line.text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p {...fade(1.0)} className="mt-8 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg 3xl:max-w-2xl 3xl:text-xl">
            Providing strategic legal guidance, professional representation, and trusted legal solutions with integrity and commitment.
          </motion.p>

          <motion.div {...fade(1.15)} className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg">
              <NavAnchor section="appointment">
                Schedule a Consultation
                <ArrowRight className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" aria-hidden="true" />
              </NavAnchor>
            </Button>
            <Button asChild variant="outline" size="lg">
              <NavAnchor section="practice">Explore Practice Areas</NavAnchor>
            </Button>
          </motion.div>

          <motion.dl {...fade(1.3)} className="mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-gold/20 pt-8 sm:grid-cols-3">
            {[
              { k: 'Enrolment', v: site.bar.council },
              { k: 'Practice', v: 'Civil · Criminal · Family' },
              { k: 'Consultations', v: 'In person & online' },
            ].map((item) => (
              <div key={item.k}>
                <dt className="eyebrow text-[0.6rem] text-gold">{item.k}</dt>
                <dd className="mt-2.5 font-display text-lg leading-snug text-white">{item.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease, delay: 0.35 }}
          className="relative mx-auto w-full max-w-[24rem] pr-4 sm:max-w-[26rem] sm:pr-6 lg:col-span-5 lg:max-w-none 3xl:max-w-[36rem]"
        >
          <HeroPortrait />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div aria-hidden="true" className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex" {...fade(1.8)}>
        <span className="eyebrow text-[0.55rem] text-white/50">Scroll</span>
        <span className="relative h-12 w-px bg-white/15">
          <span className="animate-scroll-cue absolute inset-0 bg-gold" />
        </span>
      </motion.div>
    </section>
  )
}

function HeroPortrait() {
  return (
    <figure className="relative">
      <span aria-hidden="true" className="animate-orbit absolute -right-8 -top-8 size-36 rounded-full border border-dashed border-gold/30 sm:-right-12 sm:-top-12 sm:size-52" />
      <span aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-gold/60 sm:translate-x-6 sm:translate-y-6" />
      <div className="group relative aspect-[4/5] overflow-hidden rounded-t-full border border-gold/30 bg-black">
        <img
          src="/images/sekin-shiju-portrait.webp"
          alt={`Portrait of ${site.displayName}`}
          width={1000}
          height={1310}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover object-top grayscale transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.04]"
        />
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/90 to-transparent" />
      </div>
      <figcaption className="absolute -bottom-6 -left-2 border border-gold/40 bg-black px-6 py-4 shadow-lift sm:-left-8">
        <span className="block font-display text-xl text-white">{site.displayName}</span>
        <span className="eyebrow mt-1.5 block text-[0.58rem] text-gold">{site.designation}</span>
      </figcaption>
    </figure>
  )
}
