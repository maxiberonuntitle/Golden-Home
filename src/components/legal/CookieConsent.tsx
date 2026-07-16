import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useLegalStore } from '@/stores/useLegalStore'

export function CookieConsent() {
  const { t } = useTranslation()
  const cookieConsent = useLegalStore((state) => state.cookieConsent)
  const acceptCookies = useLegalStore((state) => state.acceptCookies)
  const rejectCookies = useLegalStore((state) => state.rejectCookies)
  const openLegal = useLegalStore((state) => state.openLegal)

  const visible = cookieConsent === null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, delay: 0.6 }}
          className="fixed inset-x-4 bottom-4 z-[90] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:max-w-md"
          role="dialog"
          aria-live="polite"
          aria-label={t('legal.cookieBanner.title')}
        >
          <div className="overflow-hidden rounded-2xl border border-charcoal/10 dark:border-white/10 bg-warm-white/95 dark:bg-graphite/95 shadow-2xl shadow-charcoal/15 dark:shadow-black/40 backdrop-blur-xl">
            <div className="p-5 sm:p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Cookie className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-serif text-lg text-charcoal dark:text-warm-white mb-1">
                    {t('legal.cookieBanner.title')}
                  </h3>
                  <p className="text-sm leading-relaxed text-charcoal/65 dark:text-warm-white/65">
                    {t('legal.cookieBanner.description')}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={acceptCookies}
                  className="inline-flex flex-1 items-center justify-center rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-charcoal hover:bg-gold-light transition-colors"
                >
                  {t('legal.cookieBanner.accept')}
                </button>
                <button
                  type="button"
                  onClick={rejectCookies}
                  className="inline-flex flex-1 items-center justify-center rounded-lg border border-charcoal/15 dark:border-white/15 px-4 py-2.5 text-sm font-medium text-charcoal dark:text-warm-white hover:border-gold/40 transition-colors"
                >
                  {t('legal.cookieBanner.reject')}
                </button>
                <button
                  type="button"
                  onClick={() => openLegal('cookies')}
                  className="inline-flex items-center justify-center px-2 py-2.5 text-sm font-medium text-gold hover:text-gold-light transition-colors"
                >
                  {t('legal.cookieBanner.configure')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
