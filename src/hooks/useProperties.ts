import { useMemo } from 'react'
import type { Language } from '@/types'
import { filterProperties, getAllProperties } from '@/services/propertyService'
import { useFilterStore } from '@/stores/useFilterStore'

export function useProperties(lang: Language = 'es') {
  const filters = useFilterStore((state) => state.filters)
  const sort = useFilterStore((state) => state.sort)

  return useMemo(
    () => filterProperties(getAllProperties(), filters, sort, lang),
    [filters, sort, lang],
  )
}
