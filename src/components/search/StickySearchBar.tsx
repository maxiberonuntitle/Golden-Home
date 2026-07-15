import { type FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useFilterStore } from '@/stores/useFilterStore'
import { openFiltersPanel } from '@/utils/filtersNavigation'
import type { Language } from '@/types'

interface StickySearchBarProps {
  visible?: boolean
}

export function StickySearchBar({ visible = true }: StickySearchBarProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { filters, setFilter } = useFilterStore()

  const lang = (location.pathname.split('/')[1] as Language) || 'es'
  const isPropertiesList =
    location.pathname === `/${lang}/properties` ||
    location.pathname.endsWith('/properties')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!isPropertiesList) {
      navigate(`/${lang}/properties`)
    }
  }

  const handleFilters = () => {
    if (isPropertiesList) {
      openFiltersPanel()
      return
    }
    navigate(`/${lang}/properties#filters`)
  }

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="border-t border-charcoal/10 bg-white/80 backdrop-blur-md overflow-hidden"
    >
      <form onSubmit={handleSubmit} className="flex items-center gap-2 py-3">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold pointer-events-none" />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => setFilter('query', e.target.value)}
            onFocus={() => {
              if (!isPropertiesList) navigate(`/${lang}/properties`)
            }}
            placeholder={t('hero.searchPlaceholder')}
            className="w-full pl-10 pr-4 field-input rounded-sm py-2.5"
            aria-label={t('nav.search')}
          />
        </div>
        <button
          type="button"
          onClick={handleFilters}
          className="inline-flex items-center gap-2 shrink-0 px-4 field-input rounded-sm py-2.5 hover:border-gold/40 cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">{t('search.filters')}</span>
        </button>
      </form>
    </motion.div>
  )
}
