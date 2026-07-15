import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GitCompare, X } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useAppStore } from '@/stores/useAppStore'
import { getAllProperties } from '@/services/propertyService'
import { useLocalizedProperty } from '@/hooks/useLocalizedProperty'
import { formatArea, formatPrice } from '@/utils/format'
import { COMPANY } from '@/utils/constants'
import type { Language, Property } from '@/types'

const FEATURE_KEYS = [
  'pool',
  'seaViews',
  'garden',
  'parking',
  'terrace',
  'luxury',
  'exclusive',
  'nearBeach',
] as const

function CompareCell({ property, lang }: { property: Property; lang: Language }) {
  const { t } = useTranslation()
  const localized = useLocalizedProperty(property, lang)
  const currency = useAppStore((state) => state.currency)
  const toggleCompare = useAppStore((state) => state.toggleCompare)

  if (!localized) return null

  return (
    <div className="min-w-[280px] flex-1">
      <div className="relative mb-4">
        <img
          src={property.images[0]}
          alt={localized.title}
          className="w-full aspect-[4/3] object-cover rounded-lg"
        />
        <button
          type="button"
          onClick={() => toggleCompare(property.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          aria-label={t('common.removeFromCompare')}
        >
          <X className="w-4 h-4 text-charcoal" />
        </button>
      </div>
      <p className="font-serif text-xl text-charcoal line-clamp-2">
        {localized.title}
      </p>
      <p className="text-gold font-medium mt-1">
        {formatPrice(localized.price, currency, lang)}
      </p>
      <p className="text-sm text-charcoal/60 mt-1">{localized.location}</p>

      <dl className="mt-6 space-y-3 text-sm">
        <div className="flex justify-between border-b border-charcoal/10 pb-2">
          <dt className="text-charcoal/60">{t('property.reference')}</dt>
          <dd className="font-medium">{property.reference}</dd>
        </div>
        <div className="flex justify-between border-b border-charcoal/10 pb-2">
          <dt className="text-charcoal/60">{t('search.type')}</dt>
          <dd className="font-medium capitalize">{localized.type}</dd>
        </div>
        <div className="flex justify-between border-b border-charcoal/10 pb-2">
          <dt className="text-charcoal/60">{t('property.bedrooms')}</dt>
          <dd className="font-medium">{property.bedrooms}</dd>
        </div>
        <div className="flex justify-between border-b border-charcoal/10 pb-2">
          <dt className="text-charcoal/60">{t('property.bathrooms')}</dt>
          <dd className="font-medium">{property.bathrooms}</dd>
        </div>
        <div className="flex justify-between border-b border-charcoal/10 pb-2">
          <dt className="text-charcoal/60">{t('property.builtArea')}</dt>
          <dd className="font-medium">{formatArea(property.builtArea)}</dd>
        </div>
        <div className="flex justify-between border-b border-charcoal/10 pb-2">
          <dt className="text-charcoal/60">{t('property.plotArea')}</dt>
          <dd className="font-medium">{formatArea(property.plotArea)}</dd>
        </div>
        <div className="flex justify-between border-b border-charcoal/10 pb-2">
          <dt className="text-charcoal/60">{t('property.energyCertificate')}</dt>
          <dd className="font-medium">{property.energyCertificate}</dd>
        </div>
        {FEATURE_KEYS.map((key) => (
          <div key={key} className="flex justify-between border-b border-charcoal/10 pb-2">
            <dt className="text-charcoal/60">{t(`search.features.${key}`)}</dt>
            <dd className="font-medium">{property[key] ? '✓' : '—'}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function ComparePage() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = (location.pathname.split('/')[1] || 'es') as Language
  const compare = useAppStore((state) => state.compare)

  const compareProperties = getAllProperties().filter((property) =>
    compare.includes(property.id),
  )

  const emptyMessages: Record<string, { title: string; description: string }> = {
    es: {
      title: 'Seleccione propiedades para comparar',
      description:
        'Añada hasta 3 propiedades desde la cartera para comparar precio, características y ubicación lado a lado.',
    },
    ca: {
      title: 'Seleccioni propietats per comparar',
      description:
        'Afegeixi fins a 3 propietats des de la cartera per comparar preu, característiques i ubicació costat a costat.',
    },
    en: {
      title: 'Select properties to compare',
      description:
        'Add up to 3 properties from the portfolio to compare price, features and location side by side.',
    },
    fr: {
      title: 'Sélectionnez des propriétés à comparer',
      description:
        'Ajoutez jusqu\'à 3 propriétés du portefeuille pour comparer prix, caractéristiques et emplacement côte à côte.',
    },
  }

  const empty = emptyMessages[lang] ?? emptyMessages.es

  return (
    <>
      <SEO
        title={`${t('nav.compare')} | ${COMPANY.name}`}
        description={t('seo.defaultDescription')}
        noindex
      />

      <section className="py-16 lg:py-24">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('nav.compare')}
              description={
                lang === 'es'
                  ? 'Compare hasta 3 propiedades para tomar la mejor decisión de inversión.'
                  : lang === 'ca'
                    ? 'Compari fins a 3 propietats per prendre la millor decisió d\'inversió.'
                    : lang === 'en'
                      ? 'Compare up to 3 properties to make the best investment decision.'
                      : 'Comparez jusqu\'à 3 propriétés pour prendre la meilleure décision d\'investissement.'
              }
            />
          </ScrollReveal>

          {compareProperties.length > 0 ? (
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-8 min-w-max lg:min-w-0 lg:grid lg:grid-cols-3">
                {compareProperties.map((property) => (
                  <CompareCell key={property.id} property={property} lang={lang} />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <GitCompare className="w-8 h-8 text-gold" />
              </div>
              <h2 className="font-serif text-2xl text-charcoal mb-3">{empty.title}</h2>
              <p className="text-charcoal/60 max-w-md mx-auto mb-8">{empty.description}</p>
              <Link to={`/${lang}/properties`}>
                <Button variant="primary" size="lg">
                  {t('nav.properties')}
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
