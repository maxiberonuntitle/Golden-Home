import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import type { Currency } from '@/types'

const currencies: Currency[] = ['EUR', 'USD', 'GBP']

export function CurrencySelector() {
  const { currency, setCurrency } = useAppStore()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-charcoal/70 hover:text-gold transition-colors"
        aria-label="Select currency"
        aria-expanded={open}
      >
        <span>{currency}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 py-1 min-w-[5rem] bg-warm-white border border-charcoal/10 shadow-lg z-50">
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCurrency(c)
                setOpen(false)
              }}
              className={`w-full px-4 py-2 text-left text-xs font-medium transition-colors ${
                currency === c
                  ? 'text-gold bg-gold/5'
                  : 'text-charcoal/70 hover:text-gold hover:bg-charcoal/5'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
