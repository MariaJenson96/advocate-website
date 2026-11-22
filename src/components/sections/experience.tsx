import { motion } from 'motion/react'
import { Award, Briefcase, GraduationCap, Landmark, ScrollText, Users } from 'lucide-react'
import { site } from '@/config/site'
import { timeline, type TimelineEntry } from '@/data/experience'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'

const kindIcon: Record<TimelineEntry['kind'], typeof Award> = {
  practice: Landmark,
  position: Briefcase,
  enrolment: ScrollText,
  education: GraduationCap,
  certification: Award,
  membership: Users,
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad relative overflow-hidden border-t border-gold/15 bg-black">
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="experience-title"
              eyebrow="Professional Experience"
              title={
                <>
                  Experience Built on <span className="italic text-gold">Legal Excellence</span>
                </>
              }
              intro="A record of practice, training and professional development — presented as it is, without embellishment."
            />
            <Reveal className="mt-12 border border-gold/25 p-8">
              <h3 className="eyebrow text-[0.62rem] text-gold">At a Glance</h3>
              <dl className="mt-6 divide-y divide-white/10">
                {[
                  { k: 'Years of practice', v: '[XX] years' }, // PLACEHOLDER
                  { k: 'Enrolled', v: `${site.bar.council}, ${site.bar.enrolledYear}` },
                  { k: 'Regularly appears before', v: site.courts.join(', ') },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col gap-1.5 py-4 first:pt-0 last:pb-0 sm:flex-row sm:justify-between sm:gap-6">
                    <dt className="text-sm text-white/55">{row.k}</dt>
                    <dd className="font-display text-lg text-white sm:text-right">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="relative lg:col-span-7 lg:pl-8">
          {/* Timeline spine: static track + gold line drawn on reveal */}
          <span aria-hidden="true" className="absolute bottom-0 left-[1.15rem] top-0 w-px bg-white/10 lg:left-[3.15rem]" />
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-[1.15rem] top-0 w-px origin-top bg-gold lg:left-[3.15rem]"
          />
          <Reveal as="ol" staggerChildren={0.12} className="relative space-y-12">
            {timeline.map((entry) => {
              const Icon = kindIcon[entry.kind]
              return (
                <RevealItem as="li" key={entry.title + entry.period} className="group relative grid grid-cols-[2.3rem_1fr] gap-6 sm:gap-8">
                  <span className="relative z-10 grid size-[2.3rem] place-items-center border border-gold bg-black text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-black">
                    <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div className="border-b border-white/10 pb-12 group-last:border-0 group-last:pb-0">
                    <p className="eyebrow text-[0.62rem] text-gold">{entry.period}</p>
                    <h3 className="mt-3 font-display text-h3 text-white">{entry.title}</h3>
                    <p className="mt-1.5 text-sm font-medium text-white/75">{entry.organisation}</p>
                    <p className="mt-4 max-w-xl leading-relaxed text-white/55">{entry.description}</p>
                  </div>
                </RevealItem>
              )
            })}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
