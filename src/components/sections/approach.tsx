import { approach } from '@/data/approach'
import { approachIcons } from '@/components/common/icons'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'

export function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="section-pad bg-white text-black">
      <div className="container-luxe">
        <SectionHeading
          id="approach-title"
          tone="light"
          align="center"
          eyebrow="The Professional Approach"
          title={
            <>
              Why Clients Choose <span className="italic">This Practice</span>
            </>
          }
          intro="Principles that guide every consultation, every filing and every hearing."
        />

        <Reveal as="ul" staggerChildren={0.08} className="mt-16 grid gap-px border-y border-black/10 bg-black/10 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {approach.map(({ title, description, icon }, i) => {
            const Icon = approachIcons[icon]
            return (
              <RevealItem
                as="li"
                key={title}
                className="group relative bg-white px-2 py-10 sm:px-8 lg:py-14"
              >
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-luxe group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-full border border-gold/50 text-gold transition-all duration-500 group-hover:-translate-y-1 group-hover:border-gold group-hover:bg-black">
                    <Icon className="size-6" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="font-display text-5xl text-black/10 transition-colors duration-500 group-hover:text-gold">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-8 font-display text-[1.7rem] leading-tight">{title}</h3>
                <p className="mt-3 leading-relaxed text-black/60">{description}</p>
              </RevealItem>
            )
          })}
        </Reveal>
        <Reveal className="mt-10 text-center">
          <p className="text-xs text-black/50">Every matter turns on its own facts. No particular outcome can be promised or guaranteed.</p>
        </Reveal>
      </div>
    </section>
  )
}
