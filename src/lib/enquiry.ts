import type { EnquiryValues } from './enquiry-schema'

/**
 * Appointment enquiries are always sent to the site's own server function
 * (api/enquiry.ts), which emails them to the advocate using the SMTP_*
 * settings. There is no browser-side configuration.
 */
const ENDPOINT = '/api/enquiry'

/** The server has no email settings yet (SMTP_* missing) */
export class EnquiryNotConfiguredError extends Error {
  constructor() {
    super('Online enquiries are not yet enabled.')
    this.name = 'EnquiryNotConfiguredError'
  }
}

/** Too many submissions from this visitor in a short time */
export class EnquiryRateLimitError extends Error {
  constructor() {
    super('Too many requests.')
    this.name = 'EnquiryRateLimitError'
  }
}

export async function submitEnquiry(values: EnquiryValues): Promise<void> {
  // Silently drop bot submissions caught by the honeypot
  if (values.website) return

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
      signal: controller.signal,
    })
    if (res.status === 503) throw new EnquiryNotConfiguredError()
    if (res.status === 429) throw new EnquiryRateLimitError()
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
  } finally {
    clearTimeout(timeout)
  }
}
