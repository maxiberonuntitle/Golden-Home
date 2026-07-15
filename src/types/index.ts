export * from './property'

export type Language = 'es' | 'ca' | 'en' | 'fr'

export interface CurrencyRates {
  EUR: number
  USD: number
  GBP: number
}

export type Currency = keyof CurrencyRates
