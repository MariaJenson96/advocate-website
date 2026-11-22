// Renders og-image.png and apple-touch-icon.png from SVG using Playwright Chromium.
// Run after generate-placeholders.py: node scripts/rasterize-icons.cjs
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const b = await chromium.launch();
  const jobs = [
    ['scripts/og-source.svg', 'public/og-image.png', 1200, 630],
    ['public/favicon.svg', 'public/apple-touch-icon.png', 180, 180],
  ];
  for (const [src, out, w, h] of jobs) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const svg = fs.readFileSync(src, 'utf8').replace('<svg ', `<svg width="${w}" height="${h}" `);
    await p.setContent(`<html><body style="margin:0">${svg}</body></html>`);
    await p.screenshot({ path: out, clip: { x: 0, y: 0, width: w, height: h } });
  }
  await b.close();
})();
