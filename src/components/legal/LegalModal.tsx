import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LEGAL_DOCUMENTS } from '@/data/legalDocuments'
import { useLegalStore } from '@/stores/useLegalStore'
import { getLocalizedText } from '@/utils/format'
import type { Language } from '@/types'

export function LegalModal() {
  const { i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language
  const activeDocument = useLegalStore((state) => state.activeDocument)
  const closeLegal = useLegalStore((state) => state.closeLegal)

  useEffect(() => {
    if (!activeDocument) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [activeDocument])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLegal()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [closeLegal])

  const legalDocument = activeDocument ? LEGAL_DOCUMENTS[activeDocument] : null

  return createPortal(
    <AnimatePresence>
      {legalDocument && activeDocument && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={closeLegal}
            aria-label="Close"
          />

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-charcoal/10 dark:border-white/10 bg-warm-white/95 dark:bg-graphite/95 shadow-2xl shadow-charcoal/20 dark:shadow-black/40 backdrop-blur-xl"
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-charcoal/10 dark:border-white/10 px-6 py-5 sm:px-8">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-2">
                  Golden Home · goldenhomelloret.es
                </p>
                <h2
                  id="legal-modal-title"
                  className="font-serif text-2xl sm:text-3xl text-charcoal dark:text-warm-white leading-tight"
                >
                  {getLocalizedText(legalDocument.title, lang)}
                </h2>
                <p className="mt-2 text-xs text-charcoal/50 dark:text-warm-white/50">
                  {getLocalizedText(legalDocument.updatedAt, lang)}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLegal}
                className="shrink-0 rounded-lg p-2 text-charcoal/60 hover:text-gold dark:text-warm-white/60 dark:hover:text-gold transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8 space-y-8">
              {legalDocument.sections.map((section) => (
                <section key={getLocalizedText(section.title, lang)}>
                  <h3 className="font-serif text-lg text-charcoal dark:text-warm-white mb-3">
                    {getLocalizedText(section.title, lang)}
                  </h3>
                  <div className="space-y-3 text-sm leading-relaxed text-charcoal/75 dark:text-warm-white/75">
                    {section.paragraphs.map((paragraph) => (
                      <p key={getLocalizedText(paragraph, lang)}>
                        {getLocalizedText(paragraph, lang)}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
