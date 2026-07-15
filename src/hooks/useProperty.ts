import { useMemo } from 'react'
import { getPropertyBySlug } from '@/services/propertyService'

export function useProperty(slug: string | undefined) {
  return useMemo(
    () => (slug ? getPropertyBySlug(slug) : undefined),
    [slug],
  )
}
