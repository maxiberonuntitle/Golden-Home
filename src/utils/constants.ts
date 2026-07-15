import type { CurrencyRates, LocalizedString, PropertyType, SortOption } from '@/types'

export const COMPANY = {
  name: 'Golden Home Lloret',
  legalName: 'Golden Home Lloret S.L.',
  tagline: {
    es: 'Inmobiliaria de lujo en la Costa Brava',
    ca: 'Immobiliària de luxe a la Costa Brava',
    en: 'Luxury real estate on the Costa Brava',
    fr: 'Immobilier de luxe sur la Costa Brava',
  } satisfies LocalizedString,
  address: 'Av. Pau Casals 38, 17310 Lloret de Mar, Girona, Spain',
  phone: '+34 601 901 275',
  whatsapp: 'https://wa.me/34601901275',
  email: 'info@goldenhomelloret.es',
  website: 'https://goldenhomelloret.es',
  coordinates: { lat: 41.6994, lng: 2.8451 },
  openingHours: {
    es: 'Lunes a Viernes: 9:30–19:00 | Sábados: 10:00–14:00',
    ca: 'Dilluns a Divendres: 9:30–19:00 | Dissabtes: 10:00–14:00',
    en: 'Monday to Friday: 9:30 AM–7:00 PM | Saturdays: 10:00 AM–2:00 PM',
    fr: 'Lundi au Vendredi : 9h30–19h00 | Samedis : 10h00–14h00',
  } satisfies LocalizedString,
} as const

export const CURRENCY_RATES: CurrencyRates = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.86,
}

export const PROPERTY_TYPES: { value: PropertyType; label: LocalizedString }[] = [
  {
    value: 'villa',
    label: {
      es: 'Villa',
      ca: 'Vila',
      en: 'Villa',
      fr: 'Villa',
    },
  },
  {
    value: 'apartment',
    label: {
      es: 'Apartamento',
      ca: 'Apartament',
      en: 'Apartment',
      fr: 'Appartement',
    },
  },
  {
    value: 'penthouse',
    label: {
      es: 'Ático',
      ca: 'Àtic',
      en: 'Penthouse',
      fr: 'Penthouse',
    },
  },
  {
    value: 'townhouse',
    label: {
      es: 'Casa adosada',
      ca: 'Casa adossada',
      en: 'Townhouse',
      fr: 'Maison mitoyenne',
    },
  },
  {
    value: 'land',
    label: {
      es: 'Terreno',
      ca: 'Terreny',
      en: 'Land',
      fr: 'Terrain',
    },
  },
  {
    value: 'commercial',
    label: {
      es: 'Local comercial',
      ca: 'Local comercial',
      en: 'Commercial',
      fr: 'Local commercial',
    },
  },
]

export const SORT_OPTIONS: { value: SortOption; label: LocalizedString }[] = [
  {
    value: 'featured',
    label: {
      es: 'Destacados',
      ca: 'Destacats',
      en: 'Featured',
      fr: 'En vedette',
    },
  },
  {
    value: 'newest',
    label: {
      es: 'Más recientes',
      ca: 'Més recents',
      en: 'Newest',
      fr: 'Plus récents',
    },
  },
  {
    value: 'price-asc',
    label: {
      es: 'Precio: menor a mayor',
      ca: 'Preu: menor a major',
      en: 'Price: low to high',
      fr: 'Prix : croissant',
    },
  },
  {
    value: 'price-desc',
    label: {
      es: 'Precio: mayor a menor',
      ca: 'Preu: major a menor',
      en: 'Price: high to low',
      fr: 'Prix : décroissant',
    },
  },
  {
    value: 'views',
    label: {
      es: 'Más visitados',
      ca: 'Més visitats',
      en: 'Most viewed',
      fr: 'Les plus consultés',
    },
  },
]

export const SOCIAL = {
  instagram: 'https://www.instagram.com/goldenhomelloret',
  facebook: 'https://www.facebook.com/goldenhomelloret',
  linkedin: 'https://www.linkedin.com/company/golden-home-lloret',
  youtube: 'https://www.youtube.com/@goldenhomelloret',
  pinterest: 'https://www.pinterest.com/goldenhomelloret',
} as const

export interface Partner {
  id: string
  name: string
  logo: string
  url: string
  description: LocalizedString
}

export const PARTNERS: Partner[] = [
  {
    id: 'sothebys',
    name: "Sotheby's International Realty",
    logo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&q=80',
    url: 'https://www.sothebysrealty.com',
    description: {
      es: 'Red global de referencia en propiedades de lujo.',
      ca: 'Xarxa global de referència en propietats de luxe.',
      en: 'Global network of reference for luxury properties.',
      fr: 'Réseau mondial de référence pour les propriétés de luxe.',
    },
  },
  {
    id: 'engel-volkers',
    name: 'Engel & Völkers',
    logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80',
    url: 'https://www.engelvoelkers.com',
    description: {
      es: 'Colaboración estratégica en el segmento premium de la Costa Brava.',
      ca: 'Col·laboració estratègica en el segment premium de la Costa Brava.',
      en: 'Strategic collaboration in the Costa Brava premium segment.',
      fr: 'Collaboration stratégique dans le segment premium de la Costa Brava.',
    },
  },
  {
    id: 'costa-brava-tourism',
    name: 'Costa Brava Tourism Board',
    logo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80',
    url: 'https://www.costabrava.org',
    description: {
      es: 'Promoción conjunta del destino y su mercado inmobiliario.',
      ca: 'Promoció conjunta del destí i el seu mercat immobiliari.',
      en: 'Joint promotion of the destination and its real estate market.',
      fr: 'Promotion conjointe de la destination et de son marché immobilier.',
    },
  },
  {
    id: 'girona-properties',
    name: 'Girona Properties Association',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80',
    url: 'https://www.apicat.org',
    description: {
      es: 'Asociación profesional de agentes inmobiliarios de Girona.',
      ca: "Associació professional d'agents immobiliaris de Girona.",
      en: 'Professional association of real estate agents in Girona.',
      fr: 'Association professionnelle des agents immobiliers de Girona.',
    },
  },
]

export const DEFAULT_MAX_PRICE = 50_000_000
export const DEFAULT_MAX_AREA = 10_000
