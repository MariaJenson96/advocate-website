import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/** Teach tailwind-merge about our custom design tokens so they aren't stripped. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'eyebrow'] }],
      tracking: [{ tracking: ['eyebrow'] }],
      rounded: [{ rounded: ['card', 'button'] }],
      shadow: [{ shadow: ['lift', 'gold', 'soft'] }],
    },
  },
})

/** shadcn/ui-style class merger */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function readStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    /* storage unavailable (private mode etc.) — ignore */
  }
}
