import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = location.pathname.split('/')[1] || 'es'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t('nav.home'),
        item: `/${lang}`,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href && { item: item.href }),
      })),
    ],
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-charcoal/60 dark:text-warm-white/60">
        <Link
          to={`/${lang}`}
          className="flex items-center gap-1 hover:text-gold transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span className="sr-only">{t('nav.home')}</span>
        </Link>
        {items.map((item, index) => (
          <span key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-charcoal/30 dark:text-warm-white/30" />
            {item.href ? (
              <Link to={item.href} className="hover:text-gold transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal dark:text-warm-white font-medium">{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
