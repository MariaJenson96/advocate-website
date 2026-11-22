import { legalDisclaimer, site } from '@/config/site'
import { Seo } from '@/components/common/seo'
import { PageHeader } from '@/components/common/page-header'

type LegalKind = 'privacy' | 'terms' | 'disclaimer'

/**
 * TEMPLATE LEGAL TEXT — must be reviewed and adapted by the advocate
 * (including for the Digital Personal Data Protection Act, 2023) before publishing.
 */
const content: Record<LegalKind, { title: string; path: string; intro: string; sections: { h: string; p: string[] }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    path: '/privacy-policy',
    intro: 'How information shared through this website is collected, used and protected.',
    sections: [
      { h: 'Information we collect', p: ['When you submit the appointment enquiry form, we collect the details you provide: your name, phone number, email address, the service you are interested in, your preferred date and contact method, and a brief description of your requirement.', 'We do not ask you to upload documents or share confidential case details through this website.'] },
      { h: 'How we use it', p: ['Your information is used only to respond to your enquiry, schedule a consultation and communicate with you about it. It is not sold, rented or used for marketing.'] },
      { h: 'Service providers', p: ['Enquiries are delivered to the office through [name of form service / hosting provider]. These providers process data only on our instructions.'] },
      { h: 'Retention and security', p: ['Enquiry information is retained only for as long as necessary for the purpose for which it was collected, or as required by law. Reasonable technical and organisational measures are used to protect it.'] },
      { h: 'Your rights', p: [`You may request access to, correction of, or deletion of your personal data by writing to ${site.contact.email}.`] },
      { h: 'Cookies and storage', p: ['This website stores a single preference in your browser to remember that you have accepted the disclaimer. [Add details of any analytics tools, if used.]'] },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    path: '/terms',
    intro: 'The terms on which this website is made available.',
    sections: [
      { h: 'Use of this website', p: ['This website is provided for general information about the advocate and the areas of practice. By using it, you agree to these terms.'] },
      { h: 'No legal advice', p: [legalDisclaimer, 'You should not act or refrain from acting on the basis of any content on this website without seeking specific legal advice.'] },
      { h: 'No advocate-client relationship', p: ['Contacting the office through this website, by email, phone or WhatsApp does not by itself create an advocate-client relationship. Such a relationship is formed only upon express confirmation of engagement.'] },
      { h: 'Intellectual property', p: [`The content of this website is the property of ${site.displayName} unless otherwise stated, and may not be reproduced without permission.`] },
      { h: 'External links', p: ['Links to third-party websites are provided for convenience only. No responsibility is accepted for their content.'] },
      { h: 'Governing law', p: ['These terms are governed by the laws of India. Courts at [City] shall have exclusive jurisdiction.'] },
    ],
  },
  disclaimer: {
    title: 'Disclaimer',
    path: '/disclaimer',
    intro: 'In accordance with the rules of the Bar Council of India.',
    sections: [
      { h: 'Bar Council of India rules', p: ['The Bar Council of India does not permit advocates to solicit work or advertise. This website is not intended to be, and should not be construed as, an advertisement, solicitation, invitation or inducement of any sort.', 'By accessing this website you acknowledge that you are seeking information of your own accord.'] },
      { h: 'General information only', p: [legalDisclaimer] },
      { h: 'Accuracy', p: ['While care is taken to keep information accurate and current, no warranty is given as to its completeness or accuracy. Articles state the date and jurisdiction to which they relate.'] },
    ],
  },
}

export function LegalPage({ kind }: { kind: LegalKind }) {
  const c = content[kind]
  return (
    <>
      <Seo title={c.title} description={c.intro} path={c.path} />
      <PageHeader eyebrow="Legal" title={c.title} intro={c.intro} crumbs={[{ label: 'Home', to: '/' }, { label: c.title }]} />
      <section className="section-pad bg-white text-black">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            <p className="border-l-2 border-gold pl-5 text-sm text-black/55">Template text — to be reviewed and approved by the advocate before publishing. Last updated: [Date].</p>
            <div className="mt-12 space-y-12">
              {c.sections.map((s, i) => (
                <div key={s.h}>
                  <h2 className="flex items-baseline gap-4 font-display text-3xl">
                    <span className="font-sans text-xs tracking-[0.2em] text-gold">{String(i + 1).padStart(2, '0')}</span>
                    {s.h}
                  </h2>
                  <div className="mt-4 space-y-4 leading-[1.85] text-black/70">
                    {s.p.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
