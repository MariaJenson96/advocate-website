import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import { offeredPracticeAreas } from '@/data/practice-areas'
import { practiceIcons } from '@/components/common/icons'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'

export function PracticeAreas() {
  return (
    <section id="practice" aria-labelledby="practice-title" className="section-pad relative overflow-hidden bg-black">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div className="container-luxe relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="practice-title"
            eyebrow="Areas of Practice"
            title={
              <>
                Legal Expertise <span className="italic text-gold">&amp;</span> Practice Areas
              </>
            }
          />
          <Reveal className="max-w-md text-white/60 lg:pb-2">
            <p>Focused counsel across the matters that most affect individuals, families and businesses — each handled with the same standard of preparation.</p>
          </Reveal>
        </div>

        <Reveal as="ul" staggerChildren={0.07} className="mt-16 grid gap-px border border-gold/15 bg-gold/15 sm:grid-cols-2 lg:grid-cols-4">
          {offeredPracticeAreas.map((area, i) => {
            const Icon = practiceIcons[area.icon]
            return (
              <RevealItem as="li" key={area.slug} className="relative bg-black">
                <article className="group relative flex h-full flex-col p-8 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:-outline-offset-2 has-[a:focus-visible]:outline-gold transition-colors duration-500 hover:bg-white/[0.025] 3xl:p-10">
                  {/* gold corner accents that extend on hover */}
                  <span aria-hidden="true" className="absolute left-0 top-0 h-px w-10 bg-gold transition-all duration-700 ease-luxe group-hover:w-full" />
                  <span aria-hidden="true" className="absolute left-0 top-0 h-10 w-px bg-gold transition-all duration-700 ease-luxe group-hover:h-full" />

                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center border border-gold/40 text-gold transition-all duration-500 ease-luxe group-hover:border-gold group-hover:bg-gold group-hover:text-black">
                      <Icon className="size-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <span className="font-display text-sm text-white/30">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-8 font-display text-[1.65rem] leading-tight text-white">
                    <Link to={`/practice-areas/${area.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {area.title}
                    </Link>
                  </h3>
                  <p className="mt-4 flex-1 text-[0.92rem] leading-relaxed text-white/60">{area.summary}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                    <span className="gold-underline group-hover:after:origin-left group-hover:after:scale-x-100">Learn More</span>
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </article>
              </RevealItem>
            )
          })}
        </Reveal>
        <Reveal className="mt-8">
          <p className="text-xs text-white/40">Services listed are indicative. Please contact the office to confirm whether your matter falls within the scope of the practice.</p>
        </Reveal>
      </div>
    </section>
  )
}
