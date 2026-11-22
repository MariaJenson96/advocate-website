/**
 * Legal articles — SAMPLE CONTENT.
 * Each article must be reviewed by the advocate, have its jurisdiction and
 * dates confirmed, and then be marked `reviewed: true`. Unreviewed articles
 * display a visible "pending review" notice.
 */
export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }

export interface Article {
  slug: string
  title: string
  category: ArticleCategory
  excerpt: string
  /** ISO date (YYYY-MM-DD) */
  published: string
  updated?: string
  readMinutes: number
  jurisdiction: string
  image: string
  imageAlt: string
  reviewed: boolean
  body: ArticleBlock[]
}

export const articleCategories = [
  'Property Law',
  'Citizen Rights',
  'Family Law',
  'Consumer Law',
  'Civil Litigation',
  'Documentation',
  'Criminal Law',
] as const
export type ArticleCategory = (typeof articleCategories)[number]

export const articles: Article[] = [
  {
    slug: 'understanding-property-rights',
    title: 'Understanding Property Rights: What Every Buyer Should Verify',
    category: 'Property Law',
    excerpt: 'Before you sign an agreement to purchase property, a careful review of title, encumbrances and approvals can prevent years of litigation.',
    published: '2026-10-28',
    readMinutes: 6,
    jurisdiction: 'India',
    image: '/images/articles/property.svg',
    imageAlt: 'Abstract gold line drawing of classical columns',
    reviewed: false,
    body: [
      { type: 'p', text: 'Buying immovable property is one of the most significant financial decisions most people make. Many property disputes arise not because of fraud, but because essential documents were never verified before the purchase. A methodical review at the outset protects both your investment and your peace of mind.' },
      { type: 'h2', text: 'Start with the title' },
      { type: 'p', text: 'The seller must have clear and marketable title. This is usually established by tracing the chain of title documents — previous sale deeds, gift deeds, partition deeds or succession documents — over a reasonable period, commonly thirty years.' },
      { type: 'ul', items: ['Certified copies of previous title deeds from the Sub-Registrar’s office', 'An encumbrance certificate to check for registered mortgages or charges', 'Revenue and mutation records showing the current recorded owner', 'Up-to-date property tax receipts'] },
      { type: 'h2', text: 'Registration and stamp duty' },
      { type: 'p', text: 'Under the Registration Act, 1908, documents transferring ownership of immovable property above the prescribed value must be registered. Stamp duty is levied under state law and rates vary from state to state, so the applicable rate should be confirmed for the property’s location.' },
      { type: 'quote', text: 'A few weeks of due diligence before purchase can save years of litigation after it.' },
      { type: 'h2', text: 'Approvals for under-construction projects' },
      { type: 'p', text: 'For apartments in a real estate project, check whether the project is registered with the state Real Estate Regulatory Authority (RERA), and review the sanctioned building plan and the developer’s disclosures on the RERA portal.' },
      { type: 'p', text: 'Every transaction is different. A property-specific review by a qualified advocate is the most reliable way to identify risks before you commit.' },
    ],
  },
  {
    slug: 'legal-rights-every-citizen-should-know',
    title: 'Important Legal Rights Every Citizen Should Know',
    category: 'Citizen Rights',
    excerpt: 'From the right to information to safeguards on arrest, a short guide to the rights that protect you in everyday life.',
    published: '2026-10-14',
    readMinutes: 5,
    jurisdiction: 'India',
    image: '/images/articles/rights.svg',
    imageAlt: 'Abstract gold line drawing of an open book and a shield',
    reviewed: false,
    body: [
      { type: 'p', text: 'The Constitution of India guarantees fundamental rights to every person, and several statutes give practical effect to those guarantees. Knowing the basics helps you act with confidence when you need to.' },
      { type: 'h2', text: 'Life and personal liberty' },
      { type: 'p', text: 'Article 21 protects life and personal liberty, and has been interpreted by the courts to include many related rights such as privacy and dignity. No person can be deprived of these rights except according to procedure established by law.' },
      { type: 'h2', text: 'Safeguards on arrest' },
      { type: 'ul', items: ['The right to be informed of the grounds of arrest (Article 22)', 'The right to consult and be defended by a legal practitioner of your choice', 'The right to be produced before a magistrate within 24 hours of arrest, excluding travel time', 'The right to have a relative or friend informed of the arrest'] },
      { type: 'p', text: 'Procedural safeguards are now set out in the Bharatiya Nagarik Suraksha Sanhita, 2023, which replaced the Code of Criminal Procedure with effect from 1 July 2024.' },
      { type: 'h2', text: 'Right to information' },
      { type: 'p', text: 'The Right to Information Act, 2005 allows citizens to request information from public authorities, subject to specified exemptions. Applications are generally to be answered within thirty days.' },
      { type: 'h2', text: 'Free legal aid' },
      { type: 'p', text: 'Under the Legal Services Authorities Act, 1987, eligible persons may receive free legal services through legal services authorities at the national, state, district and taluk levels.' },
    ],
  },
  {
    slug: 'family-law-understanding-legal-procedures',
    title: 'Family Law: Understanding Legal Procedures',
    category: 'Family Law',
    excerpt: 'An overview of how matrimonial proceedings typically unfold, and why mediation is often the first step.',
    published: '2026-09-30',
    readMinutes: 6,
    jurisdiction: 'India',
    image: '/images/articles/family.svg',
    imageAlt: 'Abstract gold line drawing of interlocking circles',
    reviewed: false,
    body: [
      { type: 'p', text: 'Family disputes are deeply personal, and the legal process can feel daunting. Understanding the general shape of the procedure can make it easier to take considered decisions.' },
      { type: 'h2', text: 'Which law applies?' },
      { type: 'p', text: 'Marriage and divorce are governed by the personal law applicable to the parties — for example the Hindu Marriage Act, 1955 — or by the Special Marriage Act, 1954 where the marriage was solemnised or registered under it. The applicable law determines the available grounds and procedure.' },
      { type: 'h2', text: 'Divorce by mutual consent' },
      { type: 'p', text: 'Where both spouses agree, a joint petition may be filed. Under Section 13B of the Hindu Marriage Act, a waiting period applies between the first and second motions, which courts may waive in appropriate cases. Terms on maintenance, custody and property are usually settled in writing.' },
      { type: 'h2', text: 'Contested proceedings' },
      { type: 'ul', items: ['Filing of the petition before the Family Court or competent court', 'Service of notice and filing of a reply', 'Referral to mediation or counselling', 'Evidence and arguments where settlement is not reached', 'Judgment and decree'] },
      { type: 'quote', text: 'Where children are involved, their welfare remains the paramount consideration.' },
      { type: 'p', text: 'Family Courts established under the Family Courts Act, 1984 are required to make efforts towards settlement, which is why mediation is often encouraged early in the process.' },
    ],
  },
  {
    slug: 'consumer-protection-laws',
    title: 'Consumer Protection Laws: How to Seek Redress',
    category: 'Consumer Law',
    excerpt: 'Defective goods or deficient service? The Consumer Protection Act, 2019 offers a dedicated, three-tier forum for resolving complaints.',
    published: '2026-09-12',
    readMinutes: 5,
    jurisdiction: 'India',
    image: '/images/articles/consumer.svg',
    imageAlt: 'Abstract gold line drawing of balanced scales',
    reviewed: false,
    body: [
      { type: 'p', text: 'The Consumer Protection Act, 2019 strengthened the rights of consumers and created a three-tier system of Consumer Disputes Redressal Commissions at the district, state and national levels.' },
      { type: 'h2', text: 'Who is a consumer?' },
      { type: 'p', text: 'Broadly, a person who buys goods or avails of services for consideration, other than for resale or a commercial purpose, is a consumer. Purchases made online are expressly covered.' },
      { type: 'h2', text: 'Choosing the right commission' },
      { type: 'p', text: 'Jurisdiction depends on the value of the goods or services paid for. The pecuniary limits are notified by the Central Government and have been revised from time to time, so the current limits should be checked before filing.' },
      { type: 'h2', text: 'Before you file' },
      { type: 'ul', items: ['Preserve invoices, warranty cards and correspondence', 'Write to the seller or service provider setting out the grievance', 'Note the date the cause of action arose — complaints are ordinarily to be filed within two years', 'Consider whether online filing is available for your commission'] },
      { type: 'p', text: 'A well-documented complaint that clearly sets out the deficiency and the relief claimed stands the best chance of being decided efficiently.' },
    ],
  },
  {
    slug: 'understanding-civil-litigation',
    title: 'Understanding Civil Litigation: From Plaint to Decree',
    category: 'Civil Litigation',
    excerpt: 'A step-by-step look at the stages of a civil suit, and why limitation and documentation matter from day one.',
    published: '2026-08-26',
    readMinutes: 7,
    jurisdiction: 'India',
    image: '/images/articles/litigation.svg',
    imageAlt: 'Abstract gold line drawing of a classical courthouse facade',
    reviewed: false,
    body: [
      { type: 'p', text: 'Civil suits are governed principally by the Code of Civil Procedure, 1908. While every case is different, most suits move through a recognisable sequence of stages.' },
      { type: 'h2', text: 'The stages of a civil suit' },
      { type: 'ul', items: ['Institution of the suit by filing a plaint with the appropriate court fee', 'Issue of summons to the defendant', 'Filing of the written statement by the defendant', 'Framing of issues by the court', 'Evidence of both parties, including cross-examination', 'Final arguments, judgment and decree', 'Execution, if the decree is not voluntarily complied with'] },
      { type: 'h2', text: 'Limitation' },
      { type: 'p', text: 'The Limitation Act, 1963 prescribes time limits for filing suits. A suit filed after the limitation period may be dismissed even if the claim is otherwise valid, which is why timely advice is essential.' },
      { type: 'h2', text: 'Commercial disputes' },
      { type: 'p', text: 'For commercial disputes of specified value, the Commercial Courts Act, 2015 requires pre-institution mediation in suits that do not contemplate urgent interim relief, and imposes stricter timelines for pleadings.' },
      { type: 'quote', text: 'Strong cases are built on strong documents. Preserve every record from the very beginning.' },
    ],
  },
  {
    slug: 'legal-documentation-and-agreements',
    title: 'Legal Documentation and Agreements: Getting the Basics Right',
    category: 'Documentation',
    excerpt: 'Stamping, registration and clear drafting — the three foundations of an enforceable agreement.',
    published: '2026-08-08',
    readMinutes: 5,
    jurisdiction: 'India',
    image: '/images/articles/documents.svg',
    imageAlt: 'Abstract gold line drawing of layered documents and a pen nib',
    reviewed: false,
    body: [
      { type: 'p', text: 'Under the Indian Contract Act, 1872, an agreement is enforceable when it is made with free consent by competent parties, for a lawful consideration and a lawful object. But enforceability in practice also depends on form.' },
      { type: 'h2', text: 'Stamp duty' },
      { type: 'p', text: 'Many instruments must be stamped under the applicable stamp law. An insufficiently stamped document may not be admissible in evidence until the deficit duty and penalty are paid.' },
      { type: 'h2', text: 'Registration' },
      { type: 'p', text: 'Certain documents — such as those transferring interests in immovable property, and leases beyond the prescribed duration — must be registered under the Registration Act, 1908. Notarisation is not a substitute for registration where registration is compulsory.' },
      { type: 'h2', text: 'Drafting essentials' },
      { type: 'ul', items: ['Accurate identification of the parties', 'Precise description of obligations, timelines and payments', 'Termination, default and dispute-resolution clauses', 'Governing law and jurisdiction'] },
    ],
  },
  {
    slug: 'cheque-dishonour-section-138',
    title: 'Cheque Dishonour: An Overview of Section 138',
    category: 'Criminal Law',
    excerpt: 'The strict timelines that apply when a cheque is returned unpaid, and what both payees and drawers should know.',
    published: '2026-07-22',
    readMinutes: 4,
    jurisdiction: 'India',
    image: '/images/articles/cheque.svg',
    imageAlt: 'Abstract gold line drawing of a document with a seal',
    reviewed: false,
    body: [
      { type: 'p', text: 'Section 138 of the Negotiable Instruments Act, 1881 makes the dishonour of a cheque for insufficiency of funds an offence, subject to conditions. The procedure is defined by strict timelines.' },
      { type: 'h2', text: 'Key timelines' },
      { type: 'ul', items: ['The cheque must be presented within its period of validity, currently three months from its date', 'A written demand notice must be sent within thirty days of receiving information of dishonour', 'The drawer has fifteen days from receipt of the notice to make payment', 'A complaint may be filed within one month after that fifteen-day period expires'] },
      { type: 'p', text: 'The cheque must have been issued for the discharge of a legally enforceable debt or liability. Missing a timeline can be fatal to the complaint, so prompt advice is important for both parties.' },
    ],
  },
  {
    slug: 'making-a-valid-will',
    title: 'Making a Valid Will: A Practical Guide',
    category: 'Documentation',
    excerpt: 'A clearly drafted and properly attested will helps ensure your wishes are carried out and reduces the risk of family disputes.',
    published: '2026-07-05',
    readMinutes: 5,
    jurisdiction: 'India',
    image: '/images/articles/will.svg',
    imageAlt: 'Abstract gold line drawing of a quill and scroll',
    reviewed: false,
    body: [
      { type: 'p', text: 'A will allows you to decide how your property should be distributed after your lifetime. The Indian Succession Act, 1925 sets out the formal requirements for most wills.' },
      { type: 'h2', text: 'Formal requirements' },
      { type: 'ul', items: ['The testator must be of sound mind and not a minor', 'The will must be signed by the testator', 'It must be attested by at least two witnesses, each of whom has seen the testator sign', 'Beneficiaries should preferably not act as witnesses'] },
      { type: 'h2', text: 'Is registration required?' },
      { type: 'p', text: 'Registration of a will is optional, but it can make the will’s authenticity easier to establish. A will can be revoked or replaced at any time during the testator’s lifetime.' },
      { type: 'quote', text: 'Clarity today prevents conflict tomorrow.' },
      { type: 'p', text: 'Depending on where the property is located and the community of the testator, probate may be required. A tailored review is recommended.' },
    ],
  },
]

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug)
