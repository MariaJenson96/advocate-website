import type { EnquiryValues } from './enquiry-schema'

/**
 * ENQUIRY INTEGRATION POINT
 * ---------------------------------------------------------------------------
 * Set VITE_ENQUIRY_ENDPOINT to a backend API or an approved form service
 * (e.g. a Formspree / Basin / Getform endpoint, or your own HTTPS API).
 * The form POSTs JSON and expects a 2xx response.
 *
 * Until an endpoint is configured the form is NOT functional:
 *  - in development it simulates success so the UI can be reviewed;
 *  - in production it shows an error that directs visitors to call instead.
 */
const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT as string | undefined

export class EnquiryNotConfiguredError extends Error {
  constructor() {
    super('Online enquiries are not yet enabled.')
    this.name = 'EnquiryNotConfiguredError'
  }
}

export interface EnquiryResult {
  simulated: boolean
}

export async function submitEnquiry(values: EnquiryValues): Promise<EnquiryResult> {
  // Silently drop bot submissions caught by the honeypot
  if (values.website) return { simulated: true }

  const payload = {
    fullName: values.fullName,
    phone: values.phone,
    email: values.email,
    service: values.service,
    preferredDate: values.preferredDate,
    contactMethod: values.contactMethod,
    message: values.message,
    consent: values.consent,
    submittedAt: new Date().toISOString(),
    source: typeof window !== 'undefined' ? window.location.href : '',
  }

  if (!endpoint) {
    if (import.meta.env.DEV) {
      console.warn('[enquiry] VITE_ENQUIRY_ENDPOINT is not set — simulating a successful submission.', payload)
      await new Promise((r) => setTimeout(r, 1200))
      return { simulated: true }
    }
    throw new EnquiryNotConfiguredError()
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
    return { simulated: false }
  } finally {
    clearTimeout(timeout)
  }
}
