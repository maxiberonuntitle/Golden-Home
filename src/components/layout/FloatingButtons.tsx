import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, Mail, ArrowUp } from 'lucide-react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { COMPANY } from '@/utils/constants'
import type { Language } from '@/types'

export function FloatingButtons() {
  const { t } = useTranslation()
  const location = useLocation()
  const scrollY = useScrollPosition()
  const [expanded, setExpanded] = useState(false)

  const lang = (location.pathname.split('/')[1] as Language) || 'es'
  const showBackToTop = scrollY > 400

  const buttons = [
    {
      href: COMPANY.whatsapp,
      icon: MessageCircle,
      label: t('floatingButtons.whatsapp'),
      external: true,
      color: 'bg-[#25D366] hover:bg-[#20bd5a]',
    },
    {
      href: `tel:${COMPANY.phone.replace(/\s/g, '')}`,
      icon: Phone,
      label: t('floatingButtons.phone'),
      external: true,
      color: 'bg-gold hover:bg-gold-light text-charcoal',
    },
    {
      href: `/${lang}/contact`,
      icon: Mail,
      label: t('floatingButtons.contact'),
      external: false,
      color: 'bg-charcoal hover:bg-graphite text-warm-white',
    },
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            type="button"
            onClick={scrollToTop}
            className="p-3 bg-warm-white border border-charcoal/10 text-charcoal hover:text-gold shadow-lg transition-colors"
            aria-label={t('floatingButtons.backToTop')}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col gap-2"
          >
            {buttons.map((btn, index) => {
              const Icon = btn.icon
              const content = (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 px-4 py-3 shadow-lg transition-colors ${btn.color}`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium whitespace-nowrap">{btn.label}</span>
                </motion.div>
              )

              return btn.external ? (
                <a
                  key={btn.label}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setExpanded(false)}
                >
                  {content}
                </a>
              ) : (
                <Link key={btn.label} to={btn.href} onClick={() => setExpanded(false)}>
                  {content}
                </Link>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="p-4 bg-gold text-charcoal shadow-xl hover:bg-gold-light transition-colors"
        aria-label={t('common.contactUs')}
        aria-expanded={expanded}
      >
        <MessageCircle className={`w-6 h-6 transition-transform ${expanded ? 'rotate-45' : ''}`} />
      </motion.button>
    </div>
  )
}
