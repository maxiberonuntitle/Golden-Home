import { useTranslation } from 'react-i18next'
import { useFilterStore } from '@/stores/useFilterStore'
import { PROPERTY_TYPES, DEFAULT_MAX_PRICE, DEFAULT_MAX_AREA } from '@/utils/constants'
import { Button } from '@/components/ui/Button'
import { getLocalizedText } from '@/utils/format'
import { useLocation } from 'react-router-dom'
import type { Language, PropertyType } from '@/types'

interface FilterPanelProps {
  className?: string
}

export function FilterPanel({ className = '' }: FilterPanelProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const { filters, setFilter, resetFilters } = useFilterStore()

  const lang = (location.pathname.split('/')[1] as Language) || 'es'

  const featureFilters = [
    { key: 'pool' as const, label: t('search.features.pool') },
    { key: 'seaViews' as const, label: t('search.features.seaViews') },
    { key: 'garden' as const, label: t('search.features.garden') },
    { key: 'parking' as const, label: t('search.features.parking') },
    { key: 'elevator' as const, label: t('search.features.elevator') },
    { key: 'terrace' as const, label: t('search.features.terrace') },
    { key: 'newConstruction' as const, label: t('search.features.newConstruction') },
    { key: 'luxury' as const, label: t('search.features.luxury') },
    { key: 'exclusive' as const, label: t('search.features.exclusive') },
    { key: 'nearBeach' as const, label: t('search.features.nearBeach') },
    { key: 'mountain' as const, label: t('search.features.mountain') },
    { key: 'investment' as const, label: t('search.features.investment') },
  ]

  const bedroomOptions = [null, 1, 2, 3, 4, 5, 6] as const
  const bathroomOptions = [null, 1, 2, 3, 4, 5] as const

  return (
    <aside className={`space-y-8 ${className}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
          {t('search.filters')}
        </h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs text-charcoal/50 hover:text-gold transition-colors"
        >
          {t('search.clearFilters')}
        </button>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-charcoal">{t('search.reference')}</label>
        <input
          type="text"
          value={filters.reference}
          onChange={(e) => setFilter('reference', e.target.value)}
          className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-charcoal/10 text-sm focus:outline-none focus:border-gold/50 focus:bg-white/55 transition-colors"
          placeholder="GH-2026-001"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-charcoal">{t('search.type')}</label>
        <select
          value={filters.type}
          onChange={(e) => setFilter('type', e.target.value as PropertyType | '')}
          className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-charcoal/10 text-sm appearance-none cursor-pointer focus:outline-none focus:border-gold/50 focus:bg-white/55 transition-colors"
        >
          <option value="">{t('search.type')}</option>
          {PROPERTY_TYPES.map((pt) => (
            <option key={pt.value} value={pt.value}>
              {getLocalizedText(pt.label, lang)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-charcoal">{t('search.price')}</label>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={DEFAULT_MAX_PRICE}
            step={100_000}
            value={filters.priceMin}
            onChange={(e) => setFilter('priceMin', Number(e.target.value))}
            className="w-full accent-gold"
          />
          <input
            type="range"
            min={0}
            max={DEFAULT_MAX_PRICE}
            step={100_000}
            value={filters.priceMax}
            onChange={(e) => setFilter('priceMax', Number(e.target.value))}
            className="w-full accent-gold"
          />
          <div className="flex justify-between text-xs text-charcoal/50">
            <span>€{filters.priceMin.toLocaleString('es-ES')}</span>
            <span>€{filters.priceMax.toLocaleString('es-ES')}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-charcoal">{t('search.bedrooms')}</label>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((n) => (
            <button
              key={n ?? 'any'}
              type="button"
              onClick={() => setFilter('bedrooms', n)}
              className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                filters.bedrooms === n
                  ? 'bg-gold text-charcoal border-gold'
                  : 'bg-transparent text-charcoal/60 border-charcoal/10 hover:border-gold/30'
              }`}
            >
              {n === null ? '—' : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-charcoal">{t('search.bathrooms')}</label>
        <div className="flex flex-wrap gap-2">
          {bathroomOptions.map((n) => (
            <button
              key={n ?? 'any'}
              type="button"
              onClick={() => setFilter('bathrooms', n)}
              className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                filters.bathrooms === n
                  ? 'bg-gold text-charcoal border-gold'
                  : 'bg-transparent text-charcoal/60 border-charcoal/10 hover:border-gold/30'
              }`}
            >
              {n === null ? '—' : `${n}+`}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-charcoal">{t('property.builtArea')}</label>
        <div className="space-y-3">
          <input
            type="range"
            min={0}
            max={DEFAULT_MAX_AREA}
            step={50}
            value={filters.areaMin}
            onChange={(e) => setFilter('areaMin', Number(e.target.value))}
            className="w-full accent-gold"
          />
          <input
            type="range"
            min={0}
            max={DEFAULT_MAX_AREA}
            step={50}
            value={filters.areaMax}
            onChange={(e) => setFilter('areaMax', Number(e.target.value))}
            className="w-full accent-gold"
          />
          <div className="flex justify-between text-xs text-charcoal/50">
            <span>{filters.areaMin} m²</span>
            <span>{filters.areaMax} m²</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-charcoal">{t('search.province')}</label>
        <input
          type="text"
          value={filters.province}
          onChange={(e) => setFilter('province', e.target.value)}
          className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-charcoal/10 text-sm focus:outline-none focus:border-gold/50 focus:bg-white/55 transition-colors"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-charcoal">{t('search.city')}</label>
        <input
          type="text"
          value={filters.city}
          onChange={(e) => setFilter('city', e.target.value)}
          className="w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-charcoal/10 text-sm focus:outline-none focus:border-gold/50 focus:bg-white/55 transition-colors"
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-charcoal">{t('search.features')}</label>
        <div className="space-y-2">
          {featureFilters.map((feature) => (
            <label
              key={feature.key}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters[feature.key]}
                onChange={(e) => setFilter(feature.key, e.target.checked)}
                className="w-4 h-4 accent-gold border-charcoal/20"
              />
              <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">
                {feature.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button variant="primary" size="md" className="w-full" onClick={resetFilters}>
        {t('search.clearFilters')}
      </Button>
    </aside>
  )
}
