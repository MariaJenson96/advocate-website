import { z } from 'zod'
import { offeredPracticeAreas } from '@/data/practice-areas'

export const serviceOptions = [...offeredPracticeAreas.map((p) => p.title), 'Other / Not sure'] as const
export const contactMethods = ['Phone call', 'Email', 'WhatsApp'] as const

/** Accepts Indian and international numbers: optional +, 10–15 digits, spaces/dashes allowed */
const phoneRegex = /^\+?[0-9][0-9\s-]{8,17}[0-9]$/

const todayIso = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(80, 'Name is too long.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter your phone number.')
    .regex(phoneRegex, 'Please enter a valid phone number.')
    .refine((v) => {
      const digits = v.replace(/\D/g, '').length
      return digits >= 10 && digits <= 15
    }, 'Phone number should contain 10 to 15 digits.'),
  email: z.string().trim().min(1, 'Please enter your email address.').email('Please enter a valid email address.'),
  service: z.string().min(1, 'Please select the legal service required.'),
  preferredDate: z
    .string()
    .min(1, 'Please choose a preferred date.')
    .refine((v) => v >= todayIso(), 'Please choose today or a future date.'),
  contactMethod: z.enum(contactMethods, { message: 'Please choose how we should contact you.' }),
  message: z
    .string()
    .trim()
    .min(20, 'Please add a brief description (at least 20 characters).')
    .max(800, 'Please keep the description under 800 characters.'),
  consent: z.boolean().refine((v) => v, 'Please acknowledge the privacy notice to continue.'),
  /** Honeypot — must stay empty */
  website: z.string().max(0).optional(),
})

export type EnquiryValues = z.infer<typeof enquirySchema>
export { todayIso }
