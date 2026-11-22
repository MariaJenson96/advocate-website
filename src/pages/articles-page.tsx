import { useMemo, type ReactNode } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { articleCategories, articles } from '@/data/articles'
import { cn } from '@/lib/utils'
import { ease } from '@/lib/motion'
import { Seo } from '@/components/common/seo'
import { PageHeader } from '@/components/common/page-header'
import { ArticleCard } from '@/components/articles/article-card'
import { useSmoothScroll } from '@/components/layout/smooth-scroll'

const PER_PAGE = 6

export function ArticlesPage() {
  const [params, setParams] = useSearchParams()
  const { scrollTo } = useSmoothScroll()
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? 'All'
  const page = Math.max(1, Number(params.get('page')) || 1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...articles]
      .sort((a, b) => b.published.localeCompare(a.published))
      .filter((a) => category === 'All' || a.category === category)
      .filter((a) => !q || [a.title, a.excerpt, a.category].some((t) => t.toLowerCase().includes(q)))
  }, [query, category])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)
  const usedCategories = articleCategories.filter((c) => articles.some((a) => a.category === c))

  const update = (next: Record<string, string | null>) => {
    const p = new URLSearchParams(params)
    for (const [k, v] of Object.entries(next)) {
      if (v === null || v === '' || (k === 'category' && v === 'All') || (k === 'page' && v === '1')) p.delete(k)
      else p.set(k, v)
    }
    setParams(p, { replace: true, preventScrollReset: true, state: { skipScroll: true } })
  }

  const goToPage = (n: number) => {
    update({ page: String(n) })
    scrollTo('article-results')
  }

  return (
    <>
      <Seo title="Legal Knowledge & Insights" description="Articles and explainers on property, family, consumer, civil and criminal law — general information for readers in India." path="/articles" />
      <PageHeader
        eyebrow="Articles & Insights"
        title={
          <>
            Legal Knowledge <span className="italic text-gold">&amp;</span> Insights
          </>
        }
        intro="Clear, general explanations of legal topics that matter in everyday life. These articles are informational and are not a substitute for legal advice on your specific matter."
        crumbs={[{ label: 'Home', to: '/' }, { label: 'Articles' }]}
      />

      <section className="section-pad bg-black" aria-label="Article listing">
        <div className="container-luxe">
          {/* Filters */}
          <div className="flex flex-col gap-8 border-b border-gold/15 pb-10 lg:flex-row lg:items-center lg:justify-between">
            <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-2">
              {['All', ...usedCategories].map((c) => {
                const active = c === category
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active}
                    onClick={() => update({ category: c, page: null })}
                    className={cn(
                      'h-10 border px-4 text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-300',
                      active ? 'border-gold bg-gold text-black' : 'border-white/15 text-white/70 hover:border-gold hover:text-gold',
                    )}
                  >
                    {c}
                  </button>
                )
              })}
            </div>
            <div className="relative w-full lg:max-w-sm">
              <label htmlFor="article-search" className="sr-only">
                Search articles
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gold" aria-hidden="true" />
              <input
                id="article-search"
                type="search"
                value={query}
                onChange={(e) => update({ q: e.target.value, page: null })}
                placeholder="Search articles…"
                className="h-12 w-full border border-white/15 bg-transparent pl-11 pr-11 text-sm text-white transition-colors focus:border-gold focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" onClick={() => update({ q: null, page: null })} aria-label="Clear search" className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center text-white/60 hover:text-gold">
                  <X className="size-4" />
                </button>
              )}
            </div>
          </div>

          <p id="article-results" className="mt-8 text-sm text-white/50" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
            {category !== 'All' && ` in ${category}`}
            {query && ` matching “${query}”`}
          </p>

          <AnimatePresence mode="wait">
            {visible.length > 0 ? (
              <motion.ul
                key={`${category}-${query}-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="mt-10 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3"
              >
                {visible.map((a) => (
                  <li key={a.slug}>
                    <ArticleCard article={a} headingLevel="h2" />
                  </li>
                ))}
              </motion.ul>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 border border-gold/20 px-6 py-20 text-center">
                <p className="font-display text-3xl text-white">No articles found</p>
                <p className="mt-3 text-white/55">Try a different search term or category.</p>
                <button type="button" onClick={() => update({ q: null, category: null, page: null })} className="gold-underline mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                  Reset filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-20 flex items-center justify-center gap-2">
              <PageButton label="Previous page" disabled={current === 1} onClick={() => goToPage(current - 1)}>
                <ChevronLeft className="size-4" />
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <PageButton key={n} label={`Page ${n}`} active={n === current} onClick={() => goToPage(n)}>
                  {n}
                </PageButton>
              ))}
              <PageButton label="Next page" disabled={current === totalPages} onClick={() => goToPage(current + 1)}>
                <ChevronRight className="size-4" />
              </PageButton>
            </nav>
          )}
        </div>
      </section>
    </>
  )
}

function PageButton({ children, label, active, disabled, onClick }: { children: ReactNode; label: string; active?: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'grid size-11 place-items-center border font-display text-lg transition-colors duration-300 disabled:pointer-events-none disabled:opacity-30',
        active ? 'border-gold bg-gold text-black' : 'border-white/15 text-white hover:border-gold hover:text-gold',
      )}
    >
      {children}
    </button>
  )
}
