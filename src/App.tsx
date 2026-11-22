import { createBrowserRouter, RouterProvider } from 'react-router'
import type { ComponentType } from 'react'
import { MotionConfig } from 'motion/react'
import { Layout } from '@/components/layout/layout'
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'

// Inner pages are code-split and loaded on demand
const lazyPage = (load: () => Promise<{ Component: ComponentType }>) => ({ lazy: load })

const router = createBrowserRouter([
  {
    element: (
      <SmoothScrollProvider>
        <Layout />
      </SmoothScrollProvider>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/articles', ...lazyPage(() => import('@/pages/articles-page').then((m) => ({ Component: m.ArticlesPage }))) },
      { path: '/articles/:slug', ...lazyPage(() => import('@/pages/article-detail-page').then((m) => ({ Component: m.ArticleDetailPage }))) },
      { path: '/practice-areas/:slug', ...lazyPage(() => import('@/pages/practice-area-page').then((m) => ({ Component: m.PracticeAreaPage }))) },
      { path: '/privacy-policy', ...lazyPage(() => import('@/pages/legal-page').then((m) => ({ Component: () => <m.LegalPage kind="privacy" /> }))) },
      { path: '/terms', ...lazyPage(() => import('@/pages/legal-page').then((m) => ({ Component: () => <m.LegalPage kind="terms" /> }))) },
      { path: '/disclaimer', ...lazyPage(() => import('@/pages/legal-page').then((m) => ({ Component: () => <m.LegalPage kind="disclaimer" /> }))) },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export default function App() {
  // reducedMotion="user" makes every Motion animation respect the OS setting
  return (
    <MotionConfig reducedMotion="user">
      <RouterProvider router={router} />
    </MotionConfig>
  )
}
