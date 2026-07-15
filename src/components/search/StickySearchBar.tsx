import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Search, MapPin } from 'lucide-react'
import { useFilterStore } from '@/stores/useFilterStore'
import { useAppStore } from '@/stores/useAppStore'
import { searchPropertiesByQuery } from '@/services/propertyService'
import { formatPrice, getLocalizedText } from '@/utils/format'
import type { Language } from '@/types'

const PREVIEW_LIMIT = 6

export function StickySearchBar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { filters, setFilter } = useFilterStore()
  const currency = useAppStore((state) => state.currency)

  const lang = (location.pathname.split('/')[1] as Language) || 'es'
  const [open, setOpen] = useState(false)

  const query = filters.query.trim()
  const allMatches = useMemo(
    () => (query.length >= 2 ? searchPropertiesByQuery(query, lang) : []),
    [query, lang],
  )
  const previewMatches = allMatches.slice(0, PREVIEW_LIMIT)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const goToAllResults = () => {
    setOpen(false)
    navigate(`/${lang}/properties`)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!query) return
    goToAllResults()
  }

  const handleSelect = () => {
    setOpen(false)
    inputRef.current?.blur()
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full w-full items-center" role="search">
      <div ref={containerRef} className="relative w-full min-w-0">
        <input
          ref={inputRef}
          type="search"
          value={filters.query}
          onChange={(e) => {
            setFilter('query', e.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            if (query.length >= 2) setOpen(true)
          }}
          placeholder={t('hero.searchPlaceholder')}
          className="field-input w-full !py-2.5 pr-[5.5rem] sm:pr-28"
          aria-label={t('nav.search')}
          aria-expanded={open && query.length >= 2}
          aria-controls="global-search-results"
          autoComplete="off"
        />
        <button
          type="submit"
          disabled={!query}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 inline-flex items-center gap-1.5 h-[34px] px-3 rounded-md bg-gold text-charcoal text-sm font-medium hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{t('nav.search')}</span>
        </button>

        {open && query.length >= 2 && (
          <div
            id="global-search-results"
            className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-xl border border-charcoal/10 bg-white/95 backdrop-blur-xl shadow-xl shadow-charcoal/10"
          >
            {previewMatches.length > 0 ? (
              <ul className="max-h-80 overflow-y-auto py-1">
                {previewMatches.map((property) => {
                  const title = getLocalizedText(property.title, lang)
                  const propertyLocation = getLocalizedText(property.location, lang)

                  return (
                    <li key={property.id}>
                      <Link
                        to={`/${lang}/properties/${property.slug}`}
                        onClick={handleSelect}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-gold/10 transition-colors"
                      >
                        <div className="h-12 w-14 shrink-0 overflow-hidden rounded-md bg-cream">
                          {property.images[0] ? (
                            <img
                              src={property.images[0]}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-charcoal">{title}</p>
                          <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-charcoal/55">
                            <MapPin className="h-3 w-3 shrink-0 text-gold" />
                            {propertyLocation}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm font-medium text-gold">
                          {formatPrice(property.price, currency, lang)}
                        </p>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="px-4 py-5 text-sm text-charcoal/55">{t('search.noMatches')}</p>
            )}

            {allMatches.length > 0 && (
              <button
                type="button"
                onClick={goToAllResults}
                className="w-full border-t border-charcoal/8 px-4 py-3 text-left text-sm font-medium text-gold hover:bg-gold/5 transition-colors"
              >
                {t('search.viewAllResults', { count: allMatches.length })}
              </button>
            )}
          </div>
        )}
      </div>
    </form>
  )
}
