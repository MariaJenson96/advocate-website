import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { articles } from '@/data/articles'
import { ArticleCard } from '@/components/articles/article-card'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'
import { Button } from '@/components/ui/button'

export function ArticlesPreview() {
  const latest = [...articles].sort((a, b) => b.published.localeCompare(a.published)).slice(0, 3)
  return (
    <section id="articles" aria-labelledby="articles-title" className="section-pad bg-black">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="articles-title"
            eyebrow="Articles & Insights"
            title={
              <>
                Legal Knowledge <span className="italic text-gold">&amp;</span> Insights
              </>
            }
          />
          <Reveal>
            <Button asChild variant="outline">
              <Link to="/articles">
                View All Articles <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Reveal as="ul" staggerChildren={0.12} className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <RevealItem as="li" key={a.slug}>
              <ArticleCard article={a} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
