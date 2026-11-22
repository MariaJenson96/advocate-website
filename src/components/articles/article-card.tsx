import { Link } from 'react-router'
import { ArrowUpRight, Calendar } from 'lucide-react'
import type { Article } from '@/data/articles'
import { cn, formatDate } from '@/lib/utils'

export function ArticleCard({ article, tone = 'dark', headingLevel = 'h3' }: { article: Article; tone?: 'dark' | 'light'; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel
  const dark = tone === 'dark'
  return (
    <article className="group relative flex h-full flex-col has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-gold">
      <div className={cn('relative overflow-hidden border', dark ? 'border-gold/20' : 'border-black/10')}>
        <img
          src={article.image}
          alt={article.imageAlt}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="aspect-[16/10] w-full object-cover transition-transform duration-[1.4s] ease-luxe group-hover:scale-[1.06]"
        />
        <span className="eyebrow absolute left-4 top-4 bg-black px-3 py-2 text-[0.58rem] text-gold">{article.category}</span>
      </div>
      <div className="flex flex-1 flex-col pt-7">
        <p className={cn('flex items-center gap-2 text-xs', dark ? 'text-white/50' : 'text-black/50')}>
          <Calendar className="size-3.5 text-gold" aria-hidden="true" />
          <time dateTime={article.published}>{formatDate(article.published)}</time>
          <span aria-hidden="true">·</span>
          <span>{article.readMinutes} min read</span>
        </p>
        <H className={cn('mt-4 font-display text-[1.6rem] leading-[1.2] transition-colors duration-300 group-hover:text-gold', dark ? 'text-white' : 'text-black')}>
          <Link to={`/articles/${article.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {article.title}
          </Link>
        </H>
        <p className={cn('mt-3 flex-1 text-[0.93rem] leading-relaxed', dark ? 'text-white/60' : 'text-black/60')}>{article.excerpt}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Read More
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </article>
  )
}
