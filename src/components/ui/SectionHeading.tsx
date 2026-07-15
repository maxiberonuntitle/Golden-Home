import type { ReactNode } from 'react'

interface SectionHeadingProps {
  subtitle?: string
  title: string
  description?: string | ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-3xl mb-12 lg:mb-16 ${alignClass} ${className}`}>
      {subtitle && (
        <p className="text-gold text-xs sm:text-sm font-sans font-medium uppercase tracking-[0.25em] mb-4">
          {subtitle}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-charcoal leading-tight text-balance">
        {title}
      </h2>
      {description && (
        <div className="mt-5 text-charcoal/60 text-base sm:text-lg leading-relaxed text-balance">
          {description}
        </div>
      )}
    </div>
  )
}
