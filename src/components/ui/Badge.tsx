import type { ReactNode } from 'react'

export type BadgeVariant =
  | 'exclusive'
  | 'luxury'
  | 'featured'
  | 'newConstruction'
  | 'sold'
  | 'default'

interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  exclusive: 'bg-charcoal text-gold border-gold/30',
  luxury: 'bg-gold/10 text-gold-dark border-gold/20',
  featured: 'bg-gold text-charcoal border-gold',
  newConstruction: 'bg-warm-white text-charcoal border-charcoal/10 dark:bg-charcoal dark:text-warm-white dark:border-white/10',
  sold: 'bg-charcoal/80 text-warm-white/80 border-charcoal/20',
  default: 'bg-cream text-charcoal border-charcoal/10 dark:bg-graphite dark:text-warm-white dark:border-white/10',
}

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[10px] sm:text-xs font-sans font-medium uppercase tracking-wider border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
