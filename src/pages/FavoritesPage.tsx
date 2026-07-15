import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Heart } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useAppStore } from '@/stores/useAppStore'
import { getAllProperties } from '@/services/propertyService'
import { COMPANY } from '@/utils/constants'

export function FavoritesPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = location.pathname.split('/')[1] || 'es'
  const favorites = useAppStore((state) => state.favorites)

  const favoriteProperties = getAllProperties().filter((property) =>
    favorites.includes(property.id),
  )

  const emptyMessages: Record<string, { title: string; description: string }> = {
    es: {
      title: 'Aún no tiene favoritos',
      description:
        'Guarde las propiedades que le interesen pulsando el icono del corazón para consultarlas más tarde.',
    },
    ca: {
      title: 'Encara no té favorits',
      description:
        'Desi les propietats que li interessin prement la icona del cor i per consultar-les més tard.',
    },
    en: {
      title: 'No favorites yet',
      description:
        'Save properties you are interested in by clicking the heart icon to review them later.',
    },
    fr: {
      title: 'Aucun favori pour le moment',
      description:
        'Enregistrez les propriétés qui vous intéressent en cliquant sur l\'icône cœur pour les consulter plus tard.',
    },
  }

  const empty = emptyMessages[lang] ?? emptyMessages.es

  return (
    <>
      <SEO
        title={`${t('nav.favorites')} | ${COMPANY.name}`}
        description={t('seo.defaultDescription')}
        noindex
      />

      <section className="py-16 lg:py-24">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('nav.favorites')}
              description={
                lang === 'es'
                  ? 'Sus propiedades guardadas para consultar en cualquier momento.'
                  : lang === 'ca'
                    ? 'Les seves propietats desades per consultar en qualsevol moment.'
                    : lang === 'en'
                      ? 'Your saved properties to review at any time.'
                      : 'Vos propriétés enregistrées à consulter à tout moment.'
              }
            />
          </ScrollReveal>

          {favoriteProperties.length > 0 ? (
            <PropertyGrid properties={favoriteProperties} />
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-gold" />
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
