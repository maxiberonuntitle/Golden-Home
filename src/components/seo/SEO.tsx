import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { languages } from '@/i18n'
import { COMPANY } from '@/utils/constants'

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
  image = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
  url,
  type = 'website',
  jsonLd,
  noindex = false,
}: SEOProps) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language.split('-')[0]
  const siteTitle = title ?? t('seo.defaultTitle')
  const siteDescription = description ?? t('seo.defaultDescription')
  const canonicalUrl = url ?? `${COMPANY.website}/${lang}`

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <link rel="canonical" href={canonicalUrl} />
      {languages.map((lng) => (
        <link
          key={lng}
          rel="alternate"
          hrefLang={lng}
          href={`${COMPANY.website}/${lng}${url?.replace(COMPANY.website, '') ?? ''}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${COMPANY.website}/es`} />

      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={COMPANY.name} />
      <meta property="og:locale" content={lang} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
        </script>
      )}
    </Helmet>
  )
}
