import { useState } from 'react'
import { Link } from 'react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Check, CircleAlert, CircleCheck, LoaderCircle, Lock, Phone } from 'lucide-react'
import { site } from '@/config/site'
import { contactMethods, enquirySchema, serviceOptions, todayIso, type EnquiryValues } from '@/lib/enquiry-schema'
import { EnquiryNotConfiguredError, submitEnquiry } from '@/lib/enquiry'
import { ease } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Field, Input, Textarea } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Reveal, RevealItem } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'

type Status = { kind: 'idle' } | { kind: 'success'; method: string; simulated: boolean } | { kind: 'error'; message: string }

const steps = [
  { title: 'Share a brief overview', text: 'Tell us the nature of your requirement — general details only.' },
  { title: 'The office contacts you', text: 'You will be contacted by your preferred method to confirm a time.' },
  { title: 'Consultation', text: 'Meet in person or online to discuss your matter in confidence.' },
]

const defaultValues: Partial<EnquiryValues> = {
  fullName: '', phone: '', email: '', service: '', preferredDate: '', message: '', consent: false, website: '',
}

export function Appointment() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const {
    register, control, handleSubmit, reset, watch,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({ resolver: zodResolver(enquirySchema), defaultValues, mode: 'onTouched' })

  const messageLength = watch('message')?.length ?? 0

  const onSubmit = async (values: EnquiryValues) => {
    setStatus({ kind: 'idle' })
    try {
      const result = await submitEnquiry(values)
      setStatus({ kind: 'success', method: values.contactMethod, simulated: result.simulated })
      reset(defaultValues)
    } catch (err) {
      setStatus({
        kind: 'error',
        message:
          err instanceof EnquiryNotConfiguredError
            ? `Online appointment requests are not yet enabled. Please call ${site.contact.phone} or email ${site.contact.email}.`
            : 'Your request could not be sent. Please check your connection and try again, or contact the office directly.',
      })
    }
  }

  const aria = (name: keyof EnquiryValues) => ({
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <section id="appointment" aria-labelledby="appointment-title" className="section-pad relative overflow-hidden bg-black">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div className="container-luxe relative grid gap-16 lg:grid-cols-12 lg:gap-12 xl:gap-20">
        <div className="lg:col-span-5">
          <SectionHeading
            id="appointment-title"
            eyebrow="Appointment Enquiry"
            title={
              <>
                Request an <span className="italic text-gold">Appointment</span>
              </>
            }
            intro="Share a brief outline of your requirement and preferred time. The office will get in touch to confirm your consultation."
          />
          <Reveal as="ol" staggerChildren={0.1} className="mt-12 space-y-7">
            {steps.map((s, i) => (
              <RevealItem as="li" key={s.title} className="flex gap-5">
                <span className="grid size-10 shrink-0 place-items-center border border-gold/50 font-display text-lg text-gold">{i + 1}</span>
                <div>
                  <h3 className="font-display text-xl text-white">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/55">{s.text}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>

          <Reveal className="mt-12 border-l border-gold pl-6">
            <h3 className="eyebrow flex items-center gap-2.5 text-[0.62rem] text-gold">
              <Lock className="size-3.5" aria-hidden="true" /> Privacy Notice
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Information submitted through this form is used only to respond to your enquiry and arrange a consultation. It is not shared with third parties except the service that delivers the form to the office, and is retained only as long as necessary. Please <strong className="font-semibold text-white">do not include confidential case details or upload documents</strong> here — these can be shared securely during your consultation. Submitting this form does not create an advocate-client relationship. See the{' '}
              <Link to="/privacy-policy" className="text-gold underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
                Privacy Policy
              </Link>
              .
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7">
          <div className="relative border border-gold/30 bg-black p-6 shadow-gold sm:p-10 xl:p-12">
            <span aria-hidden="true" className="absolute -left-px -top-px size-6 border-l-2 border-t-2 border-gold" />
            <span aria-hidden="true" className="absolute -bottom-px -right-px size-6 border-b-2 border-r-2 border-gold" />

            <AnimatePresence mode="wait" initial={false}>
              {status.kind === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6, ease }}
                  role="status"
                  aria-live="polite"
                  className="flex min-h-[32rem] flex-col items-center justify-center text-center"
                >
                  <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease, delay: 0.15 }}
                    className="grid size-20 place-items-center rounded-full border border-gold text-gold"
                  >
                    <CircleCheck className="size-9" strokeWidth={1.3} aria-hidden="true" />
                  </motion.span>
                  <h3 className="mt-8 font-display text-4xl text-white">Request Received</h3>
                  <p className="mt-4 max-w-md leading-relaxed text-white/65">
                    Thank you. Your appointment request has been received. The office will contact you by <strong className="font-semibold text-white">{status.method === 'Phone call' ? 'phone' : status.method === 'Email' ? 'email' : status.method}</strong> to confirm a suitable time.
                  </p>
                  {status.simulated && (
                    <p className="mt-4 max-w-md border border-gold/40 px-4 py-3 text-xs text-gold">
                      Development mode: no enquiry endpoint is configured, so this submission was simulated. Set VITE_ENQUIRY_ENDPOINT to enable delivery.
                    </p>
                  )}
                  <Button variant="outline" className="mt-10" onClick={() => setStatus({ kind: 'idle' })}>
                    Submit Another Request
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  aria-labelledby="appointment-title"
                  aria-busy={isSubmitting}
                >
                  <fieldset disabled={isSubmitting} className="grid gap-x-6 gap-y-7 md:grid-cols-2">
                    <legend className="sr-only">Appointment details</legend>

                    <Field id="fullName" label="Full Name" required error={errors.fullName?.message}>
                      <Input id="fullName" autoComplete="name" placeholder="Your full name" {...register('fullName')} {...aria('fullName')} />
                    </Field>

                    <Field id="phone" label="Phone Number" required error={errors.phone?.message}>
                      <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" {...register('phone')} {...aria('phone')} />
                    </Field>

                    <Field id="email" label="Email Address" required error={errors.email?.message}>
                      <Input id="email" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" {...register('email')} {...aria('email')} />
                    </Field>

                    <Field id="service" label="Legal Service Required" required error={errors.service?.message}>
                      <Controller
                        control={control}
                        name="service"
                        render={({ field }) => (
                          <Select value={field.value || undefined} onValueChange={field.onChange} name={field.name} disabled={isSubmitting}>
                            <SelectTrigger id="service" onBlur={field.onBlur} ref={field.ref} {...aria('service')}>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.map((s) => (
                                <SelectItem key={s} value={s}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </Field>

                    <Field id="preferredDate" label="Preferred Appointment Date" required error={errors.preferredDate?.message} hint="Subject to availability — the office will confirm.">
                      <Input id="preferredDate" type="date" min={todayIso()} {...register('preferredDate')} {...aria('preferredDate')} />
                    </Field>

                    <Field as="fieldset" id="contactMethod" label="Preferred Contact Method" required error={errors.contactMethod?.message}>
                      <div className="grid h-13 grid-cols-3 gap-px border border-white/15 bg-white/15" role="radiogroup" {...aria('contactMethod')}>
                        {contactMethods.map((m) => (
                          <label
                            key={m}
                            className="relative flex cursor-pointer items-center justify-center bg-black px-2 text-center text-[0.8rem] text-white/70 transition-colors duration-300 hover:text-white has-[:checked]:bg-gold has-[:checked]:font-semibold has-[:checked]:text-black has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-4 has-[:focus-visible]:outline-black"
                          >
                            <input type="radio" value={m} className="sr-only" {...register('contactMethod')} />
                            {m}
                          </label>
                        ))}
                      </div>
                    </Field>

                    <Field
                      id="message"
                      label="Brief Description of Legal Requirement"
                      required
                      className="md:col-span-2"
                      error={errors.message?.message}
                      hint={
                        <span className="flex justify-between gap-4">
                          <span>General outline only — please don’t include confidential details.</span>
                          <span className={cn(messageLength > 800 && 'text-gold')}>{messageLength}/800</span>
                        </span>
                      }
                    >
                      <Textarea id="message" rows={5} placeholder="e.g. I need advice regarding a property title dispute in [city]." {...register('message')} {...aria('message')} />
                    </Field>

                    {/* Honeypot (hidden from people, visible to bots) */}
                    <div aria-hidden="true" className="absolute -left-[9999px] size-px overflow-hidden">
                      <label htmlFor="website">Website</label>
                      <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
                    </div>

                    <div className="md:col-span-2">
                      <label className="group flex cursor-pointer items-start gap-4 text-sm leading-relaxed text-white/65">
                        <span className="relative mt-0.5 grid size-5 shrink-0">
                          <input
                            type="checkbox"
                            className="peer size-5 cursor-pointer appearance-none border border-white/30 bg-transparent transition-colors checked:border-gold checked:bg-gold aria-[invalid=true]:border-gold"
                            {...register('consent')}
                            {...aria('consent')}
                          />
                          <Check className="pointer-events-none absolute inset-0 m-auto size-3.5 text-black opacity-0 transition-opacity peer-checked:opacity-100" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span>
                          I have read the privacy notice and consent to being contacted about this enquiry. I understand that submitting this form does not create an advocate-client relationship.
                        </span>
                      </label>
                      {errors.consent && (
                        <p id="consent-error" role="alert" className="mt-2.5 flex items-center gap-2 pl-9 text-[0.8rem] text-gold">
                          <CircleAlert className="size-3.5" aria-hidden="true" /> {errors.consent.message}
                        </p>
                      )}
                    </div>
                  </fieldset>

                  <AnimatePresence>
                    {status.kind === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        role="alert"
                        className="overflow-hidden"
                      >
                        <div className="mt-8 flex gap-4 border border-gold bg-gold/10 p-5 text-sm text-white">
                          <CircleAlert className="size-5 shrink-0 text-gold" aria-hidden="true" />
                          <div>
                            <p>{status.message}</p>
                            <a href={`tel:${site.contact.phoneHref}`} className="mt-3 inline-flex items-center gap-2 font-semibold text-gold hover:underline">
                              <Phone className="size-4" aria-hidden="true" /> {site.contact.phone}
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-white/45">
                      <span className="text-gold">*</span> Required fields
                    </p>
                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                      {isSubmitting ? (
                        <>
                          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> Sending…
                        </>
                      ) : (
                        <>
                          Request an Appointment
                          <ArrowRight className="size-4 transition-transform duration-500 group-hover/btn:translate-x-1" aria-hidden="true" />
                        </>
                      )}
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
