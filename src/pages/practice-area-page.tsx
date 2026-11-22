import { Link, useParams } from 'react-router'
import { ArrowUpRight, Check } from 'lucide-react'
import { offeredPracticeAreas } from '@/data/practice-areas'
import { practiceIcons } from '@/components/common/icons'
import { Seo } from '@/components/common/seo'
import { PageHeader } from '@/components/common/page-header'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { Button } from '@/components/ui/button'
import { NavAnchor } from '@/components/common/nav-anchor'
import { NotFoundPage } from './not-found-page'

export function PracticeAreaPage() {
  const { slug = '' } = useParams()
  const area = offeredPracticeAreas.find((p) => p.slug === slug)
  if (!area) return <NotFoundPage />
  const Icon = practiceIcons[area.icon]
  const others = offeredPracticeAreas.filter((p) => p.slug !== area.slug)

  return (
    <>
      <Seo title={area.title} description={area.summary} path={`/practice-areas/${area.slug}`} />
      <PageHeader
        eyebrow="Practice Area"
        title={area.title}
        intro={area.summary}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Practice Areas', to: '/#practice' }, { label: area.title }]}
      />

      <section className="section-pad bg-white text-black">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <Reveal staggerChildren={0.1} className="space-y-6 lg:col-span-7">
            <RevealItem>
              <span className="grid size-16 place-items-center border border-gold text-gold">
                <Icon className="size-7" strokeWidth={1.3} aria-hidden="true" />
              </span>
            </RevealItem>
            <RevealItem as="h2" className="pt-4 text-h2">
              Overview
            </RevealItem>
            {area.overview.map((p) => (
              <RevealItem as="p" key={p} className="text-lg leading-[1.85] text-black/70">
                {p}
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="lg:col-span-5">
            <div className="border border-black/10 p-8 sm:p-10">
              <h2 className="eyebrow text-[0.65rem] text-black/55">Matters handled include</h2>
              <ul className="mt-6 divide-y divide-black/10">
                {area.matters.map((m) => (
                  <li key={m} className="flex items-center gap-4 py-4 font-display text-xl">
                    <Check className="size-4 shrink-0 text-gold" aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
              <Button asChild variant="dark" className="mt-8 w-full">
                <NavAnchor section="appointment">Request a Consultation</NavAnchor>
              </Button>
              <p className="mt-4 text-xs text-black/50">Information on this page is general in nature and not legal advice.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="other-areas" className="section-pad bg-black">
        <div className="container-luxe">
          <h2 id="other-areas" className="text-h2 text-white">
            Other <span className="italic text-gold">Practice Areas</span>
          </h2>
          <Reveal as="ul" staggerChildren={0.06} className="mt-12 grid border-t border-gold/20 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <RevealItem as="li" key={o.slug} className="border-b border-gold/20">
                <Link to={`/practice-areas/${o.slug}`} className="group flex items-center justify-between gap-6 py-6 pr-4 font-display text-2xl text-white transition-colors hover:text-gold sm:pr-8">
                  {o.title}
                  <ArrowUpRight className="size-5 shrink-0 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
