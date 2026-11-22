export type ApproachIcon = 'compass' | 'messages' | 'scale' | 'target' | 'lock' | 'handshake'

/** Professional approach — describes how work is done, never outcomes. */
export const approach: { title: string; description: string; icon: ApproachIcon }[] = [
  { title: 'Client-Focused Guidance', icon: 'compass', description: 'Advice shaped around your circumstances, priorities and the practical realities of your matter.' },
  { title: 'Transparent Communication', icon: 'messages', description: 'Clear explanations of procedure, timelines and fees, with regular updates as your matter progresses.' },
  { title: 'Professional Ethics', icon: 'scale', description: 'Conduct guided by the standards of professional conduct prescribed for advocates, and by candour with every client.' },
  { title: 'Strategic Preparation', icon: 'target', description: 'Thorough review of facts, documents and law before every filing and hearing.' },
  { title: 'Strict Confidentiality', icon: 'lock', description: 'Client information is handled with discretion and protected by professional privilege.' },
  { title: 'Dedicated Support', icon: 'handshake', description: 'Direct access and personal attention — from the first consultation to the conclusion of your matter.' },
]
