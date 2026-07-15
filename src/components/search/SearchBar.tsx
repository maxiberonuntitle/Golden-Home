import { useState, type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, MapPin, Home, ChevronDown } from 'lucide-react'
import { useFilterStore } from '@/stores/useFilterStore'
import { PROPERTY_TYPES, DEFAULT_MAX_PRICE } from '@/utils/constants'
import { Button } from '@/components/ui/Button'
import { getLocalizedText } from '@/utils/format'
import type { Language, PropertyType } from '@/types'

const LOCATIONS = [
  'Lloret de Mar',
  'Tossa de Mar',
  'Blanes',
  "Platja d'Aro",
  "Santa Cristina d'Aro",
]

const PRICE_RANGES = [
  { label: 'Any', min: 0, max: DEFAULT_MAX_PRICE },
  { label: '€500K – €1M', min: 500_000, max: 1_000_000 },
  { label: '€1M – €3M', min: 1_000_000, max: 3_000_000 },
  { label: '€3M – €5M', min: 3_000_000, max: 5_000_000 },
  { label: '€5M+', min: 5_000_000, max: DEFAULT_MAX_PRICE },
]

export function SearchBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { filters, setFilter } = useFilterStore()

  const lang = (location.pathname.split('/')[1] as Language) || 'es'

  const [city, setCity] = useState(filters.city)
  const [type, setType] = useState<PropertyType | ''>(filters.type)
  const [priceRange, setPriceRange] = useState(0)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const range = PRICE_RANGES[priceRange]
    setFilter('city', city)
    setFilter('type', type)
    setFilter('priceMin', range.min)
    setFilter('priceMax', range.max)
    navigate(`/${lang}/properties`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto bg-warm-white/95 backdrop-blur-xl border border-charcoal/10 shadow-2xl p-2 sm:p-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-0">
        <div className="relative sm:border-r border-charcoal/10">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-11 pr-8 py-4 bg-transparent text-sm text-charcoal appearance-none cursor-pointer focus:outline-none"
            aria-label={t('search.city')}
          >
            <option value="">{t('search.city')}</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
        </div>

        <div className="relative sm:border-r border-charcoal/10">
          <Home className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gold" />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as PropertyType | '')}
            className="w-full pl-11 pr-8 py-4 bg-transparent text-sm text-charcoal appearance-none cursor-pointer focus:outline-none"
            aria-label={t('search.type')}
          >
            <option value="">{t('search.type')}</option>
            {PROPERTY_TYPES.map((pt) => (
              <option key={pt.value} value={pt.value}>
                {getLocalizedText(pt.label, lang)}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
        </div>

        <div className="relative sm:border-r border-charcoal/10">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full px-4 py-4 bg-transparent text-sm text-charcoal appearance-none cursor-pointer focus:outline-none"
            aria-label={t('search.price')}
          >
            {PRICE_RANGES.map((range, i) => (
              <option key={i} value={i}>
                {i === 0 ? t('search.price') : range.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
        </div>

        <Button type="submit" size="lg" className="w-full h-full min-h-[52px]">
          <Search className="w-4 h-4" />
          {t('nav.search')}
        </Button>
      </div>
    </form>
  )
}
