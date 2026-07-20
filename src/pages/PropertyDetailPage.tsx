import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  Share2,
  Download,
  ExternalLink,
  X,
  ZoomIn,
  MessageCircle,
  Leaf,
  Copy,
  Mail,
} from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { Button } from '@/components/ui/Button'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { PropertyBadges } from '@/components/property/PropertyBadges'
import { PropertyDetailGallery } from '@/components/property/PropertyDetailGallery'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { useProperty } from '@/hooks/useProperty'
import { useLocalizedProperty } from '@/hooks/useLocalizedProperty'
import { useAppStore } from '@/stores/useAppStore'
import { getRelatedProperties } from '@/services/propertyService'
import { formatArea, formatPrice, getLocalizedText } from '@/utils/format'
import { copyTextToClipboard, getShareLinks, tryNativeShare } from '@/utils/share'
import { COMPANY } from '@/utils/constants'
import type { Language } from '@/types'

const DEFAULT_NEARBY_PLACES: { name: string; distance: string }[] = []

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language

  const property = useProperty(slug)
  const localized = useLocalizedProperty(property, lang)
  const { currency, addRecentlyViewed } = useAppStore()

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [copied, setCopied] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const shareMenuRef = useRef<HTMLDivElement>(null)

  const relatedProperties = useMemo(
    () => (slug ? getRelatedProperties(slug, 3) : []),
    [slug],
  )

  useEffect(() => {
    if (property) {
      addRecentlyViewed(property.id)
    }
  }, [property, addRecentlyViewed])

  useEffect(() => {
    if (!shareMenuOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShareMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShareMenuOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [shareMenuOpen])

  if (!property || !localized) {
    return (
      <Container className="py-24 text-center">
        <p className="text-charcoal/60 dark:text-warm-white/60">{t('common.error')}</p>
        <Link to={`/${lang}/properties`} className="text-gold hover:underline mt-4 inline-block">
          {t('nav.properties')}
        </Link>
      </Container>
    )
  }

  const mapsUrl = `https://maps.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`
  const mapsExternalUrl = `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}`
  const shareUrl = `${COMPANY.website}/${lang}/properties/${property.slug}`
  const listing = property.listingDetails
  const nearbyPlaces =
    property.nearbyPlaces?.map((place) => ({
      name: getLocalizedText(place.name, lang),
      distance: place.distance,
    })) ?? DEFAULT_NEARBY_PLACES

  const statusLabel =
    property.status === 'rent' ? t('property.forRent') : t('property.forSale')

  const basicFeatureItems = [
    property.builtArea > 0 &&
      `${property.builtArea} m² ${lang === 'es' ? 'construidos' : lang === 'ca' ? 'construïts' : lang === 'fr' ? 'construits' : 'built'}`,
    property.bedrooms > 0 && `${property.bedrooms} ${t('property.habShort')}`,
    property.bathrooms > 0 &&
      `${property.bathrooms} ${t('property.bathrooms').toLowerCase()}`,
    listing?.condition && getLocalizedText(listing.condition, lang),
    listing?.orientation && getLocalizedText(listing.orientation, lang),
    listing?.yearBuilt &&
      `${lang === 'es' ? 'Construido en' : lang === 'ca' ? 'Construït el' : lang === 'fr' ? 'Construit en' : 'Built in'} ${listing.yearBuilt}`,
    listing?.heating && getLocalizedText(listing.heating, lang),
    ...localized.features.filter((feature) => {
      const floorLabel = listing?.floor ? getLocalizedText(listing.floor, lang) : ''
      return (
        feature !== floorLabel &&
        !feature.toLowerCase().includes('ascensor') &&
        !feature.toLowerCase().includes('elevator') &&
        !feature.toLowerCase().includes('ascenseur')
      )
    }),
  ].filter(Boolean) as string[]

  const buildingFeatureItems = [
    listing?.floor && getLocalizedText(listing.floor, lang),
    property.elevator &&
      (lang === 'es'
        ? 'Con ascensor'
        : lang === 'ca'
          ? 'Amb ascensor'
          : lang === 'en'
            ? 'With elevator'
            : 'Avec ascenseur'),
  ].filter(Boolean) as string[]
  const whatsappMessage = encodeURIComponent(
    `${localized.title} - ${formatPrice(property.price, currency, lang)} ${shareUrl}`,
  )
  const shareContent = {
    title: localized.title,
    text: `${localized.title} - ${formatPrice(property.price, currency, lang)}`,
    url: shareUrl,
  }
  const shareLinks = getShareLinks(shareContent)

  const markCopied = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    // Native share is reliable on mobile; on desktop open our own options menu.
    const preferNativeShare = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (preferNativeShare) {
      const nativeResult = await tryNativeShare(shareContent)
      if (nativeResult === 'shared' || nativeResult === 'cancelled') return
    }

    setShareMenuOpen((open) => !open)
  }

  const handleCopyShareLink = async () => {
    const ok = await copyTextToClipboard(shareUrl)
    if (ok) {
      markCopied()
      setShareMenuOpen(false)
    }
  }

  const characteristics = [
    { icon: Bed, label: t('property.bedrooms'), value: property.bedrooms },
    { icon: Bath, label: t('property.bathrooms'), value: property.bathrooms },
    { icon: Maximize, label: t('property.builtArea'), value: formatArea(property.builtArea) },
    ...(property.plotArea > 0
      ? [{ icon: Maximize, label: t('property.plotArea'), value: formatArea(property.plotArea) }]
      : []),
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
            url: shareUrl,
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

      <section className="overflow-x-hidden pb-6">
        <Container>
          <div className="grid min-w-0 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="min-w-0 lg:col-span-2">
              <PropertyDetailGallery
                images={property.images}
                title={localized.title}
                onImageClick={(index) => {
                  setLightboxIndex(index)
                  setLightboxOpen(true)
                  setZoomLevel(1)
                }}
              />
            </div>

            <div className="min-w-0 lg:sticky lg:top-[var(--header-sticky-offset)] lg:self-start space-y-6 transition-[top] duration-200 ease-out">
              <div className="p-6 lg:p-8 bg-cream dark:bg-graphite rounded-xl border border-charcoal/5 dark:border-white/10">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold mb-3">
                  {statusLabel}
                </p>
                <PropertyBadges
                  exclusive={property.exclusive}
                  luxury={property.luxury}
                  featured={property.featured}
                  newConstruction={property.newConstruction}
                  sold={property.status === 'sold'}
                />
                <p className="text-sm text-charcoal/50 dark:text-warm-white/50 mt-4">
                  {t('property.reference')}: {property.reference}
                </p>
                <h1 className="font-serif text-2xl lg:text-3xl text-charcoal dark:text-warm-white mt-2 mb-3">
                  {localized.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-charcoal/60 dark:text-warm-white/60 mb-2">
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    {localized.location}
                  </p>
                  <a
                    href={mapsExternalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-gold-dark transition-colors"
                  >
                    {t('property.viewMap')}
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal/70 dark:text-warm-white/70 mb-4 pb-4 border-b border-charcoal/10 dark:border-white/10">
                  {property.builtArea > 0 && <span>{formatArea(property.builtArea)}</span>}
                  {property.bedrooms > 0 && (
                    <span>
                      {property.bedrooms} {t('property.habShort')}
                    </span>
                  )}
                  {listing?.floor && <span>{getLocalizedText(listing.floor, lang)}</span>}
                  {property.elevator && listing?.floor && <span>·</span>}
                  {property.elevator && (
                    <span>
                      {lang === 'es'
                        ? 'con ascensor'
                        : lang === 'ca'
                          ? 'amb ascensor'
                          : lang === 'en'
                            ? 'with elevator'
                            : 'avec ascenseur'}
                    </span>
                  )}
                </div>

                <p className="font-serif text-3xl text-gold mb-6">
                  {formatPrice(property.price, currency, lang)}
                </p>

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
                <h2 className="font-serif text-2xl text-charcoal dark:text-warm-white mb-4">
                  {t('property.advertiserComment')}
                </h2>
                <p className="text-charcoal/70 dark:text-warm-white/70 leading-relaxed whitespace-pre-line">
                  {localized.description}
                </p>
                {listing?.advertiserNote && (
                  <p className="mt-6 p-4 bg-cream dark:bg-charcoal rounded-lg text-sm text-charcoal/70 dark:text-warm-white/70 border border-charcoal/5 dark:border-white/10">
                    {getLocalizedText(listing.advertiserNote, lang)}
                  </p>
                )}
              </ScrollReveal>

              {basicFeatureItems.length > 0 && (
                <ScrollReveal>
                  <h2 className="font-serif text-2xl text-charcoal dark:text-warm-white mb-6">
                    {t('property.basicFeatures')}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {basicFeatureItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-charcoal/70 dark:text-warm-white/70 text-sm py-2 border-b border-charcoal/5 dark:border-white/10"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}

              {buildingFeatureItems.length > 0 && (
                <ScrollReveal>
                  <h2 className="font-serif text-2xl text-charcoal dark:text-warm-white mb-6">{t('property.building')}</h2>
                  <ul className="space-y-3">
                    {buildingFeatureItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-charcoal/70 dark:text-warm-white/70 text-sm py-2 border-b border-charcoal/5 dark:border-white/10"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              )}

              <ScrollReveal>
                <h2 className="font-serif text-2xl text-charcoal dark:text-warm-white mb-6">
                  {t('property.characteristics')}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {characteristics.map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="p-4 bg-cream dark:bg-graphite rounded-lg text-center"
                    >
                      <Icon className="w-5 h-5 text-gold mx-auto mb-2" />
                      <p className="text-xs text-charcoal/50 dark:text-warm-white/50 mb-1">{label}</p>
                      <p className="font-medium text-charcoal dark:text-warm-white">{value}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal>
                <h2 className="font-serif text-2xl text-charcoal dark:text-warm-white mb-6">{t('property.location')}</h2>
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
                <h3 className="font-medium text-charcoal dark:text-warm-white mb-4">{t('property.nearbyPlaces')}</h3>
                <ul className="space-y-2">
                  {nearbyPlaces.map((place) => (
                    <li
                      key={place.name}
                      className="flex justify-between text-sm text-charcoal/70 dark:text-warm-white/70 border-b border-charcoal/5 dark:border-white/10 pb-2"
                    >
                      <span>{place.name}</span>
                      <span className="text-gold">{place.distance}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>

              {property.youtube && (
                <ScrollReveal>
                  <h2 className="font-serif text-2xl text-charcoal dark:text-warm-white mb-6">{t('property.video')}</h2>
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
                    className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/15 dark:border-white/15 text-charcoal dark:text-warm-white text-sm hover:border-gold transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t('property.downloadPdf')}
                  </button>
                  <div className="relative" ref={shareMenuRef}>
                    <button
                      type="button"
                      onClick={handleShare}
                      aria-expanded={shareMenuOpen}
                      aria-haspopup="menu"
                      className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/15 dark:border-white/15 text-charcoal dark:text-warm-white text-sm hover:border-gold transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      {copied ? t('property.shareLinkCopied') : t('property.share')}
                    </button>
                    {shareMenuOpen && (
                      <div
                        role="menu"
                        className="absolute left-0 bottom-full z-20 mb-2 w-56 overflow-hidden rounded-lg border border-charcoal/10 bg-warm-white shadow-xl dark:border-white/10 dark:bg-graphite"
                      >
                        <p className="px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-charcoal/45 dark:text-warm-white/45">
                          {t('property.shareVia')}
                        </p>
                        <a
                          role="menuitem"
                          href={shareLinks.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShareMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-charcoal hover:bg-cream dark:text-warm-white dark:hover:bg-white/5"
                        >
                          <MessageCircle className="w-4 h-4 text-gold" />
                          WhatsApp
                        </a>
                        <a
                          role="menuitem"
                          href={shareLinks.email}
                          onClick={() => setShareMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-charcoal hover:bg-cream dark:text-warm-white dark:hover:bg-white/5"
                        >
                          <Mail className="w-4 h-4 text-gold" />
                          {t('property.shareEmail')}
                        </a>
                        <a
                          role="menuitem"
                          href={shareLinks.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShareMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-charcoal hover:bg-cream dark:text-warm-white dark:hover:bg-white/5"
                        >
                          <Share2 className="w-4 h-4 text-gold" />
                          {t('property.shareTelegram')}
                        </a>
                        <a
                          role="menuitem"
                          href={shareLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShareMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-charcoal hover:bg-cream dark:text-warm-white dark:hover:bg-white/5"
                        >
                          <Share2 className="w-4 h-4 text-gold" />
                          {t('property.shareFacebook')}
                        </a>
                        <a
                          role="menuitem"
                          href={shareLinks.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShareMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-sm text-charcoal hover:bg-cream dark:text-warm-white dark:hover:bg-white/5"
                        >
                          <Share2 className="w-4 h-4 text-gold" />
                          {t('property.shareX')}
                        </a>
                        <button
                          type="button"
                          role="menuitem"
                          onClick={handleCopyShareLink}
                          className="flex w-full items-center gap-2 border-t border-charcoal/10 px-3 py-2.5 text-left text-sm text-charcoal hover:bg-cream dark:border-white/10 dark:text-warm-white dark:hover:bg-white/5"
                        >
                          <Copy className="w-4 h-4 text-gold" />
                          {t('property.copyLink')}
                        </button>
                      </div>
                    )}
                  </div>
                  <a
                    href={`${COMPANY.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-charcoal/15 dark:border-white/15 text-charcoal dark:text-warm-white text-sm hover:border-gold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t('common.whatsapp')}
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <div className="space-y-8">
              <ScrollReveal>
                <div className="p-6 bg-cream dark:bg-graphite rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl font-bold ${
                        property.energyCertificate <= 'C'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                          : property.energyCertificate <= 'E'
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                      }`}
                    >
                      {property.energyCertificate}
                    </div>
                    <div>
                      <p className="font-medium text-charcoal dark:text-warm-white">{t('property.energyCertificate')}</p>
                      <p className="text-xs text-charcoal/50 dark:text-warm-white/50">CEE vigente</p>
                    </div>
                  </div>
                  {(listing?.energyConsumption || listing?.energyEmissions) && (
                    <div className="pt-4 border-t border-charcoal/10 dark:border-white/10 space-y-2 text-sm">
                      {listing.energyConsumption && (
                        <p className="flex justify-between text-charcoal/70 dark:text-warm-white/70">
                          <span>{t('property.energyConsumption')}</span>
                          <span className="font-medium text-charcoal dark:text-warm-white">
                            {listing.energyConsumption} kWh/m² {lang === 'es' ? 'año' : 'year'}
                          </span>
                        </p>
                      )}
                      {listing.energyEmissions && (
                        <p className="flex justify-between text-charcoal/70 dark:text-warm-white/70">
                          <span>{t('property.energyEmissions')}</span>
                          <span className="font-medium text-charcoal dark:text-warm-white">
                            {listing.energyEmissions} kg CO₂/m² {lang === 'es' ? 'año' : 'year'}
                          </span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {relatedProperties.length > 0 && (
        <section className="py-16 lg:py-24 bg-cream dark:bg-graphite">
          <Container>
            <h2 className="font-serif text-3xl text-charcoal dark:text-warm-white mb-10 text-center">
              {t('property.related')}
            </h2>
            <PropertyGrid properties={relatedProperties} />
          </Container>
        </section>
      )}
    </>
  )
}
