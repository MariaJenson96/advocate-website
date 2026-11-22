/**
 * Gallery — PLACEHOLDER IMAGES.
 * Replace each `src` with an authentic photograph of the advocate
 * (WebP/AVIF recommended) and update the caption to describe it accurately.
 * Keep `width`/`height` matching the real image to avoid layout shift.
 *
 * Note: photography inside courtrooms is generally not permitted.
 * Use chamber, office, court-complex exterior or event photographs.
 */
export interface GalleryImage {
  src: string
  alt: string
  caption: string
  category: string
  width: number
  height: number
}

export const gallery: GalleryImage[] = [
  { src: '/images/gallery/chambers.svg', alt: 'The advocate at work in chambers', caption: 'In chambers', category: 'Practice', width: 800, height: 1000 },
  { src: '/images/gallery/court-complex.svg', alt: 'The advocate outside the court complex', caption: 'At the court complex', category: 'Practice', width: 1200, height: 800 },
  { src: '/images/gallery/consultation.svg', alt: 'The advocate during a client consultation', caption: 'Client consultation', category: 'Clients', width: 1000, height: 1000 },
  { src: '/images/gallery/research.svg', alt: 'The advocate researching case law in the library', caption: 'Legal research', category: 'Practice', width: 1200, height: 800 },
  { src: '/images/gallery/speaking.svg', alt: 'The advocate speaking at a legal awareness session', caption: 'Legal awareness session', category: 'Events', width: 800, height: 1000 },
  { src: '/images/gallery/professional-event.svg', alt: 'The advocate at a professional association event', caption: 'Bar association event', category: 'Events', width: 1200, height: 800 },
]
