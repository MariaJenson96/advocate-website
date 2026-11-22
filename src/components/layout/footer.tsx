import { Link } from 'react-router'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { legalDisclaimer, navLinks, site } from '@/config/site'
import { offeredPracticeAreas } from '@/data/practice-areas'
import { NavAnchor } from '@/components/common/nav-anchor'

function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="eyebrow mb-6 flex items-center gap-3 text-gold">
      <span className="h-px w-6 bg-gold" aria-hidden="true" />
      {children}
    </h2>
  )
}

const linkClass = 'gold-underline text-sm text-white/65 transition-colors duration-300 hover:text-white'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative overflow-hidden border-t border-gold/25 bg-black">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-24 select-none font-display text-[16rem] leading-none text-outline-gold sm:text-[22rem] lg:text-[28rem]">
        {site.initials}
      </div>

      <div className="container-luxe relative">
        <div className="grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex flex-col items-start gap-5" aria-label={`${site.firmName} — home`}>
              <img src={site.logo.full} alt={site.firmName} width={795} height={785} loading="lazy" decoding="async" className="h-28 w-auto" />
              <span className="flex flex-col">
                <span className="font-display text-2xl font-semibold text-white">{site.displayName}</span>
                <span className="eyebrow mt-1.5 text-[0.6rem] text-gold">{site.designation}</span>
              </span>
            </Link>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-white/60">{site.description}</p>
            <p className="mt-5 text-xs text-white/45">
              Enrolled with the {site.bar.council} · {site.bar.enrolmentNo}
            </p>
            {site.social.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-gold">
                      {s.label}
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <FooterHeading>Navigate</FooterHeading>
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <NavAnchor section={l.id} className={linkClass}>
                    {l.label}
                  </NavAnchor>
                </li>
              ))}
              <li>
                <NavAnchor section="gallery" className={linkClass}>
                  Gallery
                </NavAnchor>
              </li>
              <li>
                <NavAnchor section="appointment" className={linkClass}>
                  Book Appointment
                </NavAnchor>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <FooterHeading>Practice Areas</FooterHeading>
            <ul className="flex flex-col gap-3.5">
              {offeredPracticeAreas.map((p) => (
                <li key={p.slug}>
                  <Link to={`/practice-areas/${p.slug}`} className={linkClass}>
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <ul className="flex flex-col gap-5 text-sm text-white/65">
              <li className="flex gap-3.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <address className="not-italic leading-relaxed">
                  {site.contact.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              <li className="flex gap-3.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`tel:${site.contact.phoneHref}`} className={linkClass}>
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex gap-3.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a href={`mailto:${site.contact.email}`} className={`${linkClass} break-all`}>
                  {site.contact.email}
                </a>
              </li>
              <li className="flex gap-3.5">
                <Clock className="mt-0.5 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>
                  {site.contact.hours[0].days}
                  <br />
                  {site.contact.hours[0].time}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="rule-diamond" aria-hidden="true" />

        <div className="py-10">
          <p className="max-w-4xl text-xs leading-relaxed text-white/50">
            <span className="eyebrow mr-2 text-[0.6rem] text-gold">Disclaimer</span>
            {legalDisclaimer} In accordance with the rules of the Bar Council of India, this website is not intended to solicit work or advertise. Visitors access it of their own accord.
          </p>
          <div className="mt-8 flex flex-col gap-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {site.firmName} · {site.displayName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              <li>
                <Link to="/privacy-policy" className="gold-underline hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="gold-underline hover:text-white">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="gold-underline hover:text-white">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
