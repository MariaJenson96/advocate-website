/**
 * POST /api/enquiry — appointment enquiry handler.
 * Runs inside the site's local server (`npm run dev` / `npm start`).
 *
 * Emails each enquiry directly to the advocate's own mailbox over SMTP.
 * No third-party form service stores the data. Configure with the
 * server-only environment variables below (never prefix them with VITE_,
 * which would expose them to the browser).
 *
 *   SMTP_HOST        e.g. smtp.gmail.com
 *   SMTP_PORT        465 (SSL) or 587 (STARTTLS)
 *   SMTP_USER        the mailbox login, e.g. office@example.com
 *   SMTP_PASS        an APP PASSWORD (not the normal login password)
 *   ENQUIRY_TO       where enquiries are delivered (defaults to SMTP_USER)
 *   ALLOWED_ORIGINS  optional, comma-separated, e.g. https://www.example.com
 */
import nodemailer from 'nodemailer'
import { enquirySchema } from '../src/lib/enquiry-schema'

const MAX_BODY_BYTES = 10_000
const RATE_LIMIT = 5 // submissions…
const RATE_WINDOW_MS = 10 * 60 * 1000 // …per 10 minutes per IP (best-effort, per instance)
const hits = new Map<string, number[]>()

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)

/** Strip CR/LF so values can never inject extra email headers */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > RATE_LIMIT
}

export async function POST(request: Request): Promise<Response> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO, ALLOWED_ORIGINS } = process.env

  // Only accept submissions from the website itself
  const origin = request.headers.get('origin')
  const allowed = (ALLOWED_ORIGINS ?? '').split(',').map((o) => o.trim()).filter(Boolean)
  if (allowed.length > 0 && (!origin || !allowed.includes(origin))) {
    return json(403, { ok: false, error: 'Forbidden' })
  }

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('[enquiry] SMTP is not configured')
    return json(503, { ok: false, error: 'Enquiries are not configured' })
  }

  const ip = (request.headers.get('x-forwarded-for') ?? 'unknown').split(',')[0].trim()
  if (rateLimited(ip)) return json(429, { ok: false, error: 'Too many requests. Please try again later.' })

  const raw = await request.text()
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: 'Request too large' })

  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return json(400, { ok: false, error: 'Invalid request' })
  }

  // Honeypot filled → bot. Pretend success so it learns nothing.
  if (typeof body === 'object' && body !== null && (body as { website?: unknown }).website) return json(200, { ok: true })

  // Same validation rules as the browser form
  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) return json(400, { ok: false, error: 'Invalid enquiry', fields: parsed.error.issues.map((i) => i.path.join('.')) })

  const v = parsed.data

  const rows: [string, string][] = [
    ['Name', v.fullName],
    ['Phone', v.phone],
    ['Email', v.email],
    ['Service', v.service],
    ['Preferred date', v.preferredDate],
    ['Contact by', v.contactMethod],
  ]
  const text = `${rows.map(([k, val]) => `${k}: ${val}`).join('\n')}\n\nDescription:\n${v.message}\n\nPrivacy consent given: yes\nReceived: ${new Date().toISOString()}`
  const html = `<div style="font-family:Arial,sans-serif;color:#080808">
  <h2 style="font-family:Georgia,serif;font-weight:normal;border-bottom:1px solid #C5A253;padding-bottom:8px">New appointment request</h2>
  <table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, val]) => `<tr><td style="color:#555;vertical-align:top">${k}</td><td><strong>${escapeHtml(val)}</strong></td></tr>`)
    .join('')}</table>
  <p style="color:#555;margin-top:16px">Description</p>
  <p style="white-space:pre-wrap;border-left:2px solid #C5A253;padding-left:12px">${escapeHtml(v.message)}</p>
  <p style="color:#888;font-size:12px">Privacy consent given · Received ${new Date().toISOString()}</p>
</div>`

  const port = Number(SMTP_PORT || 465)
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    requireTLS: port !== 465 && SMTP_HOST !== 'localhost',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  try {
    await transporter.sendMail({
      from: `"Website Enquiry" <${SMTP_USER}>`,
      to: ENQUIRY_TO || SMTP_USER,
      replyTo: { name: oneLine(v.fullName), address: v.email },
      subject: oneLine(`Appointment request: ${v.service} — ${v.fullName}`),
      text,
      html,
    })
    return json(200, { ok: true })
  } catch (err) {
    console.error('[enquiry] sending failed', err instanceof Error ? err.message : err)
    return json(502, { ok: false, error: 'Could not send enquiry' })
  }
}

/** Anything other than POST */
export function GET() {
  return json(405, { ok: false, error: 'Method not allowed' })
}
