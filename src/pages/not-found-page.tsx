import { Link } from 'react-router'
import { Seo } from '@/components/common/seo'
import { Button } from '@/components/ui/button'

export function NotFoundPage() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden bg-black px-5 pt-24 text-center">
      <Seo title="Page not found" noindex path="/404" />
      <span aria-hidden="true" className="absolute select-none font-display text-[14rem] leading-none text-outline-gold sm:text-[22rem]">
        404
      </span>
      <div className="relative">
        <p className="eyebrow text-gold">Page not found</p>
        <h1 className="mt-6 text-h1 text-white">This page could not be found.</h1>
        <p className="mx-auto mt-5 max-w-md text-white/60">The page you are looking for may have moved or no longer exists.</p>
        <Button asChild className="mt-10">
          <Link to="/">Return Home</Link>
        </Button>
      </div>
    </section>
  )
}
