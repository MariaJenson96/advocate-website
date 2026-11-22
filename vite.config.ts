import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
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

const SERVER_ENV_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'ENQUIRY_TO', 'ALLOWED_ORIGINS']

/**
 * Runs api/enquiry.ts under `npm run dev`, mirroring the Vercel Function,
 * so the real email delivery can be tested locally using values from .env.
 */
function localApi(env: Record<string, string>): Plugin {
  return {
    name: 'advocate-local-api',
    apply: 'serve',
    configureServer(server: ViteDevServer) {
      for (const key of SERVER_ENV_KEYS) if (env[key]) process.env[key] = env[key]
      server.middlewares.use('/api/enquiry', async (req, res) => {
        try {
          const mod = await server.ssrLoadModule('/api/enquiry.ts')
          const chunks: Buffer[] = []
          for await (const chunk of req) chunks.push(chunk as Buffer)
          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v)
          const request = new Request('http://localhost/api/enquiry', {
            method: req.method,
            headers,
            body: req.method === 'POST' ? Buffer.concat(chunks).toString() : undefined,
          })
          const response: Response = await (req.method === 'POST' ? mod.POST(request) : mod.GET())
          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(await response.text())
        } catch (err) {
          server.config.logger.error(String(err))
          res.statusCode = 500
          res.end(JSON.stringify({ ok: false }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || site.url
  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl), localApi(env)],
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
