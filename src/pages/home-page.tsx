import { site } from '@/config/site'
import { offeredPracticeAreas } from '@/data/practice-areas'
import { JsonLd, Seo, absoluteUrl } from '@/components/common/seo'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { PracticeAreas } from '@/components/sections/practice-areas'
import { Gallery } from '@/components/sections/gallery'
import { Experience } from '@/components/sections/experience'
import { Approach } from '@/components/sections/approach'
import { ArticlesPreview } from '@/components/sections/articles-preview'
import { Faq } from '@/components/sections/faq'
import { Appointment } from '@/components/sections/appointment'
import { Contact } from '@/components/sections/contact'

export function HomePage() {
  return (
    <>
      <Seo path="/" />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'LegalService',
          name: site.displayName,
          description: site.description,
          url: absoluteUrl('/'),
          image: absoluteUrl('/og-image.png'),
          telephone: site.contact.phoneHref,
          email: site.contact.email,
          address: { '@type': 'PostalAddress', streetAddress: site.contact.address.join(', '), addressCountry: 'IN' },
          areaServed: site.jurisdiction,
          knowsAbout: offeredPracticeAreas.map((p) => p.title),
          founder: { '@type': 'Person', name: site.name, jobTitle: site.designation },
        }}
      />
      <Hero />
      <About />
      <PracticeAreas />
      <Gallery />
      <Experience />
      <Approach />
      <ArticlesPreview />
      <Faq />
      <Appointment />
      <Contact />
    </>
  )
}
