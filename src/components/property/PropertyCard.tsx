import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Bed, Bath, Maximize, Heart, GitCompareArrows, MapPin } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import { useLocalizedProperty } from '@/hooks/useLocalizedProperty'
import { formatPrice, formatArea } from '@/utils/format'
import { PropertyBadges } from '@/components/property/PropertyBadges'
import type { Property, Language } from '@/types'

interface PropertyCardProps {
  property: Property
  index?: number
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = (location.pathname.split('/')[1] as Language) || 'es'
  const localized = useLocalizedProperty(property, lang)
  const { favorites, compare, currency, toggleFavorite, toggleCompare } = useAppStore()

  if (!localized) return null

  const isFavorite = favorites.includes(property.id)
  const isCompare = compare.includes(property.id)
  const image = property.images[0]

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <Link
        to={`/${lang}/properties/${property.slug}`}
        className="block overflow-hidden bg-warm-white border border-charcoal/5 hover:border-gold/20 transition-all duration-500 hover:shadow-xl"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={localized.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 image-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-4 left-4">
            <PropertyBadges
              exclusive={property.exclusive}
              luxury={property.luxury}
              featured={property.featured}
              newConstruction={property.newConstruction}
              sold={property.status === 'sold'}
            />
          </div>

          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                toggleFavorite(property.id)
              }}
              className={`p-2 backdrop-blur-sm transition-colors ${
                isFavorite
                  ? 'bg-gold text-charcoal'
                  : 'bg-warm-white/90 text-charcoal hover:bg-gold hover:text-charcoal'
              }`}
              aria-label={
                isFavorite ? t('common.removeFromFavorites') : t('common.addToFavorites')
              }
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                toggleCompare(property.id)
              }}
              className={`p-2 backdrop-blur-sm transition-colors ${
                isCompare
                  ? 'bg-gold text-charcoal'
                  : 'bg-warm-white/90 text-charcoal hover:bg-gold hover:text-charcoal'
              }`}
              aria-label={
                isCompare ? t('common.removeFromCompare') : t('common.addToCompare')
              }
            >
              <GitCompareArrows className="w-4 h-4" />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-serif text-xl sm:text-2xl text-warm-white drop-shadow-lg">
              {formatPrice(property.price, currency, lang)}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-3">
          <h3 className="font-serif text-lg sm:text-xl text-charcoal group-hover:text-gold transition-colors line-clamp-2">
            {localized.title}
          </h3>

          <p className="flex items-center gap-1.5 text-sm text-charcoal/50">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
            {localized.location}
          </p>

          <div className="flex items-center gap-5 pt-2 text-sm text-charcoal/60 border-t border-charcoal/5">
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
        </div>
      </Link>
    </motion.article>
  )
}
