import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Bed, Bath, Maximize, Heart, GitCompareArrows, MapPin, Images } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import { useLocalizedProperty } from '@/hooks/useLocalizedProperty'
import { formatPrice, formatArea } from '@/utils/format'
import { PropertyBadges } from '@/components/property/PropertyBadges'
import { PropertyCardGallery } from '@/components/property/PropertyCardGallery'
import type { Property, Language } from '@/types'

interface PropertyCardProps {
  property: Property
  index?: number
  scrollableImages?: boolean
}

export function PropertyCard({ property, index = 0, scrollableImages = false }: PropertyCardProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = (location.pathname.split('/')[1] as Language) || 'es'
  const localized = useLocalizedProperty(property, lang)
  const { favorites, compare, currency, toggleFavorite, toggleCompare } = useAppStore()

  if (!localized) return null

  const isFavorite = favorites.includes(property.id)
  const isCompare = compare.includes(property.id)
  const detailUrl = `/${lang}/properties/${property.slug}`
  const showImageCounter = !scrollableImages && property.images.length > 1

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group min-w-0 overflow-hidden bg-warm-white dark:bg-graphite border border-charcoal/5 dark:border-white/10 hover:border-gold/20 transition-all duration-500 hover:shadow-xl dark:hover:shadow-black/30"
    >
      <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden">
        <PropertyCardGallery
          images={property.images}
          title={localized.title}
          detailUrl={detailUrl}
          scrollable={scrollableImages}
        />
        <div className="pointer-events-none absolute inset-0 image-overlay opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="pointer-events-none absolute inset-0">
          <div className="pointer-events-auto absolute top-4 left-4">
            <PropertyBadges
              exclusive={property.exclusive}
              luxury={property.luxury}
              featured={property.featured}
              newConstruction={property.newConstruction}
              sold={property.status === 'sold'}
            />
          </div>

          <div className="pointer-events-auto absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleFavorite(property.id)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                toggleFavorite(property.id)
              }
            }}
            className={`p-2 backdrop-blur-sm transition-colors ${
              isFavorite
                ? 'bg-gold text-charcoal'
                : 'bg-warm-white/90 text-charcoal hover:bg-gold hover:text-charcoal dark:bg-graphite/90 dark:text-warm-white dark:hover:bg-gold dark:hover:text-charcoal'
            }`}
            aria-label={
              isFavorite ? t('common.removeFromFavorites') : t('common.addToFavorites')
            }
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </span>
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleCompare(property.id)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                e.stopPropagation()
                toggleCompare(property.id)
              }
            }}
            className={`p-2 backdrop-blur-sm transition-colors ${
              isCompare
                ? 'bg-gold text-charcoal'
                : 'bg-warm-white/90 text-charcoal hover:bg-gold hover:text-charcoal dark:bg-graphite/90 dark:text-warm-white dark:hover:bg-gold dark:hover:text-charcoal'
            }`}
            aria-label={
              isCompare ? t('common.removeFromCompare') : t('common.addToCompare')
            }
          >
            <GitCompareArrows className="w-4 h-4" />
          </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <p className="font-serif text-xl sm:text-2xl text-warm-white drop-shadow-lg">
              {formatPrice(property.price, currency, lang)}
            </p>
            {showImageCounter && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-charcoal/50 backdrop-blur-sm text-warm-white text-xs rounded-sm">
                <Images className="w-3.5 h-3.5" />
                {property.images.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <Link to={detailUrl} className="block p-5 sm:p-6 space-y-3 hover:bg-cream/30 dark:hover:bg-white/5 transition-colors">
        <h3 className="font-serif text-lg sm:text-xl text-charcoal dark:text-warm-white line-clamp-2 group-hover:text-gold transition-colors">
          {localized.title}
        </h3>

        <p className="flex items-center gap-1.5 text-sm text-charcoal/50 dark:text-warm-white/50">
          <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
          {localized.location}
        </p>

        <div className="flex items-center gap-5 pt-2 text-sm text-charcoal/60 dark:text-warm-white/60 border-t border-charcoal/5 dark:border-white/10">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4 text-gold/70" />
              {property.bedrooms}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-gold/70" />
              {property.bathrooms}
            </span>
          )}
          {property.builtArea > 0 && (
            <span className="flex items-center gap-1.5">
              <Maximize className="w-4 h-4 text-gold/70" />
              {formatArea(property.builtArea)}
            </span>
          )}
        </div>
      </Link>
    </motion.article>
  )
}
