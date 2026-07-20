import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import {
  Building2,
  Crown,
  Home as HomeIcon,
  Shield,
  Award,
  Users,
  MapPin,
  ArrowRight,
  Camera,
  ChevronDown,
} from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { SearchBar } from '@/components/search/SearchBar'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PropertyCard } from '@/components/property/PropertyCard'
import { PropertiesMap } from '@/components/property/PropertiesMap'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { HeroBackgroundSlideshow } from '@/components/home/HeroBackgroundSlideshow'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { getFeaturedProperties, getLatestProperties, getAllProperties } from '@/services/propertyService'
import { COMPANY, SOCIAL } from '@/utils/constants'
import { getLocalizedText } from '@/utils/format'
import { useFilterStore } from '@/stores/useFilterStore'
import type { Language, PropertyType } from '@/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const CATEGORY_TYPES: { type: PropertyType; icon: typeof HomeIcon; labelKey: string }[] = [
  { type: 'villa', icon: HomeIcon, labelKey: 'villa' },
  { type: 'apartment', icon: Building2, labelKey: 'apartment' },
  { type: 'penthouse', icon: Crown, labelKey: 'penthouse' },
]

const WHY_CHOOSE_KEYS = ['expertise', 'portfolio', 'service', 'location'] as const
const WHY_ICONS = [Award, Shield, Users, MapPin] as const

const INSTAGRAM_IMAGES = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
]

export function HomePage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language
  const scrollY = useScrollPosition()
  const setFilter = useFilterStore((state) => state.setFilter)

  const featured = getFeaturedProperties()
  const latest = getLatestProperties(6)
  const mapProperties = getAllProperties()

  const parallaxOffset = scrollY * 0.3

  return (
    <>
      <SEO
        title={t('seo.defaultTitle')}
        description={t('seo.defaultDescription')}
        keywords={t('seo.defaultKeywords')}
        url={`${COMPANY.website}/${lang}`}
      />

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-start overflow-hidden pt-[16vh] sm:pt-[18vh] lg:pt-[20vh]">
        <div className="absolute inset-0 overflow-hidden">
          <HeroBackgroundSlideshow />
          <div className="absolute inset-0 image-overlay" />
        </div>

        <Container className="relative z-10 pb-20">
          <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-gold drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)] sm:text-sm"
            >
              {getLocalizedText(COMPANY.tagline, lang)}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mx-auto mb-4 font-serif text-2xl uppercase leading-tight tracking-[0.1em] text-warm-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto max-w-xl text-sm leading-relaxed text-warm-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] sm:text-base md:max-w-2xl md:text-lg"
            >
              {t('hero.subtitle')}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <SearchBar />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="flex justify-center mt-10"
          >
            <Link
              to={`/${lang}/properties`}
              className="group inline-flex flex-col items-center gap-3 text-warm-white/75 hover:text-gold transition-colors duration-300"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-medium">
                {t('hero.viewProperties')}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-warm-white/25 bg-warm-white/5 backdrop-blur-sm transition-all duration-300 group-hover:border-gold/40 group-hover:bg-gold/10">
                <ChevronDown className="h-5 w-5 opacity-80 group-hover:opacity-100 transition-opacity" />
              </span>
            </Link>
          </motion.div>
        </Container>
      </section>

      {/* Featured Properties */}
      <section className="py-20 lg:py-28">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('home.featuredTitle')}
              description={t('home.featuredSubtitle')}
            />
          </ScrollReveal>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            nested
            touchStartPreventDefault={false}
            className="featured-swiper !pb-12"
          >
            {featured.map((property, index) => (
              <SwiperSlide key={property.id} className="!h-auto">
                <PropertyCard property={property} index={index} scrollableImages />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-20 lg:py-28 bg-cream dark:bg-graphite">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('home.categoriesTitle')} />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-3 gap-3 sm:gap-8">
              {CATEGORY_TYPES.map(({ type, icon: Icon, labelKey }) => (
                <Link
                  key={type}
                  to={`/${lang}/properties`}
                  onClick={() => setFilter('type', type)}
                  className="group block text-center p-4 sm:p-10 bg-warm-white dark:bg-charcoal rounded-xl border border-charcoal/5 dark:border-white/10 hover:border-gold/30 hover:shadow-lg transition-all duration-500"
                >
                  <div className="w-11 h-11 sm:w-16 sm:h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 sm:mb-6 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-gold" />
                  </div>
                  <h3 className="font-serif text-sm sm:text-xl text-charcoal dark:text-warm-white group-hover:text-gold transition-colors capitalize leading-snug">
                    {labelKey === 'villa' && (lang === 'es' ? 'Villas' : lang === 'ca' ? 'Viles' : lang === 'en' ? 'Villas' : 'Villas')}
                    {labelKey === 'apartment' && (lang === 'es' ? 'Apartamentos' : lang === 'ca' ? 'Apartaments' : lang === 'en' ? 'Apartments' : 'Appartements')}
                    {labelKey === 'penthouse' && (lang === 'es' ? 'Áticos' : lang === 'ca' ? 'Àtics' : lang === 'en' ? 'Penthouses' : 'Penthouses')}
                  </h3>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Why Choose */}
      <section className="py-20 lg:py-28">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('home.whyChooseTitle')} />
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
              {WHY_CHOOSE_KEYS.map((key, index) => {
                const Icon = WHY_ICONS[index]
                return (
                  <div key={key} className="text-center p-4 sm:p-6">
                    <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 sm:mb-5">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                    </div>
                    <h3 className="font-serif text-base sm:text-lg text-charcoal dark:text-warm-white mb-2 sm:mb-3 leading-snug">
                      {t(`home.whyChoose.${key}.title`)}
                    </h3>
                    <p className="text-charcoal/60 dark:text-warm-white/60 text-xs sm:text-sm leading-relaxed">
                      {t(`home.whyChoose.${key}.description`)}
                    </p>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Lifestyle */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden py-28 lg:py-36">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
            transform: `translate3d(0, ${Math.min(parallaxOffset * 0.35, 80)}px, 0) scale(1.12)`,
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-charcoal/75 via-charcoal/55 to-charcoal/80"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          aria-hidden
        />

        <Container className="relative z-10">
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-gold sm:text-sm">
                {t('home.lifestyleEyebrow')}
              </p>
              <h2 className="font-serif text-3xl leading-tight text-balance text-warm-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-5xl">
                {t('home.lifestyleTitle')}
              </h2>
              <div className="mx-auto my-7 h-px w-16 bg-gold/70" aria-hidden />
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-balance text-warm-white/85 sm:text-lg">
                {t('home.lifestyleText')}
              </p>
              <div className="mt-10">
                <Link to={`/${lang}/properties`}>
                  <Button variant="primary" size="lg">
                    {t('home.lifestyleCta')}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Properties Map */}
      <section className="py-20 lg:py-28 bg-cream dark:bg-graphite">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={
                lang === 'es'
                  ? 'Propiedades en el mapa'
                  : lang === 'ca'
                    ? 'Propietats al mapa'
                    : lang === 'en'
                      ? 'Properties on the map'
                      : 'Propriétés sur la carte'
              }
              description={
                lang === 'es'
                  ? 'Descubra nuestra cartera geolocalizada en Lloret de Mar y la Costa Brava.'
                  : lang === 'ca'
                    ? 'Descobreixi la nostra cartera geolocalitzada a Lloret de Mar i la Costa Brava.'
                    : lang === 'en'
                      ? 'Discover our geolocated portfolio in Lloret de Mar and the Costa Brava.'
                      : 'Découvrez notre portefeuille géolocalisé à Lloret de Mar et sur la Costa Brava.'
              }
            />
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative">
              <PropertiesMap properties={mapProperties} lang={lang} />
              <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-[1000] flex items-end justify-between gap-4">
                <p className="pointer-events-none rounded-md bg-warm-white/90 dark:bg-graphite/90 px-3 py-1.5 text-sm text-charcoal/70 dark:text-warm-white/70 shadow-sm backdrop-blur-sm">
                  {mapProperties.length}{' '}
                  {lang === 'es'
                    ? 'propiedades'
                    : lang === 'ca'
                      ? 'propietats'
                      : lang === 'en'
                        ? 'properties'
                        : 'propriétés'}
                </p>
                <Link to={`/${lang}/properties`} className="pointer-events-auto">
                  <Button variant="dark" size="sm">
                    {t('common.viewAll')}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Latest Listings */}
      <section className="py-20 lg:py-28">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('home.latestTitle')} />
          </ScrollReveal>
          <PropertyGrid properties={latest} scrollableImages />
          <div className="text-center mt-12">
            <Link to={`/${lang}/properties`}>
              <Button variant="secondary" size="lg">
                {t('common.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 luxury-gradient">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="font-serif text-3xl sm:text-4xl text-warm-white mb-6">
                {t('home.ctaTitle')}
              </h2>
              <p className="text-warm-white/70 text-lg mb-8 leading-relaxed">
                {t('home.ctaSubtitle')}
              </p>
              <Link to={`/${lang}/contact`}>
                <Button variant="primary" size="lg">
                  {t('home.ctaButton')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Instagram */}
      <section className="py-20 lg:py-28 bg-cream dark:bg-graphite">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('home.instagramTitle')}
              description={
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold-dark transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  @goldenhomelloret
                </a>
              }
            />
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {INSTAGRAM_IMAGES.map((image, index) => (
              <ScrollReveal key={image} delay={index * 0.05}>
                <a
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square overflow-hidden rounded-lg group"
                >
                  <img
                    src={image}
                    alt={`Instagram ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </a>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact CTA */}
      <section className="py-20 lg:py-28">
        <Container>
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 items-center p-10 lg:p-16 bg-cream dark:bg-graphite rounded-2xl">
              <div>
                <h2 className="font-serif text-3xl text-charcoal dark:text-warm-white mb-4">
                  {lang === 'es'
                    ? 'Visite nuestra oficina en Lloret de Mar'
                    : lang === 'ca'
                      ? 'Visiti la nostra oficina a Lloret de Mar'
                      : lang === 'en'
                        ? 'Visit our office in Lloret de Mar'
                        : 'Visitez notre bureau à Lloret de Mar'}
                </h2>
                <p className="text-charcoal/60 dark:text-warm-white/60 leading-relaxed mb-6">
                  {COMPANY.address}
                </p>
                <p className="text-charcoal/60 dark:text-warm-white/60">
                  {COMPANY.phone} · {COMPANY.email}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
                <Link to={`/${lang}/contact`}>
                  <Button variant="primary" size="lg" className="w-full">
                    {t('common.contactUs')}
                  </Button>
                </Link>
                <Button href={COMPANY.whatsapp} variant="secondary" size="lg" className="w-full">
                  {t('common.whatsapp')}
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  )
}
