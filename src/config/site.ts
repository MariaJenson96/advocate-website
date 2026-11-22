/**
 * ============================================================================
 *  SITE CONFIGURATION — the single source of truth for the advocate's details
 * ============================================================================
 *  ⚠️  Every value below marked `PLACEHOLDER`, or written inside [square
 *  brackets], is NOT real information. Replace it with verified details
 *  supplied by the advocate before publishing. Do not publish invented
 *  credentials, years of practice, court appearances or awards.
 * ============================================================================
 */

export const site = {
  /** Production URL, no trailing slash. Can also be set with VITE_SITE_URL. */
  url: 'https://www.example.com', // PLACEHOLDER

  /** Advocate identity */
  name: 'Sekin Shiju',
  displayName: 'Adv. Sekin Shiju',
  initials: 'SS', // used for the monogram logo
  designation: 'Advocate & Legal Consultant',
  jurisdiction: 'India',
  locale: 'en_IN',

  description:
    'Strategic legal guidance, professional representation and trusted legal solutions — delivered with integrity, clarity and commitment.',

  /** Bar Council enrolment */
  bar: {
    council: 'Bar Council of Tamil Nadu & Puducherry', // CONFIRM with the advocate's enrolment certificate
    enrolmentNo: '[Enrolment No. XXXX/YYYY]', // PLACEHOLDER
    enrolledYear: '[Year]', // PLACEHOLDER
  },

  /** Education — list only verified qualifications */
  education: [
    { degree: 'LL.B.', institution: '[University / Law School Name]', year: '[Year]' }, // PLACEHOLDER
    { degree: '[LL.M. / B.A. LL.B. / other]', institution: '[University Name]', year: '[Year]' }, // PLACEHOLDER
  ],

  /** Courts / forums of practice — list only where the advocate actually appears */
  courts: ['[District Court, Nagercoil]', '[Madurai Bench of the Madras High Court]', '[Consumer Commission, Kanyakumari]'], // PLACEHOLDER — confirm
  languages: ['English', 'Tamil', '[Malayalam]'], // PLACEHOLDER — confirm

  /** Office & contact — use verified details only */
  contact: {
    phone: '+91 00000 00000', // PLACEHOLDER — shown to visitors
    phoneHref: '+910000000000', // PLACEHOLDER — digits for tel: links
    whatsapp: '910000000000', // PLACEHOLDER — country code + number, digits only
    email: 'contact@example.com', // PLACEHOLDER
    // SAMPLE ADDRESS — invented for design purposes. Replace with the real office address.
    address: ['No. 14, Advocates’ Chambers, Court Road', 'Near District Court Complex, Nagercoil', 'Kanyakumari District, Tamil Nadu – 629001'],
    /** Text used for the Google Maps embed and directions link */
    mapQuery: 'District Court, Nagercoil, Tamil Nadu 629001', // REPLACE with the exact office address
    hours: [
      { days: 'Monday – Friday', time: '10:00 AM – 6:00 PM' }, // PLACEHOLDER
      { days: 'Saturday', time: '10:00 AM – 2:00 PM (by appointment)' }, // PLACEHOLDER
      { days: 'Sunday & Court Holidays', time: 'Closed' },
    ],
  },

  /** Social profiles — leave the array empty to hide the block */
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' }, // PLACEHOLDER
  ],

  /**
   * Bar Council of India rules restrict advertising and solicitation by
   * advocates. When enabled, visitors must acknowledge a disclaimer before
   * viewing the site. Review the wording with the advocate.
   */
  disclaimerGate: { enabled: true, storageKey: 'advocate-disclaimer-accepted-v1' },

  /**
   * Schema.org structured data is emitted only when this is true.
   * Turn it on once the name, address and contact details above are real.
   */
  structuredData: { enabled: false },
} as const

export const legalDisclaimer =
  'The information provided on this website is for general informational purposes only and does not constitute legal advice or establish an advocate-client relationship.'

export const navLinks = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Practice Areas', id: 'practice' },
  { label: 'Experience', id: 'experience' },
  { label: 'Articles', id: 'articles' },
  { label: 'Contact', id: 'contact' },
] as const

export type SectionId = (typeof navLinks)[number]['id'] | 'gallery' | 'approach' | 'faq' | 'appointment'
