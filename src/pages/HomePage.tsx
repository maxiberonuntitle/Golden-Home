import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
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
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { getFeaturedProperties, getLatestProperties, getAllProperties } from '@/services/propertyService'
import { COMPANY, PARTNERS, SOCIAL } from '@/utils/constants'
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
  const shouldReduceMotion = useReducedMotion()
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
        url={`${COMPANY.website}/${lang}`}
      />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -inset-[15%] will-change-transform"
            initial={{ scale: 1 }}
            animate={{ scale: shouldReduceMotion ? 1 : 1.14 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 11,
              ease: [0.22, 1, 0.36, 1],
              repeat: shouldReduceMotion ? 0 : Infinity,
              repeatType: 'reverse',
            }}
          >
            <img
              src="/blanes-background.png"
              alt=""
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
          </motion.div>
          <div className="absolute inset-0 image-overlay" />
        </div>

        <Container className="relative z-10 pt-8 pb-20">
          <div className="text-center mb-12">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-gold text-sm uppercase tracking-[0.3em] mb-6"
            >
              {getLocalizedText(COMPANY.tagline, lang)}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-warm-white leading-tight max-w-4xl mx-auto mb-6"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-warm-white/80 text-lg max-w-2xl mx-auto leading-relaxed"
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
          <div className="grid sm:grid-cols-3 gap-8">
            {CATEGORY_TYPES.map(({ type, icon: Icon, labelKey }, index) => (
              <ScrollReveal key={type} delay={index * 0.1}>
                <Link
                  to={`/${lang}/properties`}
                  onClick={() => setFilter('type', type)}
                  className="group block text-center p-10 bg-warm-white dark:bg-charcoal rounded-xl border border-charcoal/5 dark:border-white/10 hover:border-gold/30 hover:shadow-lg transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal dark:text-warm-white group-hover:text-gold transition-colors capitalize">
                    {labelKey === 'villa' && (lang === 'es' ? 'Villas' : lang === 'ca' ? 'Viles' : lang === 'en' ? 'Villas' : 'Villas')}
                    {labelKey === 'apartment' && (lang === 'es' ? 'Apartamentos' : lang === 'ca' ? 'Apartaments' : lang === 'en' ? 'Apartments' : 'Appartements')}
                    {labelKey === 'penthouse' && (lang === 'es' ? 'Áticos' : lang === 'ca' ? 'Àtics' : lang === 'en' ? 'Penthouses' : 'Penthouses')}
                  </h3>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose */}
      <section className="py-20 lg:py-28">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('home.whyChooseTitle')} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY_CHOOSE_KEYS.map((key, index) => {
              const Icon = WHY_ICONS[index]
              return (
                <ScrollReveal key={key} delay={index * 0.1}>
                  <div className="text-center p-6">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-serif text-lg text-charcoal dark:text-warm-white mb-3">
                      {t(`home.whyChoose.${key}.title`)}
                    </h3>
                    <p className="text-charcoal/60 dark:text-warm-white/60 text-sm leading-relaxed">
                      {t(`home.whyChoose.${key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Lifestyle Parallax */}
      <section className="relative py-32 lg:py-40 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80)',
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
        <div className="absolute inset-0 bg-charcoal/60" />
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-white mb-6">
                {t('home.lifestyleTitle')}
              </h2>
              <p className="text-warm-white/80 text-lg leading-relaxed">
                {t('home.lifestyleText')}
              </p>
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

      {/* Partners */}
      <section className="py-16 lg:py-20 border-t border-charcoal/5 dark:border-white/10">
        <Container>
          <ScrollReveal>
            <p className="text-center text-xs uppercase tracking-[0.25em] text-charcoal/40 dark:text-warm-white/40 mb-10">
              {t('home.partnersTitle')}
            </p>
          </ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-16">
            {PARTNERS.map((partner, index) => (
              <ScrollReveal key={partner.id} delay={index * 0.05}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                  title={partner.name}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 lg:h-12 w-auto object-contain"
                  />
                </a>
              </ScrollReveal>
            ))}
          </div>
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
