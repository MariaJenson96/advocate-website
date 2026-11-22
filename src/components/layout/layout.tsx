import { Outlet } from 'react-router'
import { Header } from './header'
import { Footer } from './footer'
import { ScrollManager } from './scroll-manager'
import { DisclaimerGate } from './disclaimer-gate'

export function Layout() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      <DisclaimerGate />
    </>
  )
}
