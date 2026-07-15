import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { ArrowUpDown } from 'lucide-react'
import { useFilterStore } from '@/stores/useFilterStore'
import { SORT_OPTIONS } from '@/utils/constants'
import { getLocalizedText } from '@/utils/format'
import { Select } from '@/components/ui/Select'
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
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-charcoal/45 shrink-0">
        {t('search.sortBy')}
      </span>
      <Select
        value={sort}
        onChange={(value) => setSort(value as SortOption)}
        options={SORT_OPTIONS.map((option) => ({
          value: option.value,
          label: getLocalizedText(option.label, lang),
        }))}
        icon={<ArrowUpDown className="h-4 w-4" />}
        selectClassName="min-w-[12rem] sm:min-w-[14rem]"
        aria-label={t('search.sortBy')}
      />
    </div>
  )
}
