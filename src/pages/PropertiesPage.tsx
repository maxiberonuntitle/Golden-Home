import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { FilterPanel } from '@/components/search/FilterPanel'
import { SortSelect } from '@/components/search/SortSelect'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useProperties } from '@/hooks/useProperties'
import { useFilterStore } from '@/stores/useFilterStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { COMPANY } from '@/utils/constants'
import { openFiltersPanel } from '@/utils/filtersNavigation'
import type { Language } from '@/types'

const PAGE_SIZE = 6

export function PropertiesPage() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const filters = useFilterStore((state) => state.filters)
  const allFiltered = useProperties(lang)

  const visibleProperties = useMemo(
    () => allFiltered.slice(0, visibleCount),
    [allFiltered, visibleCount],
  )

  const hasMore = visibleCount < allFiltered.length

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allFiltered.length))
  }, [allFiltered.length])

  const sentinelRef = useInfiniteScroll(loadMore, { enabled: hasMore })

  const filterKey = JSON.stringify(filters)

  useEffect(() => {
    setVisibleCount(PAGE_SIZE)
  }, [filterKey])

  useEffect(() => {
    if (location.hash !== '#filters') return
    if (isDesktop) {
      openFiltersPanel()
      return
    }
    setMobileFiltersOpen(true)
  }, [location.hash, isDesktop])

  useEffect(() => {
    const onOpenFilters = () => {
      if (!isDesktop) setMobileFiltersOpen(true)
    }
    window.addEventListener('gh:open-filters', onOpenFilters)
    return () => window.removeEventListener('gh:open-filters', onOpenFilters)
  }, [isDesktop])

  return (
    <>
      <SEO
        title={t('seo.propertiesTitle')}
        description={t('seo.propertiesDescription')}
        keywords={t('seo.defaultKeywords')}
        url={`${COMPANY.website}/${lang}/properties`}
      />

      <section className="py-12 lg:py-16 border-b border-charcoal/5 dark:border-white/10">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('nav.properties')}
              description={
                lang === 'es'
                  ? 'Explore nuestra cartera de villas, apartamentos y fincas en Lloret de Mar y la Costa Brava.'
                  : lang === 'ca'
                    ? 'Explori la nostra cartera de viles, apartaments i masies a Lloret de Mar i la Costa Brava.'
                    : lang === 'en'
                      ? 'Explore our portfolio of villas, apartments and estates in Lloret de Mar and the Costa Brava.'
                      : 'Explorez notre portefeuille de villas, appartements et domaines à Lloret de Mar et sur la Costa Brava.'
              }
            />
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {isDesktop ? (
              <div
                id="property-filters"
                className="lg:w-72 xl:w-80 shrink-0 scroll-mt-[var(--header-sticky-offset)]"
              >
                <div className="sticky top-[var(--header-sticky-offset)] transition-[top] duration-200 ease-out p-6 bg-white/90 dark:bg-graphite/90 backdrop-blur-xl border border-charcoal/10 dark:border-white/10 rounded-xl shadow-sm shadow-charcoal/[0.06] dark:shadow-black/20 max-h-[calc(100dvh-var(--header-sticky-offset)-1rem)] overflow-y-auto">
                  <FilterPanel />
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-white/55 dark:bg-graphite/55 backdrop-blur-md border border-charcoal/10 dark:border-white/10 rounded-lg text-sm font-medium shadow-sm shadow-charcoal/[0.04] dark:shadow-black/20 hover:border-gold/35 hover:bg-white/70 dark:hover:bg-graphite/70 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {t('search.filters')}
                </button>
                {mobileFiltersOpen && (
                  <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm">
                    <div
                      id="property-filters"
                      className="absolute inset-y-0 left-0 w-full max-w-sm bg-white/95 dark:bg-graphite/95 backdrop-blur-xl border-r border-charcoal/10 dark:border-white/10 p-6 overflow-y-auto scroll-mt-[var(--header-sticky-offset)]"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-serif text-xl text-charcoal dark:text-warm-white">{t('search.filters')}</h2>
                        <button
                          type="button"
                          onClick={() => setMobileFiltersOpen(false)}
                          className="text-charcoal/60 hover:text-charcoal dark:text-warm-white/60 dark:hover:text-warm-white"
                        >
                          ✕
                        </button>
                      </div>
                      <FilterPanel />
                    </div>
                    <button
                      type="button"
                      className="absolute inset-0 -z-10"
                      onClick={() => setMobileFiltersOpen(false)}
                      aria-label="Close filters"
                    />
                  </div>
                )}
              </>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <p className="text-charcoal/60 dark:text-warm-white/60 text-sm">
                  {allFiltered.length > 0
                    ? t('search.results', { count: allFiltered.length })
                    : t('search.noResults')}
                </p>
                <SortSelect />
              </div>

              {allFiltered.length > 0 ? (
                <>
                  <PropertyGrid properties={visibleProperties} />
                  {hasMore && <div ref={sentinelRef} className="h-10 mt-8" aria-hidden />}
                </>
              ) : (
                <div className="text-center py-20">
                  <p className="text-charcoal/60 dark:text-warm-white/60 max-w-md mx-auto">{t('search.noResults')}</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
