/**
 * Checks the email settings in .env and sends one test email.
 * Usage: npm run test:email
 */
import { existsSync, readdirSync } from 'node:fs'
import { loadEnv } from 'vite'
import nodemailer from 'nodemailer'

const cwd = process.cwd()
console.log(`\nProject folder: ${cwd}`)

const envLike = readdirSync(cwd).filter((f) => f.startsWith('.env') || f === 'env' || f.startsWith('env.'))
console.log(`Settings files found: ${envLike.length ? envLike.join(', ') : '(none)'}`)
if (!existsSync('.env')) {
  console.error('\n✗ No file named exactly ".env" here.')
  if (envLike.some((f) => f !== '.env.example')) console.error('  Rename your settings file to ".env" (watch out for a hidden ".txt" on Windows).')
  process.exit(1)
}

const env = loadEnv('development', cwd, 'SMTP_')
const { SMTP_HOST, SMTP_PORT = '465', SMTP_USER, SMTP_PASS } = env
const to = loadEnv('development', cwd, 'ENQUIRY_').ENQUIRY_TO || SMTP_USER
const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter((k) => !env[k])
if (missing.length) {
  console.error(`\n✗ .env is missing: ${missing.join(', ')}`)
  process.exit(1)
}
console.log(`SMTP_HOST=${SMTP_HOST}  SMTP_PORT=${SMTP_PORT}  SMTP_USER=${SMTP_USER}  SMTP_PASS=${'•'.repeat(SMTP_PASS.length)} (${SMTP_PASS.length} characters)`)
if (/\s/.test(SMTP_PASS)) console.warn('! SMTP_PASS contains spaces — remove them.')

const port = Number(SMTP_PORT)
const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })

try {
  await transporter.verify()
  console.log('✓ Logged in to the mail server')
  await transporter.sendMail({
    from: `"Website Enquiry" <${SMTP_USER}>`,
    to,
    subject: 'Test email from the advocate website',
    text: 'If you can read this, appointment enquiries will be delivered to this inbox.',
  })
  console.log(`✓ Test email sent to ${to} — check the inbox (and Spam).\n`)
} catch (err) {
  const msg = err instanceof Error ? err.message : String(err)
  console.error(`\n✗ ${msg}`)
  if (/535|Username and Password not accepted|Invalid login/i.test(msg))
    console.error('  Gmail rejected the login: use an App Password (Google Account → Security → App passwords), not your normal password.')
  else if (/ENOTFOUND|ECONNREFUSED|ETIMEDOUT|ECONNRESET/i.test(msg))
    console.error('  Could not reach the mail server: check SMTP_HOST / SMTP_PORT and your internet connection or firewall.')
  process.exit(1)
}
