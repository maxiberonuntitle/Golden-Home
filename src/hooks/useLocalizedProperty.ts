import { useMemo } from 'react'
import type { Language, Property } from '@/types'
import { getLocalizedText } from '@/utils/format'

export interface LocalizedProperty {
  id: string
  reference: string
  slug: string
  title: string
  price: number
  location: string
  province: string
  city: string
  coordinates: Property['coordinates']
  type: Property['type']
  status: Property['status']
  bedrooms: number
  bathrooms: number
  builtArea: number
  plotArea: number
  description: string
  features: string[]
  images: string[]
  energyCertificate: Property['energyCertificate']
  virtualTour?: string
  youtube?: string
  featured: boolean
  exclusive: boolean
  luxury: boolean
  newConstruction: boolean
  pool: boolean
  seaViews: boolean
  garden: boolean
  parking: boolean
  elevator: boolean
  terrace: boolean
  nearBeach: boolean
  mountain: boolean
  investment: boolean
  views: number
  createdAt: string
  seo: {
    title: string
    description: string
    keywords: string
  }
}

function localizeProperty(property: Property, lang: Language): LocalizedProperty {
  return {
    id: property.id,
    reference: property.reference,
    slug: property.slug,
    title: getLocalizedText(property.title, lang),
    price: property.price,
    location: getLocalizedText(property.location, lang),
    province: property.province,
    city: property.city,
    coordinates: property.coordinates,
    type: property.type,
    status: property.status,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    builtArea: property.builtArea,
    plotArea: property.plotArea,
    description: getLocalizedText(property.description, lang),
    features: property.features.map((feature) => getLocalizedText(feature, lang)),
    images: property.images,
    energyCertificate: property.energyCertificate,
    virtualTour: property.virtualTour,
    youtube: property.youtube,
    featured: property.featured,
    exclusive: property.exclusive,
    luxury: property.luxury,
    newConstruction: property.newConstruction,
    pool: property.pool,
    seaViews: property.seaViews,
    garden: property.garden,
    parking: property.parking,
    elevator: property.elevator,
    terrace: property.terrace,
    nearBeach: property.nearBeach,
    mountain: property.mountain,
    investment: property.investment,
    views: property.views,
    createdAt: property.createdAt,
    seo: {
      title: getLocalizedText(property.seo.title, lang),
      description: getLocalizedText(property.seo.description, lang),
      keywords: getLocalizedText(property.seo.keywords, lang),
    },
  }
}

export function useLocalizedProperty(
  property: Property | undefined,
  lang: Language = 'es',
): LocalizedProperty | undefined {
  return useMemo(
    () => (property ? localizeProperty(property, lang) : undefined),
    [property, lang],
  )
}
