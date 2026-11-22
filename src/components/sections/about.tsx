import { GraduationCap, Landmark, Languages, ScrollText } from 'lucide-react'
import { site } from '@/config/site'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'

const credentials = [
  {
    icon: GraduationCap,
    label: 'Education',
    lines: site.education.map((e) => `${e.degree} — ${e.institution} (${e.year})`),
  },
  { icon: ScrollText, label: 'Bar Enrolment', lines: [site.bar.council, `${site.bar.enrolmentNo} · ${site.bar.enrolledYear}`] },
  { icon: Landmark, label: 'Courts & Forums', lines: [...site.courts] },
  { icon: Languages, label: 'Languages', lines: [site.languages.join(' · ')] },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad relative overflow-hidden bg-white text-black">
      <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-20">
        {/* Photograph column */}
        <Reveal className="relative lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <div className="relative pb-6 pl-6">
              <span aria-hidden="true" className="absolute bottom-0 left-0 h-3/4 w-3/4 border border-gold" />
              <figure className="group relative overflow-hidden bg-black">
                {/* REPLACE: /public/images/advocate-about.svg with an authentic photograph of the advocate. */}
                <img
                  src="/images/advocate-about.svg"
                  alt={`${site.displayName} in chambers`}
                  width={900}
                  height={1100}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[9/11] w-full object-cover grayscale transition-transform duration-[1.6s] ease-luxe group-hover:scale-[1.04]"
                />
              </figure>
            </div>
            <blockquote className="relative mt-12 border-l-2 border-gold pl-7">
              <span aria-hidden="true" className="absolute -top-8 left-5 font-display text-8xl leading-none text-gold">
                “
              </span>
              <p className="font-display text-2xl italic leading-snug text-black sm:text-[1.7rem]">
                Justice is not just a profession; it is a commitment to protecting rights and upholding the law.
              </p>
            </blockquote>
          </div>
        </Reveal>

        {/* Biography column */}
        <div className="lg:col-span-7">
          <SectionHeading
            id="about-title"
            tone="light"
            eyebrow="About the Advocate"
            title={
              <>
                Professional Excellence. <span className="italic">Personal Commitment.</span>
              </>
            }
          />

          <Reveal staggerChildren={0.08} className="mt-10 space-y-6 text-[1.02rem] leading-[1.85] text-black/70">
            <RevealItem as="p">
              <strong className="font-semibold text-black">{site.name}</strong> is an advocate and legal consultant enrolled with the {site.bar.council}.{' '}
              {/* PLACEHOLDER — replace with the advocate's verified biography */}
              The practice advises individuals, families and businesses on [practice areas], with a focus on careful preparation and clear, practical guidance.
            </RevealItem>
            <RevealItem as="p">
              [Professional background — e.g. the chambers or firm where the advocate trained, the nature of matters handled, and the forums where they regularly appear. Include only verified information.]
            </RevealItem>
          </Reveal>

          <Reveal staggerChildren={0.08} as="ul" className="mt-12 grid gap-px overflow-hidden border border-black/10 bg-black/10 sm:grid-cols-2">
            {credentials.map(({ icon: Icon, label, lines }) => (
              <RevealItem as="li" key={label} className="group bg-white p-7 transition-colors duration-500 hover:bg-black">
                <Icon className="size-5 text-gold" aria-hidden="true" />
                <h3 className="eyebrow mt-5 text-[0.62rem] text-black/55 transition-colors duration-500 group-hover:text-gold">{label}</h3>
                <ul className="mt-3 space-y-1.5">
                  {lines.map((l) => (
                    <li key={l} className="font-display text-lg leading-snug text-black transition-colors duration-500 group-hover:text-white">
                      {l}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal staggerChildren={0.1} className="mt-14 grid gap-10 sm:grid-cols-2">
            <RevealItem>
              <h3 className="flex items-center gap-3 font-display text-2xl text-black">
                <span className="h-px w-8 bg-gold" aria-hidden="true" /> Legal Philosophy
              </h3>
              <p className="mt-4 leading-relaxed text-black/65">
                Every matter deserves rigorous preparation and honest advice. Clients are told plainly where they stand — the strengths, the risks and the realistic options — so that every decision is an informed one.
              </p>
            </RevealItem>
            <RevealItem>
              <h3 className="flex items-center gap-3 font-display text-2xl text-black">
                <span className="h-px w-8 bg-gold" aria-hidden="true" /> Commitment to Clients
              </h3>
              <p className="mt-4 leading-relaxed text-black/65">
                Clients receive personal attention, timely updates and strict confidentiality throughout their matter, with clear communication about procedure, timelines and fees from the outset.
              </p>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
