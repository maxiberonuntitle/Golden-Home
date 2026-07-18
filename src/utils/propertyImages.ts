export const MAX_PROPERTY_IMAGES = 20

export function buildPropertyImagePaths(slug: string, count: number): string[] {
  const safeCount = Math.min(Math.max(Math.floor(count), 1), MAX_PROPERTY_IMAGES)
  return Array.from(
    { length: safeCount },
    (_, index) => `/properties/${slug}/${String(index + 1).padStart(2, '0')}.png`,
  )
}

export function resolvePropertyImageCount(
  _slug: string,
  imageCount?: number,
  images?: string[],
): number {
  if (typeof imageCount === 'number' && imageCount > 0) {
    return Math.min(imageCount, MAX_PROPERTY_IMAGES)
  }

  if (images?.length) {
    return Math.min(images.length, MAX_PROPERTY_IMAGES)
  }

  return MAX_PROPERTY_IMAGES
}

export function resolvePropertyImages(
  slug: string,
  imageCount?: number,
  images?: string[],
): string[] {
  const count = resolvePropertyImageCount(slug, imageCount, images)
  return buildPropertyImagePaths(slug, count)
}
