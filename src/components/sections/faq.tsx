import { Phone } from 'lucide-react'
import { faqs } from '@/data/faqs'
import { site } from '@/config/site'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Reveal } from '@/components/common/reveal'
import { SectionHeading } from '@/components/common/section-heading'
import { Button } from '@/components/ui/button'
import { NavAnchor } from '@/components/common/nav-anchor'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad bg-white text-black">
      <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="faq-title"
              tone="light"
              eyebrow="Frequently Asked"
              title={
                <>
                  Questions, <span className="italic">Answered.</span>
                </>
              }
              intro="Practical information about consultations and working with the office."
            />
            <Reveal className="mt-10 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button asChild variant="dark">
                <NavAnchor section="appointment">Request an Appointment</NavAnchor>
              </Button>
              <Button asChild variant="light">
                <a href={`tel:${site.contact.phoneHref}`}>
                  <Phone className="size-4" aria-hidden="true" /> Call the Office
                </a>
              </Button>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-black/12">
            {faqs.map((f, i) => (
              <AccordionItem key={f.question} value={`item-${i}`}>
                <AccordionTrigger>{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
