import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COMPANY } from '@/utils/constants'

const MIN_DISPLAY_MS = 1400

export function InitialLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const startedAt = Date.now()

    const finish = () => {
      const remaining = MIN_DISPLAY_MS - (Date.now() - startedAt)
      window.setTimeout(() => setVisible(false), Math.max(0, remaining))
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    return () => window.removeEventListener('load', finish)
  }, [])

  useEffect(() => {
    document.body.style.overflow = visible ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-warm-white dark:bg-charcoal"
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-8 px-6"
          >
            <img
              src={COMPANY.logo}
              alt="Golden Home Lloret"
              className="h-16 sm:h-20 w-auto object-contain dark:hidden"
              width={220}
              height={68}
            />
            <img
              src={COMPANY.logoLight}
              alt="Golden Home Lloret"
              className="hidden h-16 sm:h-20 w-auto object-contain dark:block"
              width={220}
              height={68}
            />

            <div className="w-40 sm:w-48">
              <div className="h-px w-full bg-charcoal/10 dark:bg-white/10 overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-gold origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
