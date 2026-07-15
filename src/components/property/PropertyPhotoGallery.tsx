import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import type { Property } from '@/types'
import { formatPrice } from '@/utils/format'
import type { Language } from '@/types'
import type { Currency } from '@/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface PropertyPhotoGalleryProps {
  property: Property | null
  title: string
  lang: Language
  currency: Currency
  onClose: () => void
}

export function PropertyPhotoGallery({
  property,
  title,
  lang,
  currency,
  onClose,
}: PropertyPhotoGalleryProps) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!property) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [property, onClose])

  return (
    <AnimatePresence>
      {property && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10">
            <div className="min-w-0 pr-4">
              <p className="text-warm-white font-serif text-lg sm:text-xl truncate">{title}</p>
              <p className="text-gold text-sm mt-0.5">
                {formatPrice(property.price, currency, lang)} · {property.images.length}{' '}
                {lang === 'es' ? 'fotos' : lang === 'ca' ? 'fotos' : lang === 'en' ? 'photos' : 'photos'}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-warm-white/80 hover:text-gold transition-colors shrink-0"
              aria-label={t('common.back')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-0">
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              navigation={{
                prevEl: '.gallery-prev',
                nextEl: '.gallery-next',
              }}
              pagination={{ clickable: true }}
              keyboard
              loop={property.images.length > 1}
              className="w-full h-full max-h-[calc(100vh-8rem)] property-gallery-swiper"
            >
              {property.images.map((src, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <img
                    src={src}
                    alt={`${title} — ${index + 1}`}
                    className="max-w-full max-h-[calc(100vh-10rem)] w-auto h-auto object-contain mx-auto"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {property.images.length > 1 && (
              <>
                <button
                  type="button"
                  className="gallery-prev absolute left-2 sm:left-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-warm-white rounded-full backdrop-blur-md transition-colors"
                  aria-label={t('common.previous')}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  className="gallery-next absolute right-2 sm:right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-warm-white rounded-full backdrop-blur-md transition-colors"
                  aria-label={t('common.next')}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
