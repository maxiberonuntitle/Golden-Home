import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { COMPANY } from '@/utils/constants'
import { getLocalizedText } from '@/utils/format'
import type { Language } from '@/types'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export function ContactPage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>()

  const onSubmit = async (_data: ContactFormData) => {
    setError(false)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setSubmitted(true)
      reset()
    } catch {
      setError(true)
    }
  }

  const mapsEmbedUrl = `https://maps.google.com/maps?q=${COMPANY.coordinates.lat},${COMPANY.coordinates.lng}&z=15&output=embed`
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${COMPANY.coordinates.lat},${COMPANY.coordinates.lng}`

  return (
    <>
      <SEO
        title={`${t('contact.title')} | ${COMPANY.name}`}
        description={t('contact.subtitle')}
        url={`${COMPANY.website}/${lang}/contact`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'RealEstateAgent',
          name: COMPANY.name,
          telephone: COMPANY.phone,
          email: COMPANY.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Av. Pau Casals 38',
            addressLocality: 'Lloret de Mar',
            addressRegion: 'Girona',
            postalCode: '17310',
            addressCountry: 'ES',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: COMPANY.coordinates.lat,
            longitude: COMPANY.coordinates.lng,
          },
        }}
      />

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 image-overlay" />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-gold text-sm uppercase tracking-[0.25em] mb-4">
              {COMPANY.name}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-warm-white mb-6">
              {t('contact.title')}
            </h1>
            <p className="text-warm-white/80 text-lg leading-relaxed">{t('contact.subtitle')}</p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-3">
              <SectionHeading
                align="left"
                title={
                  lang === 'es'
                    ? 'Envíenos un mensaje'
                    : lang === 'ca'
                      ? 'Envieu-nos un missatge'
                      : lang === 'en'
                        ? 'Send us a message'
                        : 'Envoyez-nous un message'
                }
              />

              {submitted ? (
                <div className="p-6 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  {t('contact.form.success')}
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                      {t('contact.form.error')}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                      {t('contact.form.name')}
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-3 border border-charcoal/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
                      {...register('name', { required: true, minLength: 2 })}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">Required</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                        {t('contact.form.email')}
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full px-4 py-3 border border-charcoal/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
                        {...register('email', {
                          required: true,
                          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">Invalid email</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-charcoal mb-2">
                        {t('contact.form.phone')}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="w-full px-4 py-3 border border-charcoal/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white"
                        {...register('phone', { required: true, minLength: 6 })}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">Required</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                      {t('contact.form.message')}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-charcoal/15 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 bg-white resize-none"
                      {...register('message', { required: true, minLength: 10 })}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">Minimum 10 characters</p>
                    )}
                  </div>

                  <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? t('common.loading') : t('contact.form.submit')}
                  </Button>
                </form>
              )}
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="lg:col-span-2">
              <div className="space-y-8">
                <div className="p-8 bg-cream rounded-xl">
                  <h3 className="font-serif text-xl text-charcoal mb-6">
                    {lang === 'es'
                      ? 'Información de contacto'
                      : lang === 'ca'
                        ? 'Informació de contacte'
                        : lang === 'en'
                          ? 'Contact information'
                          : 'Informations de contact'}
                  </h3>
                  <ul className="space-y-5">
                    <li className="flex gap-4">
                      <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-charcoal/60">{t('contact.address')}</p>
                        <p className="text-charcoal">{COMPANY.address}</p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-charcoal/60">{t('contact.phone')}</p>
                        <a
                          href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                          className="text-charcoal hover:text-gold transition-colors"
                        >
                          {COMPANY.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <Mail className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-charcoal/60">{t('contact.email')}</p>
                        <a
                          href={`mailto:${COMPANY.email}`}
                          className="text-charcoal hover:text-gold transition-colors"
                        >
                          {COMPANY.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-charcoal/60">{t('contact.hours')}</p>
                        <p className="text-charcoal">
                          {getLocalizedText(COMPANY.openingHours, lang)}
                        </p>
                      </div>
                    </li>
                  </ul>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-6 text-sm text-gold hover:text-gold-dark transition-colors font-medium"
                  >
                    {t('contact.directions')} →
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="pb-16 lg:pb-24">
        <Container>
          <div className="rounded-xl overflow-hidden h-[400px] lg:h-[500px] shadow-lg">
            <iframe
              title="Golden Home Lloret location"
              src={mapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Container>
      </section>
    </>
  )
}
