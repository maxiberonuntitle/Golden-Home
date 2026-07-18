import { getManifestImagesForSlug } from '@/generated/propertyImages.manifest'

export const MAX_PROPERTY_IMAGES = 20

export function resolvePropertyImageCount(slug: string): number {
  return getManifestImagesForSlug(slug).length
}

export function resolvePropertyImages(slug: string): string[] {
  return [...getManifestImagesForSlug(slug)]
}
