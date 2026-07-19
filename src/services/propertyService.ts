import Fuse from 'fuse.js'
import type { Language, Property, PropertyFilters, SortOption } from '@/types'
import { resolvePropertyImages } from '@/utils/propertyImages'

type PropertyRecord = Omit<Property, 'images' | 'imageCount'> & {
  images?: string[]
  imageCount?: number
}

const propertyModules = import.meta.glob<PropertyRecord>('../properties/*.json', {
  eager: true,
})

function normalizeProperty(record: PropertyRecord): Property {
  const images = resolvePropertyImages(record.slug)
  const { images: _legacyImages, imageCount: _imageCount, ...rest } = record

  return {
    ...rest,
    imageCount: images.length,
    images,
  }
}

const allProperties: Property[] = Object.values(propertyModules).map(normalizeProperty)

export function getAllProperties(): Property[] {
  return allProperties
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return allProperties.find((property) => property.slug === slug)
}

export function getFeaturedProperties(limit = 5): Property[] {
  return allProperties
    .filter((property) => property.featured)
    .sort((a, b) => b.price - a.price)
    .slice(0, limit)
}

export function getRelatedProperties(slug: string, limit = 3): Property[] {
  const current = getPropertyBySlug(slug)
  if (!current) return []

  return allProperties
    .filter((property) => property.slug !== slug)
    .map((property) => ({
      property,
      score:
        (property.city === current.city ? 3 : 0) +
        (property.type === current.type ? 2 : 0) +
        (property.province === current.province ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ property }) => property)
    .slice(0, limit)
}

export function getLatestProperties(limit = 6): Property[] {
  return [...allProperties]
    .sort((a, b) => compareByRecency(a, b))
    .slice(0, limit)
}

export function getLatestProperty(): Property | undefined {
  return [...allProperties].sort((a, b) => compareByRecency(a, b))[0]
}

function compareByRecency(a: Property, b: Property): number {
  const dateDiff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  if (dateDiff !== 0) return dateDiff
  return b.reference.localeCompare(a.reference)
}

export function getUniqueCities(): string[] {
  return [...new Set(allProperties.map((property) => property.city))].sort()
}

export function getUniqueProvinces(): string[] {
  return [...new Set(allProperties.map((property) => property.province))].sort()
}

export function getPriceRange(): { min: number; max: number } {
  if (allProperties.length === 0) {
    return { min: 0, max: 0 }
  }

  const prices = allProperties.map((property) => property.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

function createPropertyFuse(properties: Property[], lang: Language) {
  return new Fuse(properties, {
    keys: [
      { name: `title.${lang}`, weight: 0.25 },
      { name: `description.${lang}`, weight: 0.2 },
      { name: `location.${lang}`, weight: 0.15 },
      { name: 'reference', weight: 0.15 },
      { name: 'city', weight: 0.1 },
      { name: 'province', weight: 0.05 },
      { name: 'slug', weight: 0.05 },
      { name: `features.${lang}`, weight: 0.05 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  })
}

export function searchPropertiesByQuery(
  query: string,
  lang: Language,
  limit?: number,
): Property[] {
  const trimmed = query.trim()
  if (!trimmed) return []

  const results = createPropertyFuse(allProperties, lang)
    .search(trimmed)
    .map((match) => match.item)

  return limit ? results.slice(0, limit) : results
}

function matchesBooleanFilter(
  filterValue: boolean,
  propertyValue: boolean,
): boolean {
  return !filterValue || propertyValue
}

function applyStructuralFilters(
  properties: Property[],
  filters: PropertyFilters,
): Property[] {
  return properties.filter((property) => {
    if (property.price < filters.priceMin || property.price > filters.priceMax) {
      return false
    }

    if (filters.bedrooms !== null && property.bedrooms < filters.bedrooms) {
      return false
    }

    if (filters.bathrooms !== null && property.bathrooms < filters.bathrooms) {
      return false
    }

    if (filters.type && property.type !== filters.type) {
      return false
    }

    if (filters.province && property.province !== filters.province) {
      return false
    }

    if (filters.city && property.city !== filters.city) {
      return false
    }

    if (property.builtArea < filters.areaMin || property.builtArea > filters.areaMax) {
      return false
    }

    if (
      filters.reference &&
      !property.reference.toLowerCase().includes(filters.reference.toLowerCase())
    ) {
      return false
    }

    return (
      matchesBooleanFilter(filters.pool, property.pool) &&
      matchesBooleanFilter(filters.seaViews, property.seaViews) &&
      matchesBooleanFilter(filters.garden, property.garden) &&
      matchesBooleanFilter(filters.parking, property.parking) &&
      matchesBooleanFilter(filters.elevator, property.elevator) &&
      matchesBooleanFilter(filters.terrace, property.terrace) &&
      matchesBooleanFilter(filters.newConstruction, property.newConstruction) &&
      matchesBooleanFilter(filters.luxury, property.luxury) &&
      matchesBooleanFilter(filters.exclusive, property.exclusive) &&
      matchesBooleanFilter(filters.nearBeach, property.nearBeach) &&
      matchesBooleanFilter(filters.mountain, property.mountain) &&
      matchesBooleanFilter(filters.investment, property.investment)
    )
  })
}

function sortProperties(properties: Property[], sort: SortOption): Property[] {
  const sorted = [...properties]

  switch (sort) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'views':
      return sorted.sort((a, b) => b.views - a.views)
    case 'featured':
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
    case 'newest':
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
  }
}

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters,
  sort: SortOption,
  lang: Language,
): Property[] {
  let result = properties
  const query = filters.query.trim()

  if (query) {
    result = searchPropertiesByQuery(query, lang)
  }

  return sortProperties(applyStructuralFilters(result, filters), sort)
}
