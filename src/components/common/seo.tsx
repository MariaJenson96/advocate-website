import { site } from '@/config/site'

const baseUrl = (import.meta.env.VITE_SITE_URL || site.url).replace(/\/$/, '')

interface SeoProps {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  publishedTime?: string
}

/**
 * Per-page metadata. React 19 hoists <title>, <meta> and <link> into <head>.
 * For best crawler support, consider pre-rendering (see README).
 */
export function Seo({ title, description = site.description, path = '/', image = '/og-image.png', type = 'website', noindex, publishedTime }: SeoProps) {
  const fullTitle = title ? `${title} | ${site.displayName}` : `${site.displayName} — ${site.designation}`
  const url = `${baseUrl}${path}`
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`
  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.displayName} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  )
}

/** Emits Schema.org JSON-LD only when enabled in site config (i.e. details are verified). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  if (!site.structuredData.enabled) return null
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export const absoluteUrl = (path: string) => `${baseUrl}${path}`
