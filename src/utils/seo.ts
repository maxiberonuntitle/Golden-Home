import { languages } from '@/i18n'
import { COMPANY } from '@/utils/constants'
import type { Language } from '@/types'

export const SITE_ORIGIN = COMPANY.website

const LOCALE_MAP: Record<Language, string> = {
  es: 'es_ES',
  ca: 'ca_ES',
  en: 'en_GB',
  fr: 'fr_FR',
}

/** Normalize any URL or path to an absolute canonical URL on goldenhomelloret.es */
export function toCanonicalUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    try {
      const url = new URL(pathOrUrl)
      url.protocol = 'https:'
      url.hostname = 'goldenhomelloret.es'
      url.hash = ''
      return url.toString().replace(/\/$/, '') || SITE_ORIGIN
    } catch {
      return SITE_ORIGIN
    }
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`
  return `${SITE_ORIGIN}${path}`.replace(/([^:]\/)\/+/g, '$1').replace(/\/$/, '') || SITE_ORIGIN
}

export function getPathnameFromUrl(url?: string): string {
  if (!url) return ''
  try {
    return new URL(url, SITE_ORIGIN).pathname
  } catch {
    return url.replace(SITE_ORIGIN, '')
  }
}

export function swapLanguageInPath(pathname: string, lang: Language): string {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length > 0 && languages.includes(segments[0] as Language)) {
    segments[0] = lang
  } else {
    segments.unshift(lang)
  }

  return `/${segments.join('/')}`
}

export function getAlternateLanguageUrls(pathname: string): Record<Language, string> {
  return languages.reduce(
    (acc, lang) => {
      acc[lang] = toCanonicalUrl(swapLanguageInPath(pathname, lang))
      return acc
    },
    {} as Record<Language, string>,
  )
}

export function getOgLocale(lang: string): string {
  return LOCALE_MAP[lang as Language] ?? 'es_ES'
}

export function toAbsoluteImageUrl(image?: string): string {
  if (!image) return `${SITE_ORIGIN}${COMPANY.logo}`
  if (/^https?:\/\//i.test(image)) return image
  return `${SITE_ORIGIN}${image.startsWith('/') ? image : `/${image}`}`
}

export function buildOrganizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${SITE_ORIGIN}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}${COMPANY.logo}`,
    image: `${SITE_ORIGIN}${COMPANY.logo}`,
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
    areaServed: ['Lloret de Mar', 'Blanes', 'Tossa de Mar', "Platja d'Aro", 'Costa Brava'],
    sameAs: [
      'https://www.instagram.com/goldenhomelloret/',
      'https://www.facebook.com/goldenhomelloret',
      'https://www.linkedin.com/company/golden-home-lloret',
      'https://www.youtube.com/@goldenhomelloret',
    ],
  }
}
