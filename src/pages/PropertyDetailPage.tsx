import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Heart,
  GitCompareArrows,
  Share2,
  Copy,
  Download,
  ExternalLink,
  X,
  ZoomIn,
  Calendar,
  MessageCircle,
  Leaf,
} from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PropertyBadges } from '@/components/property/PropertyBadges'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useProperty } from '@/hooks/useProperty'
import { useLocalizedProperty } from '@/hooks/useLocalizedProperty'
import { useAppStore } from '@/stores/useAppStore'
import { getRelatedProperties } from '@/services/propertyService'
import { formatArea, formatPrice } from '@/utils/format'
import { COMPANY } from '@/utils/constants'
import type { Language } from '@/types'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

interface VisitFormData {
  name: string
  email: string
  phone: string
  date: string
  time: string
}

function calculateMortgage(principal: number, annualRate: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0
  const monthlyRate = annualRate / 100 / 12
  const months = years * 12
  if (monthlyRate === 0) return principal / months
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  )
}

const NEARBY_PLACES = [
  { name: 'Playa de Fenals', distance: '200 m' },
  { name: 'Centro de Lloret de Mar', distance: '1.2 km' },
  { name: 'Campo de Golf PGA Catalunya', distance: '18 km' },
  { name: 'Aeropuerto Girona-Costa Brava', distance: '35 km' },
  { name: 'Barcelona', distance: '75 km' },
]

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language

  const property = useProperty(slug)
  const localized = useLocalizedProperty(property, lang)
  const { favorites, compare, currency, toggleFavorite, toggleCompare, addRecentlyViewed } =
    useAppStore()

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [copied, setCopied] = useState(false)
  const [loanAmount, setLoanAmount] = useState(0)
  const [interestRate, setInterestRate] = useState(3.5)
  const [loanTerm, setLoanTerm] = useState(25)
  const [contactSent, setContactSent] = useState(false)
  const [visitSent, setVisitSent] = useState(false)

  const contactForm = useForm<ContactFormData>()
  const visitForm = useForm<VisitFormData>()

  const relatedProperties = useMemo(
    () => (slug ? getRelatedProperties(slug, 3) : []),
    [slug],
  )

  useEffect(() => {
    if (property) {
      addRecentlyViewed(property.id)
      setLoanAmount(Math.round(property.price * 0.7))
    }
  }, [property, addRecentlyViewed])

  if (!property || !localized) {
    return (
      <Container className="py-24 text-center">
        <p className="text-charcoal/60">{t('common.error')}</p>
        <Link to={`/${lang}/properties`} className="text-gold hover:underline mt-4 inline-block">
          {t('nav.properties')}
        </Link>
      </Container>
    )
  }

  const isFavorite = favorites.includes(property.id)
  const isCompare = compare.includes(property.id)
  const monthlyPayment = calculateMortgage(loanAmount, interestRate, loanTerm)
  const mapsUrl = `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`
  const shareUrl = `${COMPANY.website}/${lang}/properties/${property.slug}`
  const whatsappMessage = encodeURIComponent(
    `${localized.title} - ${formatPrice(property.price, currency, lang)} ${shareUrl}`,
  )

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const onContactSubmit = async (_data: ContactFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setContactSent(true)
    contactForm.reset()
  }

  const onVisitSubmit = async (_data: VisitFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setVisitSent(true)
    visitForm.reset()
  }

  const characteristics = [
    { icon: Bed, label: t('property.bedrooms'), value: property.bedrooms },
    { icon: Bath, label: t('property.bathrooms'), value: property.bathrooms },
    { icon: Maximize, label: t('property.builtArea'), value: formatArea(property.builtArea) },
    { icon: Maximize, label: t('property.plotArea'), value: formatArea(property.plotArea) },
    { icon: MapPin, label: t('property.location'), value: localized.location },
    { icon: Leaf, label: t('property.energyCertificate'), value: property.energyCertificate },
  ]

  return (
    <>
      <SEO
        title={localized.seo.title}
        description={localized.seo.description}
        keywords={localized.seo.keywords}
        image={property.images[0]}
        url={shareUrl}
        type="product"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: localized.title,
          description: localized.description,
          url: shareUrl,
          image: property.images,
          offers: {
            '@type': 'Offer',
            price: property.price,
            priceCurrency: 'EUR',
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: property.city,
            addressRegion: property.province,
            addressCountry: 'ES',
          },
        }}
      />

      <Container className="py-6">
        <Breadcrumbs
          items={[
            { label: t('nav.properties'), href: `/${lang}/properties` },
            { label: localized.title },
          ]}
        />
      </Container>

      <section className="pb-8">
        <Container>
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative">
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                pagination={{ clickable: true }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                className="rounded-xl overflow-hidden aspect-[16/10]"
              >
                {property.images.map((image, index) => (
                  <SwiperSlide key={image}>
                    <button
                      type="button"
                      className="w-full h-full relative group cursor-zoom-in"
                      onClick={() => {
                        setLightboxIndex(index)
                        setLightboxOpen(true)
                        setZoomLevel(1)
                      }}
                    >
                      <img
                        src={image}
                        alt={`${localized.title} - ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </button>
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Thumbs]}
                spaceBetween={8}
                slidesPerView={4}
                freeMode
                watchSlidesProgress
                className="mt-3 thumbs-gallery"
              >
                {property.images.map((image) => (
                  <SwiperSlide key={`thumb-${image}`}>
                    <img
                      src={image}
                      alt=""
                      className="w-full aspect-[4/3] object-cover rounded-lg cursor-pointer opacity-60 hover:opacity-100 transition-opacity swiper-slide-thumb-active:opacity-100"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
              <div className="p-6 lg:p-8 bg-cream rounded-xl">
                <PropertyBadges
                  exclusive={property.exclusive}
                  luxury={property.luxury}
                  featured={property.featured}
                  newConstruction={property.newConstruction}
                  sold={property.status === 'sold'}
                />
                <p className="text-sm text-charcoal/50 mt-4">
                  {t('property.reference')}: {property.reference}
                </p>
                <h1 className="font-serif text-2xl lg:text-3xl text-charcoal mt-2 mb-3">
                  {localized.title}
                </h1>
                <p className="flex items-center gap-2 text-charcoal/60 text-sm mb-4">
                  <MapPin className="w-4 h-4 text-gold" />
                  {localized.location}
                </p>
                <p className="font-serif text-3xl text-gold mb-6">
                  {formatPrice(property.price, currency, lang)}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    type="button"
                    onClick={() => toggleFavorite(property.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm border transition-colors ${
                      isFavorite
                        ? 'bg-gold text-charcoal border-gold'
                        : 'border-charcoal/15 hover:border-gold'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? t('common.removeFromFavorites') : t('common.addToFavorites')}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleCompare(property.id)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm border transition-colors ${
                      isCompare
                        ? 'bg-gold text-charcoal border-gold'
                        : 'border-charcoal/15 hover:border-gold'
                    }`}
                  >
                    <GitCompareArrows className="w-4 h-4" />
                    {isCompare ? t('common.removeFromCompare') : t('common.addToCompare')}
                  </button>
                </div>

                <Button href={COMPANY.whatsapp} variant="primary" size="lg" className="w-full mb-3">
                  <MessageCircle className="w-4 h-4" />
                  {t('common.whatsapp')}
                </Button>
                <Button href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} variant="secondary" size="lg" className="w-full">
                  {t('property.contactAgent')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 flex flex-col">
          <div className="flex items-center justify-between p-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.5, 3))}
                className="p-2 text-warm-white hover:text-gold"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="px-3 py-2 text-sm text-warm-white hover:text-gold"
              >
                100%
              </button>
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-warm-white hover:text-gold"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-auto flex items-center justify-center p-4">
            <img
              src={property.images[lightboxIndex]}
              alt={localized.title}
              style={{ transform: `scale(${zoomLevel})` }}
              className="max-w-full max-h-full object-contain transition-transform duration-300"
            />
          </div>
          <div className="flex justify-center gap-2 p-4">
            {property.images.map((image, index) => (
              <button
                key={`lb-${image}`}
                type="button"
                onClick={() => {
                  setLightboxIndex(index)
                  setZoomLevel(1)
                }}
                className={`w-16 h-12 rounded overflow-hidden border-2 ${
                  index === lightboxIndex ? 'border-gold' : 'border-transparent opacity-60'
                }`}
              >
                <img src={image} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="py-12 lg:py-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <ScrollReveal>
                <h2 className="font-serif text-2xl text-charcoal mb-6">{t('property.description')}</h2>
                <p className="text-charcoal/70 leading-relaxed whitespace-pre-line">
                  {localized.description}
                </p>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="font-serif text-2xl text-charcoal mb-6">
                  {t('property.characteristics')}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {characteristics.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="p-4 bg-cream rounded-lg text-center"
                    >
                      <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                      <p className="text-xs text-charcoal/50 mb-1">{label}</p>
                      <p className="font-medium text-charcoal">{value}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="font-serif text-2xl text-charcoal mb-6">{t('property.features')}</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {localized.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-charcoal/70 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="font-serif text-2xl text-charcoal mb-6">{t('property.location')}</h2>
                <div className="rounded-xl overflow-hidden h-[350px] mb-6">
                  <iframe
                    title={localized.title}
                    src={mapsUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
                <h3 className="font-medium text-charcoal mb-4">{t('property.nearbyPlaces')}</h3>
                <ul className="space-y-2">
                  {NEARBY_PLACES.map((place) => (
                    <li
                      key={place.name}
                      className="flex justify-between text-sm text-charcoal/70 border-b border-charcoal/5 pb-2"
                    >
                      <span>{place.name}</span>
                      <span className="text-gold">{place.distance}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              {property.youtube && (
                <ScrollReveal>
                  <h2 className="font-serif text-2xl text-charcoal mb-6">{t('property.video')}</h2>
                  <div className="aspect-video rounded-xl overflow-hidden">
                    <iframe
                      src={property.youtube}
                      title={localized.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal>
                <div className="flex flex-wrap gap-3">
                  {property.virtualTour && (
                    <a
                      href={property.virtualTour}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-charcoal text-warm-white text-sm hover:bg-graphite transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('property.virtualTour')}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/15 text-sm hover:border-gold transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t('property.downloadPdf')}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/15 text-sm hover:border-gold transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    {copied ? '✓' : t('property.share')}
                  </button>
                  <a
                    href={`${COMPANY.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/15 text-sm hover:border-gold transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <div className="space-y-8">
              <ScrollReveal>
                <div className="p-6 bg-cream rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl font-bold ${
                        property.energyCertificate <= 'C'
                          ? 'bg-green-100 text-green-700'
                          : property.energyCertificate <= 'E'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {property.energyCertificate}
                    </div>
                    <div>
                      <p className="font-medium text-charcoal">{t('property.energyCertificate')}</p>
                      <p className="text-xs text-charcoal/50">CEE vigente</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="p-6 bg-cream rounded-xl">
                  <h3 className="font-serif text-xl text-charcoal mb-6">
                    {t('property.mortgageCalculator')}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-charcoal/60 block mb-1">
                        {t('property.loanAmount')}
                      </label>
                      <input
                        type="range"
                        min={0}
                        max={property.price}
                        step={10000}
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full accent-gold"
                      />
                      <p className="text-sm font-medium mt-1">
                        {formatPrice(loanAmount, currency, lang)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-charcoal/60 block mb-1">
                        {t('property.interestRate')} (%)
                      </label>
                      <input
                        type="number"
                        step={0.1}
                        min={0}
                        max={15}
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-charcoal/60 block mb-1">
                        {t('property.loanTerm')} ({lang === 'es' ? 'años' : 'years'})
                      </label>
                      <input
                        type="range"
                        min={5}
                        max={40}
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="w-full accent-gold"
                      />
                      <p className="text-sm font-medium mt-1">{loanTerm} {lang === 'es' ? 'años' : 'years'}</p>
                    </div>
                    <div className="pt-4 border-t border-charcoal/10">
                      <p className="text-sm text-charcoal/60">{t('property.monthlyPayment')}</p>
                      <p className="font-serif text-2xl text-gold">
                        {formatPrice(monthlyPayment, currency, lang)}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="p-6 bg-cream rounded-xl">
                  <h3 className="font-serif text-xl text-charcoal mb-4">
                    {t('property.contactAgent')}
                  </h3>
                  {contactSent ? (
                    <p className="text-sm text-green-700">{t('contact.form.success')}</p>
                  ) : (
                    <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-3">
                      <input
                        placeholder={t('contact.form.name')}
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                        {...contactForm.register('name', { required: true })}
                      />
                      <input
                        type="email"
                        placeholder={t('contact.form.email')}
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                        {...contactForm.register('email', { required: true })}
                      />
                      <input
                        placeholder={t('contact.form.phone')}
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                        {...contactForm.register('phone', { required: true })}
                      />
                      <textarea
                        placeholder={t('contact.form.message')}
                        rows={3}
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm resize-none"
                        {...contactForm.register('message', { required: true })}
                      />
                      <Button type="submit" variant="primary" size="md" className="w-full">
                        {t('contact.form.submit')}
                      </Button>
                    </form>
                  )}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <div className="p-6 border border-charcoal/10 rounded-xl">
                  <h3 className="font-serif text-xl text-charcoal mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gold" />
                    {t('property.scheduleVisit')}
                  </h3>
                  {visitSent ? (
                    <p className="text-sm text-green-700">{t('contact.form.success')}</p>
                  ) : (
                    <form onSubmit={visitForm.handleSubmit(onVisitSubmit)} className="space-y-3">
                      <input
                        placeholder={t('contact.form.name')}
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                        {...visitForm.register('name', { required: true })}
                      />
                      <input
                        type="email"
                        placeholder={t('contact.form.email')}
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                        {...visitForm.register('email', { required: true })}
                      />
                      <input
                        placeholder={t('contact.form.phone')}
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                        {...visitForm.register('phone', { required: true })}
                      />
                      <input
                        type="date"
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                        {...visitForm.register('date', { required: true })}
                      />
                      <input
                        type="time"
                        className="w-full px-3 py-2 border border-charcoal/10 rounded text-sm"
                        {...visitForm.register('time', { required: true })}
                      />
                      <Button type="submit" variant="dark" size="md" className="w-full">
                        {t('property.scheduleVisit')}
                      </Button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {relatedProperties.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream">
          <Container>
            <h2 className="font-serif text-3xl text-charcoal mb-10 text-center">
              {t('property.related')}
            </h2>
            <PropertyGrid properties={relatedProperties} />
          </Container>
        </section>
      )}
    </>
  )
}
