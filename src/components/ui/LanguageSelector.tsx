import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ChevronDown, Globe } from 'lucide-react'
import { languages } from '@/i18n'
import { cn } from '@/utils/cn'
import type { Language } from '@/types'

interface LanguageSelectorProps {
  variant?: 'default' | 'hero'
}

const languageLabels: Record<Language, string> = {
  es: 'ES',
  ca: 'CA',
  en: 'EN',
  fr: 'FR',
}

export function LanguageSelector({ variant = 'default' }: LanguageSelectorProps) {
  const { i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLang = (i18n.language?.split('-')[0] as Language) || 'es'

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const changeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang)
    const segments = location.pathname.split('/')
    if (languages.includes(segments[1] as Language)) {
      segments[1] = lang
    } else {
      segments.splice(1, 0, lang)
    }
    const newPath = segments.join('/') || `/${lang}`
    navigate(newPath + location.search + location.hash)
    setOpen(false)
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-colors',
          variant === 'hero'
            ? 'text-warm-white/80 hover:text-gold-light'
            : 'text-charcoal/70 hover:text-gold dark:text-warm-white/70 dark:hover:text-gold',
        )}
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{languageLabels[currentLang]}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 py-1 min-w-[5rem] bg-warm-white dark:bg-graphite border border-charcoal/10 dark:border-white/10 shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => changeLanguage(lang)}
              className={`w-full px-4 py-2 text-left text-xs font-medium transition-colors ${
                currentLang === lang
                  ? 'text-gold bg-gold/5'
                  : 'text-charcoal/70 hover:text-gold hover:bg-charcoal/5 dark:text-warm-white/70 dark:hover:text-gold dark:hover:bg-white/10'
              }`}
            >
              {languageLabels[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
