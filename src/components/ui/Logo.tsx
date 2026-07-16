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
  /** Large white logo for the home hero */
  variant?: 'default' | 'hero'
  onNavigate?: () => void
}

const logoSizeClass = 'h-14 sm:h-16 lg:h-[4.25rem] w-auto object-contain object-left'
const heroLogoSizeClass =
  'h-20 sm:h-24 md:h-28 lg:h-[8.5rem] w-auto max-w-[min(92vw,540px)] object-contain object-center'

export function Logo({
  to,
  className,
  imageClassName,
  showLink = true,
  forceLight = false,
  variant = 'default',
  onNavigate,
}: LogoProps) {
  if (variant === 'hero') {
    const content = (
      <span className={cn('inline-flex items-center justify-center', className)}>
        <img
          src={COMPANY.logo}
          alt="Golden Home Inmobiliaria"
          className={cn(heroLogoSizeClass, 'brightness-0 invert opacity-90', imageClassName)}
          width={540}
          height={167}
          loading="eager"
          decoding="async"
        />
      </span>
    )

    if (!showLink || !to) return content

    return (
      <Link to={to} className="inline-flex shrink-0 hover:opacity-90 transition-opacity" onClick={onNavigate}>
        {content}
      </Link>
    )
  }

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
    <Link to={to} className="inline-flex shrink-0 hover:opacity-90 transition-opacity" onClick={onNavigate}>
      {content}
    </Link>
  )
}
