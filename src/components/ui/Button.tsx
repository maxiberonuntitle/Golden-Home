import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: ReactNode
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-charcoal hover:bg-gold-light border border-gold shadow-sm hover:shadow-md',
  secondary:
    'bg-transparent text-charcoal border border-charcoal/20 hover:border-gold hover:text-gold',
  ghost: 'bg-transparent text-charcoal hover:bg-charcoal/5 border border-transparent',
  dark: 'bg-charcoal text-warm-white hover:bg-graphite border border-charcoal',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-xs tracking-wide',
  md: 'px-6 py-2.5 text-sm tracking-wide',
  lg: 'px-8 py-3.5 text-sm tracking-widest uppercase',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, children, className = '', disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 font-sans font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'

    const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    if (href) {
      return (
        <a href={href} className={classes} {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} type="button" className={classes} disabled={disabled} {...props}>
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
