import type { Currency, Language, LocalizedString } from '@/types'
import { CURRENCY_RATES } from '@/utils/constants'

const PRICE_LOCALES: Record<Language, string> = {
  es: 'es-ES',
  ca: 'ca-ES',
  en: 'en-GB',
  fr: 'fr-FR',
}

const DATE_LOCALES: Record<Language, string> = {
  es: 'es-ES',
  ca: 'ca-ES',
  en: 'en-GB',
  fr: 'fr-FR',
}

export function getLocalizedText(obj: LocalizedString, lang: Language): string {
  return obj[lang]
}

export function formatPrice(price: number, currency: Currency, lang: Language): string {
  const convertedPrice = price * CURRENCY_RATES[currency]

  return new Intl.NumberFormat(PRICE_LOCALES[lang], {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(convertedPrice)
}

export function formatArea(area: number): string {
  return `${new Intl.NumberFormat('es-ES').format(area)} m²`
}

export function formatDate(date: string | Date, lang: Language): string {
  const value = typeof date === 'string' ? new Date(date) : date

  return new Intl.DateTimeFormat(DATE_LOCALES[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(value)
}
