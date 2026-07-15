import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useFilterStore } from '@/stores/useFilterStore'
import { SORT_OPTIONS } from '@/utils/constants'
import { getLocalizedText } from '@/utils/format'
import type { Language, SortOption } from '@/types'

interface SortSelectProps {
  className?: string
}

export function SortSelect({ className = '' }: SortSelectProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const { sort, setSort } = useFilterStore()

  const lang = (location.pathname.split('/')[1] as Language) || 'es'

  return (
    <div className={`relative ${className}`}>
      <label className="sr-only">{t('search.sort.featured')}</label>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOption)}
        className="appearance-none pl-4 pr-10 py-2.5 bg-warm-white border border-charcoal/10 text-sm text-charcoal cursor-pointer focus:outline-none focus:border-gold/50 transition-colors"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {getLocalizedText(option.label, lang)}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/30 pointer-events-none" />
    </div>
  )
}
