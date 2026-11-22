/**
 * Professional timeline — ALL ENTRIES ARE PLACEHOLDERS.
 * Replace with verified facts only. Do not invent years, positions,
 * court appearances, awards or achievements.
 */
export interface TimelineEntry {
  period: string
  title: string
  organisation: string
  description: string
  kind: 'practice' | 'position' | 'enrolment' | 'education' | 'certification' | 'membership'
}

export const timeline: TimelineEntry[] = [
  {
    period: '[Year] — Present',
    title: 'Advocate & Legal Consultant',
    organisation: 'Independent Practice, [City]',
    description: 'Advising and representing individuals and businesses in [practice areas]. Appearing before [courts / forums].',
    kind: 'practice',
  },
  {
    period: '[Year] — [Year]',
    title: '[Associate Advocate]',
    organisation: '[Chambers of Senior Advocate / Law Firm Name]',
    description: '[Describe the nature of work handled — e.g. drafting pleadings, conducting hearings, client advisory.]',
    kind: 'position',
  },
  {
    period: '[Year]',
    title: 'Enrolled as an Advocate',
    organisation: '[Bar Council of State] — [Enrolment No.]',
    description: 'Enrolment details as issued by the State Bar Council.',
    kind: 'enrolment',
  },
  {
    period: '[Year]',
    title: '[LL.B. / B.A. LL.B. (Hons.)]',
    organisation: '[University / Law School Name]',
    description: '[Optional: specialisation, dissertation topic or other verified academic detail.]',
    kind: 'education',
  },
  {
    period: '[Year]',
    title: '[Certification / Diploma Name]',
    organisation: '[Issuing Institution]',
    description: '[e.g. a certification in mediation, arbitration or cyber law — only if actually held.]',
    kind: 'certification',
  },
  {
    period: 'Member',
    title: 'Professional Memberships',
    organisation: '[Bar Association Name] · [Other Association]',
    description: 'List only current, verifiable memberships.',
    kind: 'membership',
  },
]
