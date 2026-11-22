import { Link, useParams } from 'react-router'
import { ArrowLeft, Calendar, Clock, Globe, TriangleAlert } from 'lucide-react'
import { articles, getArticle, type ArticleBlock } from '@/data/articles'
import { legalDisclaimer, site } from '@/config/site'
import { formatDate } from '@/lib/utils'
import { JsonLd, Seo, absoluteUrl } from '@/components/common/seo'
import { PageHeader } from '@/components/common/page-header'
import { ArticleCard } from '@/components/articles/article-card'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { Button } from '@/components/ui/button'
import { NavAnchor } from '@/components/common/nav-anchor'
import { NotFoundPage } from './not-found-page'

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>
    case 'ul':
      return (
        <ul>
          {block.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )
    case 'quote':
      return (
        <blockquote>
          <p>{block.text}</p>
        </blockquote>
      )
    default:
      return <p>{block.text}</p>
  }
}

export function ArticleDetailPage() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFoundPage />

  const related = [
    ...articles.filter((a) => a.slug !== article.slug && a.category === article.category),
    ...articles.filter((a) => a.slug !== article.slug && a.category !== article.category),
  ].slice(0, 3)

  return (
    <>
      <Seo title={article.title} description={article.excerpt} path={`/articles/${article.slug}`} type="article" publishedTime={article.published} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          datePublished: article.published,
          dateModified: article.updated ?? article.published,
          image: absoluteUrl(article.image),
          author: { '@type': 'Person', name: site.name },
          mainEntityOfPage: absoluteUrl(`/articles/${article.slug}`),
        }}
      />

      <PageHeader
        eyebrow={article.category}
        title={article.title}
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Articles', to: '/articles' }, { label: article.category }]}
      >
        <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Published</dt>
            <Calendar className="size-4 text-gold" aria-hidden="true" />
            <dd>
              <time dateTime={article.published}>{formatDate(article.published)}</time>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Reading time</dt>
            <Clock className="size-4 text-gold" aria-hidden="true" />
            <dd>{article.readMinutes} min read</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt>
              <Globe className="size-4 text-gold" aria-hidden="true" />
              <span className="sr-only">Jurisdiction</span>
            </dt>
            <dd>Jurisdiction: {article.jurisdiction}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="text-white/40">By</dt>
            <dd className="text-white">{site.displayName}</dd>
          </div>
        </dl>
      </PageHeader>

      <article className="bg-black pb-24">
        <div className="container-luxe">
          <Reveal className="relative -mt-px border-x border-b border-gold/20">
            <img src={article.image} alt={article.imageAlt} width={1600} height={800} decoding="async" className="aspect-[2/1] w-full object-cover md:aspect-[21/9]" />
          </Reveal>

          <div className="mx-auto mt-16 max-w-[44rem] md:mt-20">
            {!article.reviewed && (
              <div role="note" className="mb-12 flex gap-4 border border-gold/50 bg-gold/[0.06] p-5 text-sm text-white/80">
                <TriangleAlert className="size-5 shrink-0 text-gold" aria-hidden="true" />
                <p>
                  <strong className="font-semibold text-gold">Draft — pending review.</strong> This sample article must be reviewed and approved by the advocate before publication.
                </p>
              </div>
            )}

            <div className="prose-legal">
              {article.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            <aside className="mt-16 border-t border-gold/25 pt-8 text-sm leading-relaxed text-white/55">
              <p>
                <span className="eyebrow mr-2 text-[0.6rem] text-gold">Note</span>
                This article provides general information on the law of {article.jurisdiction} as understood on {formatDate(article.updated ?? article.published)}. Laws and their interpretation change. {legalDisclaimer}
              </p>
            </aside>

            <div className="mt-12 flex flex-col gap-4 border border-gold/25 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-2xl text-white">Need advice on your situation?</p>
                <p className="mt-1 text-sm text-white/55">Request a consultation to discuss your matter.</p>
              </div>
              <Button asChild>
                <NavAnchor section="appointment">Book Appointment</NavAnchor>
              </Button>
            </div>

            <Link to="/articles" className="group mt-12 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              <ArrowLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
              <span className="gold-underline">All articles</span>
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-pad border-t border-gold/15 bg-black">
          <div className="container-luxe">
            <h2 id="related-title" className="text-h2 text-white">
              Related <span className="italic text-gold">Articles</span>
            </h2>
            <Reveal as="ul" staggerChildren={0.1} className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => (
                <RevealItem as="li" key={a.slug}>
                  <ArticleCard article={a} />
                </RevealItem>
              ))}
            </Reveal>
          </div>
        </section>
      )}
    </>
  )
}
