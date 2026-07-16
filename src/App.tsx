import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { languages, defaultLanguage } from '@/i18n'
import type { Language } from '@/types'

const HomePage = lazy(() => import('@/pages/HomePage').then((m) => ({ default: m.HomePage })))
const PropertiesPage = lazy(() =>
  import('@/pages/PropertiesPage').then((m) => ({ default: m.PropertiesPage })),
)
const ContactPage = lazy(() => import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })))
const BlogPage = lazy(() => import('@/pages/BlogPage').then((m) => ({ default: m.BlogPage })))
const BlogPostPage = lazy(() =>
  import('@/pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage })),
)
const FavoritesPage = lazy(() =>
  import('@/pages/FavoritesPage').then((m) => ({ default: m.FavoritesPage })),
)
const ComparePage = lazy(() => import('@/pages/ComparePage').then((m) => ({ default: m.ComparePage })))
const PropertyDetailPage = lazy(() =>
  import('@/pages/PropertyDetailPage').then((m) => ({ default: m.PropertyDetailPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

function LangRedirect() {
  const browserLang = navigator.language.split('-')[0]
  const lang = languages.includes(browserLang as Language) ? browserLang : defaultLanguage
  return <Navigate to={`/${lang}`} replace />
}

function SuspenseWrap({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LangRedirect />} />
        <Route path="/:lang" element={<MainLayout />}>
          <Route
            index
            element={
              <SuspenseWrap>
                <HomePage />
              </SuspenseWrap>
            }
          />
          <Route
            path="properties"
            element={
              <SuspenseWrap>
                <PropertiesPage />
              </SuspenseWrap>
            }
          />
          <Route
            path="properties/:slug"
            element={
              <SuspenseWrap>
                <PropertyDetailPage />
              </SuspenseWrap>
            }
          />
          <Route
            path="about"
            element={
              <SuspenseWrap>
                <AboutPage />
              </SuspenseWrap>
            }
          />
          <Route
            path="contact"
            element={
              <SuspenseWrap>
                <ContactPage />
              </SuspenseWrap>
            }
          />
          <Route
            path="blog"
            element={
              <SuspenseWrap>
                <BlogPage />
              </SuspenseWrap>
            }
          />
          <Route
            path="blog/:slug"
            element={
              <SuspenseWrap>
                <BlogPostPage />
              </SuspenseWrap>
            }
          />
          <Route
            path="favorites"
            element={
              <SuspenseWrap>
                <FavoritesPage />
              </SuspenseWrap>
            }
          />
          <Route
            path="compare"
            element={
              <SuspenseWrap>
                <ComparePage />
              </SuspenseWrap>
            }
          />
          <Route
            path="*"
            element={
              <SuspenseWrap>
                <NotFoundPage />
              </SuspenseWrap>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <SuspenseWrap>
              <NotFoundPage />
            </SuspenseWrap>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
