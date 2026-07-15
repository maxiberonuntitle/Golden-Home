import { ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  id?: string
  label?: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  selectClassName?: string
  icon?: ReactNode
  'aria-label'?: string
}

export function Select({
  id,
  label,
  value,
  onChange,
  options,
  placeholder,
  className,
  selectClassName,
  icon,
  'aria-label': ariaLabel,
}: SelectProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-charcoal">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gold/90">
            {icon}
          </span>
        )}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={ariaLabel ?? label}
          className={cn(
            'field-select',
            icon ? 'pl-10' : 'pl-4',
            selectClassName,
          )}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/35 transition-colors group-hover:text-gold/70 group-focus-within:text-gold" />
      </div>
    </div>
  )
}
