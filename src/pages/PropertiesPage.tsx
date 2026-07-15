import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
import type { Language } from '@/types'

const PAGE_SIZE = 6

export function PropertiesPage() {
  const { t, i18n } = useTranslation()
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

  return (
    <>
      <SEO
        title={`${t('nav.properties')} | ${COMPANY.name}`}
        description={t('seo.defaultDescription')}
        url={`${COMPANY.website}/${lang}/properties`}
      />

      <section className="py-12 lg:py-16 border-b border-charcoal/5">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('nav.properties')}
              description={
                lang === 'es'
                  ? 'Explore nuestra cartera exclusiva de villas, apartamentos y fincas de lujo en Lloret de Mar y la Costa Brava.'
                  : lang === 'ca'
                    ? 'Explori la nostra cartera exclusiva de viles, apartaments i masies de luxe a Lloret de Mar i la Costa Brava.'
                    : lang === 'en'
                      ? 'Explore our exclusive portfolio of luxury villas, apartments and estates in Lloret de Mar and the Costa Brava.'
                      : 'Explorez notre portefeuille exclusif de villas, appartements et domaines de luxe à Lloret de Mar et sur la Costa Brava.'
              }
            />
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-12 lg:py-16">
        <Container>
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {isDesktop ? (
              <div className="lg:w-72 xl:w-80 shrink-0">
                <div className="sticky top-24 p-6 bg-cream rounded-xl">
                  <FilterPanel />
                </div>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(true)}
                  className="flex items-center justify-center gap-2 px-4 py-3 border border-charcoal/15 rounded-lg text-sm font-medium"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {t('search.filters')}
                </button>
                {mobileFiltersOpen && (
                  <div className="fixed inset-0 z-50 bg-charcoal/50">
                    <div className="absolute inset-y-0 left-0 w-full max-w-sm bg-warm-white p-6 overflow-y-auto">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="font-serif text-xl">{t('search.filters')}</h2>
                        <button
                          type="button"
                          onClick={() => setMobileFiltersOpen(false)}
                          className="text-charcoal/60 hover:text-charcoal"
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
                <p className="text-charcoal/60 text-sm">
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
                  <p className="text-charcoal/60 max-w-md mx-auto">{t('search.noResults')}</p>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
