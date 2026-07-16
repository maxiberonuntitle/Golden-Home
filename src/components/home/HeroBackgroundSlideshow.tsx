import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const HERO_IMAGES = [
  '/blanes-background.png',
  '/properties/casa-calle-almadrava-st-francesc-blanes/04.png',
  '/properties/casa-calle-almadrava-st-francesc-blanes/02.png',
] as const

const SLIDE_MS = 6000
const FADE_S = 1.2
const ZOOM_SCALE = 1.14

export function HeroBackgroundSlideshow() {
  const [index, setIndex] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    HERO_IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) return

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % HERO_IMAGES.length)
    }, SLIDE_MS)

    return () => window.clearInterval(timer)
  }, [shouldReduceMotion])

  const activeImage = HERO_IMAGES[index]

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={activeImage}
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_S, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute -inset-[15%] will-change-transform"
            initial={{ scale: 1 }}
            animate={{ scale: shouldReduceMotion ? 1 : ZOOM_SCALE }}
            transition={{
              duration: shouldReduceMotion ? 0 : SLIDE_MS / 2000,
              ease: [0.22, 1, 0.36, 1],
              repeat: shouldReduceMotion ? 0 : 1,
              repeatType: 'reverse',
            }}
          >
            <img
              src={activeImage}
              alt=""
              className="h-full w-full object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
