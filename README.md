# Advocate & Legal Consultant — Website

A premium, fully responsive website for an Advocate / Legal Consultant, built with React, TypeScript and Vite. It uses a strict three-colour brand: **Black `#080808`**, **Gold `#C5A253`** and **White `#FFFFFF`**.

> ⚠️ **Before publishing:** every advocate detail on this site is a **placeholder**. Replace everything marked `PLACEHOLDER` or written in `[square brackets]` with verified information supplied by the advocate (see [Content checklist](#content-checklist-before-launch)).

---

## Quick start

```bash
npm install
cp .env.example .env      # then edit values
npm run dev               # http://localhost:5173
npm run build             # type-check + production build → dist/
npm run preview           # serve the production build locally
```

Requires Node 20.19+ (tested on Node 22).

## Tech stack

| Concern | Library |
|---|---|
| Framework | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v4 (design tokens in CSS), shadcn/ui patterns (`cva`, `cn`) |
| Accessible primitives | Radix UI: Dialog (mobile menu, disclaimer), Accordion (FAQ), Select (form) |
| Animation | Motion (`motion/react`): reveals, staggers, menu & page transitions |
| Smooth scroll | Lenis (disabled automatically for reduced-motion users) |
| Icons | Lucide React |
| Routing | React Router (data router, lazy-loaded inner pages) |
| Forms | React Hook Form + Zod |
| Fonts | Self-hosted via Fontsource: Cormorant Garamond (headings), Inter (body) |

GSAP was not needed: every effect (line-by-line text reveal, staggered cards, timeline draw, menu clip-path) is handled by Motion, which keeps the bundle smaller.

## Folder structure

```
src/
├── config/site.ts            ← ALL advocate details (name, bar enrolment, contact, toggles)
├── data/                     ← editable content
│   ├── practice-areas.ts       (set `offered: false` to hide a service)
│   ├── experience.ts           (timeline — placeholders only)
│   ├── articles.ts             (sample articles, `reviewed` flag)
│   ├── gallery.ts              (gallery photos & captions)
│   ├── faqs.ts                 (draft answers)
│   └── approach.ts
├── styles/
│   ├── theme.css             ← design tokens (colours, type scale, radius, shadows, motion)
│   ├── animations.css        ← keyframes + reduced-motion overrides
│   └── global.css            ← base styles, utilities, article typography
├── lib/
│   ├── enquiry.ts            ← form submission integration point
│   ├── enquiry-schema.ts     ← Zod validation rules
│   ├── motion.ts             ← shared easing / reveal variants
│   └── utils.ts              ← cn(), date formatting, safe storage
├── components/
│   ├── ui/                   ← Button, Input/Textarea/Field, Select, Accordion
│   ├── common/               ← Seo, JsonLd, Reveal, SectionHeading, PageHeader, Monogram, NavAnchor
│   ├── layout/               ← Header, MobileMenu, Footer, DisclaimerGate, SmoothScroll, ScrollManager
│   ├── sections/             ← Hero, About, PracticeAreas, Gallery, Experience, Approach, ArticlesPreview, Faq, Appointment, Contact
│   └── articles/ArticleCard.tsx
└── pages/                    ← Home, Articles, ArticleDetail, PracticeArea, Legal (privacy/terms/disclaimer), 404
public/images/                ← placeholder artwork (replace with real photography)
scripts/                      ← placeholder-art generators
```

## Routes

| Path | Page |
|---|---|
| `/` | Home: Hero → About → Practice Areas → Gallery → Experience → Approach → Articles → FAQ → Appointment → Contact |
| `/practice-areas/:slug` | Practice area detail |
| `/articles` | Articles listing with search, category filter and pagination (state kept in the URL, e.g. `?q=will&category=Documentation&page=2`) |
| `/articles/:slug` | Article detail with related articles |
| `/privacy-policy`, `/terms`, `/disclaimer` | Legal pages (template text) |

## Design system

- **Colour:** Tailwind's default palette is removed (`--color-*: initial` in `theme.css`), so only `black`, `gold` and `white` exist as utilities. Variation comes only from opacity (`text-white/70`, `border-gold/30`). Links, focus rings, text selection, autofill, scrollbars, the date picker icon and the map embed (desaturated with `map-mono`) are all themed.
- **Typography:** fluid tokens `text-display`, `text-h1`, `text-h2`, `text-h3`, plus the `eyebrow` utility for uppercase labels. Serif headings, sans body.
- **Layout:** `container-luxe` (mobile-first gutters, widens at 2K and 4K) and `section-pad` (vertical rhythm). Extra breakpoints `xs` (352px), `3xl` (1792px) and `4xl` (2400px).
- **Sections alternate** black and white for contrast. Gold is used only decoratively on white, because gold text on white fails WCAG contrast.
- **No inline styles:** there is no `style={{}}` anywhere. All styling is Tailwind classes plus the three CSS files.

### Animation patterns
`Reveal` / `RevealItem` give fade-and-slide-up on scroll, with optional staggering. The hero reveals its heading line by line through masks. Buttons use a hover "wipe". Gold underlines animate on links. Cards zoom their images subtly. The experience timeline draws its gold line in. `MotionConfig reducedMotion="user"`, a CSS `prefers-reduced-motion` block and a Lenis opt-out together respect the visitor's motion settings.

## Enquiry form: connect a backend

The form validates the name, phone (10–15 digits), email, service, a date from today onward, contact method, description length and consent. It has a spam honeypot, a loading state, a success state and an error state.

**It is not functional until an endpoint is set:**

```bash
# .env
VITE_ENQUIRY_ENDPOINT=https://formspree.io/f/your-id   # or your own HTTPS API
```

`src/lib/enquiry.ts` POSTs JSON (`fullName, phone, email, service, preferredDate, contactMethod, message, consent, submittedAt, source`) and treats any 2xx response as success. Without an endpoint:
- **development** simulates success, and the success panel says so;
- **production** shows an error asking visitors to call or email instead.

Visitors are told not to submit confidential details or documents. Keep it that way, and if you build your own API, serve it over HTTPS with rate limiting.

## SEO

- Per-page `<title>`, description, canonical URL, Open Graph and Twitter tags through `<Seo />` (React 19 places them in `<head>`).
- `sitemap.xml` and `robots.txt` are **generated at build time** from the same data as the pages (see `vite.config.ts`). Set `VITE_SITE_URL` before building.
- Schema.org JSON-LD (`LegalService` on home, `Article` on posts) is emitted **only** when `site.structuredData.enabled = true`. Turn it on only once the details are real.
- Semantic landmarks, one `h1` per page, ordered headings, lazy-loaded images with explicit dimensions, self-hosted fonts and code-split routes.
- This is a client-rendered SPA. Google renders JavaScript, but for the best results on other crawlers and social previews, consider pre-rendering (e.g. `vite-plugin-prerender` or a migration to React Router framework mode with `prerender`).

## Deployment

Any static host works. SPA fallbacks are included: `vercel.json` for Vercel and `public/_redirects` for Netlify. Set `VITE_SITE_URL` and `VITE_ENQUIRY_ENDPOINT` in the host's environment settings.

## Accessibility

Skip link, visible gold focus rings, keyboard-operable menu, accordion, select and radio group, labelled form fields with `aria-invalid` and linked error messages, `aria-live` result messages, alt text on all images, and reduced-motion support.

## Content checklist (before launch)

- [ ] `src/config/site.ts`: the **office address is a sample** (Court Road, Nagercoil) — replace it and the map query; confirm the bar council, then fill in the enrolment number and year, education, courts, languages, phone, WhatsApp, email, address, map query, hours, social links, `url`
- [ ] `index.html`: fallback `<title>` and description use the real name
- [ ] Replace `public/images/advocate-portrait.svg` and `advocate-about.svg` with **authentic photographs** (WebP or AVIF, about 1200×1500 and 900×1100). Update the `src` paths if the extension changes.
- [ ] Gallery: replace the six placeholders in `public/images/gallery/` with authentic photographs of the advocate and update `src/data/gallery.ts` (captions, alt text, width/height). Avoid courtroom interiors, where photography is generally not permitted.
- [ ] Replace article images in `public/images/articles/` (or keep the abstract artwork)
- [ ] Regenerate `public/og-image.png` (1200×630) and the favicon with the real name and initials (`scripts/`)
- [ ] `src/data/experience.ts`: verified timeline only. Remove any entry that doesn't apply.
- [ ] `src/data/practice-areas.ts`: set `offered` to match the services actually provided
- [ ] `src/components/sections/about.tsx`: replace the bracketed biography text
- [ ] `src/components/sections/hero.tsx`: check the three facts under the buttons
- [ ] `src/data/faqs.ts`: advocate approves every answer
- [ ] `src/data/articles.ts`: advocate reviews each article, confirms jurisdiction and dates, then sets `reviewed: true` (this removes the "Draft — pending review" notice)
- [ ] Legal pages (`src/pages/legal-page.tsx`): adapt the privacy policy (including the Digital Personal Data Protection Act, 2023), terms and disclaimer, then fill in `[Date]`, `[City]` and the form service name
- [ ] Disclaimer gate wording approved (toggle: `site.disclaimerGate.enabled`)
- [ ] `VITE_ENQUIRY_ENDPOINT` configured and a test enquiry received
- [ ] `site.structuredData.enabled = true` once all details are verified

### Professional-conduct note (India)
Bar Council of India Rules (Part VI, Chapter II, Rule 36) restrict advertising and solicitation by advocates. This site includes a consent disclaimer, avoids testimonials, statistics, awards and outcome claims, and states that no outcome is guaranteed. The advocate should still review the overall presentation, including the "Book Appointment" calls to action, against current rules before publishing.
