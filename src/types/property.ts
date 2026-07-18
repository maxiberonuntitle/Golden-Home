export type PropertyStatus = 'sale' | 'rent' | 'sold' | 'reserved'
export type PropertyType = 'villa' | 'apartment' | 'penthouse' | 'townhouse' | 'land' | 'commercial'
export type EnergyRating = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'

export interface LocalizedString {
  es: string
  ca: string
  en: string
  fr: string
}

export interface PropertySEO {
  title: LocalizedString
  description: LocalizedString
  keywords: LocalizedString
}

export interface PropertyCoordinates {
  lat: number
  lng: number
}

export interface PropertyListingDetails {
  zone?: LocalizedString
  floor?: LocalizedString
  condition?: LocalizedString
  yearBuilt?: number
  heating?: LocalizedString
  orientation?: LocalizedString
  energyConsumption?: number
  energyEmissions?: number
  advertiserNote?: LocalizedString
}

export interface NearbyPlace {
  name: LocalizedString
  distance: string
}

export interface Property {
  id: string
  reference: string
  slug: string
  title: LocalizedString
  price: number
  location: LocalizedString
  province: string
  city: string
  coordinates: PropertyCoordinates
  type: PropertyType
  status: PropertyStatus
  bedrooms: number
  bathrooms: number
  builtArea: number
  plotArea: number
  description: LocalizedString
  features: LocalizedString[]
  /** Resolved image paths scanned from /public/properties/{slug}/ at build time. */
  images: string[]
  /** Number of images detected for this property (read-only, derived from files). */
  imageCount?: number
  energyCertificate: EnergyRating
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
  seo: PropertySEO
  listingDetails?: PropertyListingDetails
  nearbyPlaces?: NearbyPlace[]
}

export interface PropertyFilters {
  query: string
  priceMin: number
  priceMax: number
  bedrooms: number | null
  bathrooms: number | null
  type: PropertyType | ''
  pool: boolean
  seaViews: boolean
  garden: boolean
  parking: boolean
  elevator: boolean
  terrace: boolean
  newConstruction: boolean
  luxury: boolean
  exclusive: boolean
  nearBeach: boolean
  mountain: boolean
  investment: boolean
  reference: string
  province: string
  city: string
  areaMin: number
  areaMax: number
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'views' | 'featured'

export interface BlogPost {
  id: string
  slug: string
  title: LocalizedString
  excerpt: LocalizedString
  content: LocalizedString
  category: LocalizedString
  author: string
  authorRole: LocalizedString
  image: string
  publishedAt: string
  readingTime: number
  tags: LocalizedString[]
  seo: PropertySEO
}

export interface TeamMember {
  id: string
  name: string
  role: LocalizedString
  bio: LocalizedString
  image: string
}
