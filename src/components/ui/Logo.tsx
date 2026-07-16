import { Link } from 'react-router-dom'
import { COMPANY } from '@/utils/constants'
import { cn } from '@/utils/cn'

interface LogoProps {
  to?: string
  className?: string
  imageClassName?: string
  showLink?: boolean
  /** Always show the light logo (e.g. footer on dark background) */
  forceLight?: boolean
}

const logoSizeClass = 'h-14 sm:h-16 lg:h-[4.25rem] w-auto object-contain object-left'

export function Logo({ to, className, imageClassName, showLink = true, forceLight = false }: LogoProps) {
  const content = forceLight ? (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src={COMPANY.logoLight}
        alt="Golden Home Lloret — Servicio Inmobiliario"
        className={cn(logoSizeClass, imageClassName)}
        width={220}
        height={68}
        loading="eager"
        decoding="async"
      />
    </span>
  ) : (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src={COMPANY.logo}
        alt="Golden Home Lloret — Servicio Inmobiliario"
        className={cn(logoSizeClass, imageClassName, 'dark:hidden')}
        width={220}
        height={68}
        loading="eager"
        decoding="async"
      />
      <img
        src={COMPANY.logoLight}
        alt="Golden Home Lloret — Servicio Inmobiliario"
        className={cn(logoSizeClass, imageClassName, 'hidden dark:block')}
        width={220}
        height={68}
        loading="eager"
        decoding="async"
      />
    </span>
  )

  if (!showLink || !to) return content

  return (
    <Link to={to} className="inline-flex shrink-0 hover:opacity-90 transition-opacity">
      {content}
    </Link>
  )
}
