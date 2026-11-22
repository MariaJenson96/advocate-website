// Renders public/og-image.png (1200×630, the social-share preview) from the
// logo, portrait and site fonts using Playwright Chromium.
// Run: node scripts/make-og-image.cjs
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')
const b64 = (p) => fs.readFileSync(path.join(root, p)).toString('base64')
const font = (p) => `url(data:font/woff2;base64,${b64(p)})`

const html = `<!doctype html><html><head><style>
@font-face { font-family: 'Cormorant'; src: ${font('node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2')}; }
@font-face { font-family: 'Cormorant'; font-style: italic; src: ${font('node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2')}; }
@font-face { font-family: 'Inter'; src: ${font('node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')}; font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #080808; color: #fff; font-family: Inter; position: relative; overflow: hidden;
  background-image: linear-gradient(to right, rgba(197,162,83,.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(197,162,83,.06) 1px, transparent 1px);
  background-size: 60px 60px; }
.frame { position: absolute; inset: 28px; border: 1px solid rgba(197,162,83,.4); }
.text { position: absolute; left: 80px; top: 92px; width: 640px; }
.logo { height: 150px; }
h1 { font-family: Cormorant; font-weight: 500; font-size: 76px; line-height: 1; margin-top: 34px; }
.role { color: #C5A253; font-size: 17px; letter-spacing: .32em; font-weight: 600; margin-top: 18px; text-transform: uppercase; }
.rule { width: 260px; height: 1px; background: #C5A253; margin: 30px 0 24px; }
.tag { font-family: Cormorant; font-style: italic; font-size: 32px; color: rgba(255,255,255,.82); }
.photo { position: absolute; right: 70px; top: 70px; width: 360px; height: 490px; border-radius: 180px 180px 0 0; overflow: hidden; border: 1px solid rgba(197,162,83,.5); }
.photo img { width: 100%; height: 100%; object-fit: cover; object-position: top; filter: grayscale(1); }
.offset { position: absolute; right: 52px; top: 88px; width: 360px; height: 490px; border-radius: 180px 180px 0 0; border: 1px solid rgba(197,162,83,.7); }
</style></head><body>
<div class="frame"></div>
<div class="text">
  <img class="logo" src="data:image/png;base64,${b64('public/images/logo-mark.png')}">
  <h1>Adv. Sekin Shiju</h1>
  <div class="role">SS Legal Firm · Nagercoil</div>
  <div class="rule"></div>
  <div class="tag">Committed to Justice. Dedicated to Your Rights.</div>
</div>
<div class="offset"></div>
<div class="photo"><img src="data:image/webp;base64,${b64('public/images/sekin-shiju-portrait.webp')}"></div>
</body></html>`

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.setContent(html)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: path.join(root, 'public/og-image.png') })
  await browser.close()
  console.log('public/og-image.png written')
})()
