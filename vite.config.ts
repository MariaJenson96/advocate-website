import { defineConfig, loadEnv, runnerImport, type Plugin, type PreviewServer, type ViteDevServer } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
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

type ApiModule = { POST: (req: Request) => Promise<Response>; GET: () => Response }
type Middleware = (req: IncomingMessage, res: ServerResponse) => Promise<void>

/** Bridges a Node request to the Web-standard handler in api/enquiry.ts */
function apiMiddleware(load: () => Promise<ApiModule>, log: (msg: string) => void): Middleware {
  return async (req, res) => {
    try {
      const mod = await load()
      const chunks: Buffer[] = []
      for await (const chunk of req) chunks.push(chunk as Buffer)
      const headers = new Headers()
      for (const [k, v] of Object.entries(req.headers)) if (typeof v === 'string') headers.set(k, v)
      const request = new Request('http://localhost/api/enquiry', {
        method: req.method,
        headers,
        body: req.method === 'POST' ? Buffer.concat(chunks).toString() : undefined,
      })
      const response = await (req.method === 'POST' ? mod.POST(request) : mod.GET())
      res.statusCode = response.status
      response.headers.forEach((value, key) => res.setHeader(key, value))
      res.end(await response.text())
    } catch (err) {
      log(String(err))
      res.statusCode = 500
      res.end(JSON.stringify({ ok: false }))
    }
  }
}

/**
 * Runs api/enquiry.ts locally — under `npm run dev` AND `npm run preview` /
 * `npm start` — so enquiry emails are really
 * sent on your own computer using the SMTP_* values from .env.
 */
function localApi(env: Record<string, string>): Plugin {
  const exposeEnv = (logger: { info: (m: string) => void; warn: (m: string) => void }) => {
    for (const key of SERVER_ENV_KEYS) if (env[key]) process.env[key] = env[key]
    // Startup report so a missing or misnamed .env is obvious (never prints the password)
    const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter((k) => !process.env[k])
    if (missing.length === 0) {
      logger.info(`  ✉  Enquiry email: ON — sending as ${process.env.SMTP_USER} via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT || 465}`)
    } else {
      logger.warn(
        `  ✉  Enquiry email: OFF — missing ${missing.join(', ')}.\n` +
          `     Put them in a file named exactly ".env" in ${process.cwd()} and restart.`,
      )
    }
  }
  return {
    name: 'advocate-local-api',
    configureServer(server: ViteDevServer) {
      exposeEnv(server.config.logger)
      const load = () => server.ssrLoadModule('/api/enquiry.ts') as Promise<ApiModule>
      server.middlewares.use('/api/enquiry', apiMiddleware(load, (m) => server.config.logger.error(m)))
    },
    configurePreviewServer(server: PreviewServer) {
      exposeEnv(server.config.logger)
      let cached: Promise<ApiModule> | undefined
      const load = () =>
        (cached ??= runnerImport<ApiModule>(fileURLToPath(new URL('./api/enquiry.ts', import.meta.url))).then((r) => r.module))
      server.middlewares.use('/api/enquiry', apiMiddleware(load, (m) => server.config.logger.error(m)))
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
