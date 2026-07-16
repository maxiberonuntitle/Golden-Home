import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { languages } from '@/i18n'
import { COMPANY } from '@/utils/constants'
import {
  buildOrganizationJsonLd,
  getAlternateLanguageUrls,
  getOgLocale,
  getPathnameFromUrl,
  toAbsoluteImageUrl,
  toCanonicalUrl,
} from '@/utils/seo'
import type { Language } from '@/types'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  noindex?: boolean
}

export function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  jsonLd,
  noindex = false,
}: SEOProps) {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language
  const siteTitle = title ?? t('seo.defaultTitle')
  const siteDescription = description ?? t('seo.defaultDescription')
  const siteKeywords = keywords ?? t('seo.defaultKeywords')
  const pathname = getPathnameFromUrl(url) || `/${lang}`
  const canonicalUrl = toCanonicalUrl(pathname)
  const alternateUrls = getAlternateLanguageUrls(pathname)
  const absoluteImage = toAbsoluteImageUrl(image)
  const ogLocale = getOgLocale(lang)

  const structuredData = [
    buildOrganizationJsonLd(),
    ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
  ]

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="keywords" content={siteKeywords} />
      <meta name="author" content={COMPANY.name} />
      <meta name="publisher" content={COMPANY.name} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large" />
      )}

      <link rel="canonical" href={canonicalUrl} />
      {languages.map((lng) => (
        <link key={lng} rel="alternate" hrefLang={lng} href={alternateUrls[lng]} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={alternateUrls.es} />

      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:width" content={String(COMPANY.ogImageWidth)} />
      <meta property="og:image:height" content={String(COMPANY.ogImageHeight)} />
      <meta property="og:image:alt" content={siteTitle} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY.name} />
      <meta property="og:locale" content={ogLocale} />
      {languages
        .filter((lng) => lng !== lang)
        .map((lng) => (
          <meta key={lng} property="og:locale:alternate" content={getOgLocale(lng)} />
        ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={siteTitle} />

      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  )
}
