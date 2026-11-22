import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'
import { articles } from './src/data/articles.ts'
import { practiceAreas } from './src/data/practice-areas.ts'
import { site } from './src/config/site.ts'

/**
 * Emits sitemap.xml and robots.txt at build time from the same data
 * the app renders, so they never drift out of sync.
 */
function seoFiles(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/$/, '')
  return {
    name: 'advocate-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls: { loc: string; lastmod: string; priority: string }[] = [
        { loc: '/', lastmod: today, priority: '1.0' },
        { loc: '/articles', lastmod: today, priority: '0.8' },
        ...practiceAreas
          .filter((p) => p.offered)
          .map((p) => ({ loc: `/practice-areas/${p.slug}`, lastmod: today, priority: '0.7' })),
        ...articles.map((a) => ({ loc: `/articles/${a.slug}`, lastmod: a.updated ?? a.published, priority: '0.6' })),
        { loc: '/privacy-policy', lastmod: today, priority: '0.3' },
        { loc: '/terms', lastmod: today, priority: '0.3' },
      ]
      const xml =
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
        urls
          .map((u) => `  <url><loc>${base}${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`)
          .join('\n') +
        `\n</urlset>\n`
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || site.url
  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    build: {
      rolldownOptions: {
        output: {
          // Long-term-cacheable vendor chunks
          codeSplitting: {
            groups: [
              { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler|react-router)[\\/]/ },
              { name: 'motion', test: /node_modules[\\/](motion|framer-motion|motion-dom|motion-utils|lenis)[\\/]/ },
              { name: 'radix', test: /node_modules[\\/]@radix-ui[\\/]/ },
              { name: 'forms', test: /node_modules[\\/](zod|react-hook-form|@hookform)[\\/]/ },
            ],
          },
        },
      },
    },
  }
})
