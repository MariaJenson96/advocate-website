/**
 * Practice areas — EDITABLE EXAMPLES.
 * Set `offered: false` (or delete the entry) for any service the advocate
 * does not actually provide. Only `offered` areas are displayed or listed
 * in the sitemap and the enquiry form.
 */
export type PracticeIcon =
  | 'scale'
  | 'gavel'
  | 'users'
  | 'landmark'
  | 'briefcase'
  | 'shield'
  | 'file-pen'
  | 'messages'

export interface PracticeArea {
  slug: string
  title: string
  icon: PracticeIcon
  summary: string
  overview: string[]
  matters: string[]
  offered: boolean
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'civil-litigation',
    title: 'Civil Litigation',
    icon: 'scale',
    summary: 'Representation in civil suits, injunctions, recovery and declaratory proceedings before civil courts.',
    overview: [
      'Civil disputes demand careful preparation, a clear reading of the facts and a strategy that keeps the client’s long-term interests in view. Matters are assessed for limitation, jurisdiction and the strength of documentary evidence before any proceeding is initiated.',
      'Where appropriate, negotiated settlement and mediation are explored alongside litigation so that clients can make informed choices about time, cost and outcome.',
    ],
    matters: ['Suits for recovery of money', 'Injunctions and declaratory suits', 'Specific performance of contracts', 'Execution of decrees', 'Appeals and revisions'],
    offered: true,
  },
  {
    slug: 'criminal-law',
    title: 'Criminal Law',
    icon: 'gavel',
    summary: 'Advice and representation at every stage — from bail and trial to appeals and quashing petitions.',
    overview: [
      'Criminal proceedings affect liberty and reputation. Guidance is provided on rights at the stage of investigation, arrest and bail, and on the conduct of trial proceedings under the applicable criminal laws.',
      'Every matter is handled with discretion, with clear explanations of procedure so that clients understand each step.',
    ],
    matters: ['Regular and anticipatory bail', 'Trial representation', 'Cheque dishonour complaints', 'Quashing petitions', 'Criminal appeals and revisions'],
    offered: true,
  },
  {
    slug: 'family-law',
    title: 'Family Law',
    icon: 'users',
    summary: 'Sensitive counsel in matrimonial disputes, divorce, maintenance, custody and guardianship.',
    overview: [
      'Family matters call for both legal precision and personal sensitivity. Clients receive candid advice on their rights and options under the applicable personal laws and the Special Marriage Act, 1954.',
      'Amicable resolution through mediation is encouraged wherever it serves the interests of the family, particularly children.',
    ],
    matters: ['Mutual consent and contested divorce', 'Maintenance and alimony', 'Child custody and visitation', 'Domestic violence proceedings', 'Guardianship petitions'],
    offered: true,
  },
  {
    slug: 'property-real-estate',
    title: 'Property & Real Estate Disputes',
    icon: 'landmark',
    summary: 'Title verification, partition, possession and tenancy disputes, and builder–buyer matters.',
    overview: [
      'Property is often a family’s most valuable asset. Assistance covers due diligence before purchase, title verification, and representation in disputes concerning ownership, partition, possession and tenancy.',
      'Builder–buyer disputes may be pursued before the appropriate forum, including RERA authorities and consumer commissions, depending on the facts.',
    ],
    matters: ['Title search and due diligence', 'Partition and succession disputes', 'Possession and eviction suits', 'Landlord–tenant matters', 'RERA and builder–buyer disputes'],
    offered: true,
  },
  {
    slug: 'corporate-commercial',
    title: 'Corporate & Commercial Law',
    icon: 'briefcase',
    summary: 'Commercial contracts, business disputes and compliance advice for enterprises and founders.',
    overview: [
      'Businesses need advice that is practical, timely and commercially aware. Support includes drafting and reviewing commercial contracts, advising on disputes, and pre-litigation strategy.',
      'For commercial suits, the mandatory pre-institution mediation process under the Commercial Courts Act, 2015 is considered at the outset where applicable.',
    ],
    matters: ['Commercial contract drafting and review', 'Partnership and shareholder disputes', 'Commercial suits and recovery', 'Legal notices and replies', 'General compliance advisory'],
    offered: true,
  },
  {
    slug: 'consumer-protection',
    title: 'Consumer Protection',
    icon: 'shield',
    summary: 'Complaints for deficiency in service, defective goods and unfair trade practices.',
    overview: [
      'The Consumer Protection Act, 2019 provides a dedicated forum for consumers to seek redress. Assistance covers assessing the complaint, identifying the correct commission based on pecuniary and territorial jurisdiction, and drafting and filing the complaint.',
      'Representation is also available for businesses responding to consumer complaints.',
    ],
    matters: ['Deficiency in service claims', 'Defective goods complaints', 'Insurance claim disputes', 'Banking and financial services', 'Appeals before State and National Commissions'],
    offered: true,
  },
  {
    slug: 'documentation-drafting',
    title: 'Documentation & Legal Drafting',
    icon: 'file-pen',
    summary: 'Clear, enforceable agreements, deeds, wills, notices and other legal documents.',
    overview: [
      'Well-drafted documents prevent disputes. Agreements, deeds and notices are drafted with attention to enforceability, stamp duty and registration requirements, and the specific commercial or personal context.',
      'Existing documents can also be reviewed to identify risks before they are signed.',
    ],
    matters: ['Sale deeds and agreements to sell', 'Lease and leave-and-licence agreements', 'Wills and gift deeds', 'Powers of attorney', 'Legal notices'],
    offered: true,
  },
  {
    slug: 'legal-consultation',
    title: 'Legal Consultation',
    icon: 'messages',
    summary: 'Structured, confidential consultations to understand your position and your options.',
    overview: [
      'A consultation is an opportunity to set out the facts, review documents and understand the legal position before deciding on a course of action.',
      'Consultations can be held in person or online, subject to availability. A consultation does not by itself create an advocate-client relationship until the engagement is confirmed.',
    ],
    matters: ['Initial case assessment', 'Second opinions', 'Document review', 'Pre-litigation strategy', 'Online consultations'],
    offered: true,
  },
]

export const offeredPracticeAreas = practiceAreas.filter((p) => p.offered)
