import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { site } from '@/config/site'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'
import { Button } from '@/components/ui/button'

const q = encodeURIComponent(site.contact.mapQuery)
const mapEmbed = `https://www.google.com/maps?q=${q}&output=embed`
const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`
const whatsapp = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent('Hello, I would like to schedule a legal consultation.')}`

export function Contact() {
  const cards = [
    {
      icon: MapPin,
      label: 'Office Address',
      content: (
        <address className="not-italic">
          {site.contact.address.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </address>
      ),
    },
    {
      icon: Phone,
      label: 'Contact Number',
      content: (
        <a href={`tel:${site.contact.phoneHref}`} className="gold-underline">
          {site.contact.phone}
        </a>
      ),
    },
    {
      icon: Mail,
      label: 'Email',
      content: (
        <a href={`mailto:${site.contact.email}`} className="gold-underline break-all">
          {site.contact.email}
        </a>
      ),
    },
    {
      icon: Clock,
      label: 'Office Hours',
      content: (
        <dl className="space-y-1.5">
          {site.contact.hours.map((h) => (
            <div key={h.days}>
              <dt className="text-black">{h.days}</dt>
              <dd className="text-sm text-black/55">{h.time}</dd>
            </div>
          ))}
        </dl>
      ),
    },
  ]

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad bg-white text-black">
      <div className="container-luxe">
        <SectionHeading
          id="contact-title"
          tone="light"
          eyebrow="Office & Contact"
          title={
            <>
              Let’s Discuss Your <span className="italic">Legal Requirements</span>
            </>
          }
          intro="Visits are by appointment. Reach the office by phone, email or WhatsApp during working hours."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-12">
          <Reveal as="ul" staggerChildren={0.08} className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 xl:grid-cols-2">
            {cards.map(({ icon: Icon, label, content }) => (
              <RevealItem as="li" key={label} className="bg-white p-7">
                <span className="grid size-11 place-items-center border border-gold text-gold">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="eyebrow mt-5 text-[0.62rem] text-black/55">{label}</h3>
                <div className="mt-3 font-display text-lg leading-snug text-black">{content}</div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="flex flex-col lg:col-span-7">
            <div className="relative min-h-[22rem] flex-1 overflow-hidden border border-black/10 bg-black">
              <iframe
                title={`Map showing the office location of ${site.displayName}`}
                src={mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-mono absolute inset-0 size-full border-0"
                allowFullScreen
              />
              <span aria-hidden="true" className="pointer-events-none absolute inset-3 border border-gold/40" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Button asChild variant="dark">
                <a href={directions} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-4" aria-hidden="true" /> Get Directions
                </a>
              </Button>
              <Button asChild variant="light">
                <a href={`tel:${site.contact.phoneHref}`}>
                  <Phone className="size-4" aria-hidden="true" /> Call Now
                </a>
              </Button>
              <Button asChild variant="light">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
