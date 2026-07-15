import { Link } from 'react-router-dom'
import { cn } from '@/utils/cn'

interface LogoProps {
  to?: string
  className?: string
  imageClassName?: string
  showLink?: boolean
}

export function Logo({ to, className, imageClassName, showLink = true }: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center bg-white', className)}>
      <img
        src="/logo.png"
        alt="Golden Home Lloret — Servicio Inmobiliario"
        className={cn('h-10 sm:h-11 lg:h-12 w-auto object-contain', imageClassName)}
        width={180}
        height={48}
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
