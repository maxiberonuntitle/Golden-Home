import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/Badge'

interface PropertyBadgesProps {
  exclusive?: boolean
  luxury?: boolean
  featured?: boolean
  newConstruction?: boolean
  sold?: boolean
  className?: string
}

export function PropertyBadges({
  exclusive,
  luxury,
  featured,
  newConstruction,
  sold,
  className = '',
}: PropertyBadgesProps) {
  const { t } = useTranslation()

  const badges: { key: string; show: boolean | undefined; variant: 'exclusive' | 'luxury' | 'featured' | 'newConstruction' | 'sold'; label: string }[] = [
    { key: 'exclusive', show: exclusive, variant: 'exclusive', label: t('common.exclusive') },
    { key: 'luxury', show: luxury, variant: 'luxury', label: t('common.luxury') },
    { key: 'featured', show: featured, variant: 'featured', label: t('common.featured') },
    { key: 'newConstruction', show: newConstruction, variant: 'newConstruction', label: t('common.newConstruction') },
    { key: 'sold', show: sold, variant: 'sold', label: t('common.sold') },
  ]

  const visible = badges.filter((b) => b.show)
  if (visible.length === 0) return null

  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {visible.map((badge) => (
        <Badge key={badge.key} variant={badge.variant}>
          {badge.label}
        </Badge>
      ))}
    </div>
  )
}
