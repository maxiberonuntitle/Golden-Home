import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloatingButtons } from '@/components/layout/FloatingButtons'
import { LegalModal } from '@/components/legal/LegalModal'
import { CookieConsent } from '@/components/legal/CookieConsent'

export function MainLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-warm-white dark:bg-charcoal">
      <Header />
      <main className="flex-1 pt-[var(--header-nav-h)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingButtons />
      <LegalModal />
      <CookieConsent />
    </div>
  )
}
