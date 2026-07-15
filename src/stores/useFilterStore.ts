import { create } from 'zustand'
import type { PropertyFilters, SortOption } from '@/types'
import { DEFAULT_MAX_AREA, DEFAULT_MAX_PRICE } from '@/utils/constants'

export const defaultFilters: PropertyFilters = {
  query: '',
  priceMin: 0,
  priceMax: DEFAULT_MAX_PRICE,
  bedrooms: null,
  bathrooms: null,
  type: '',
  pool: false,
  seaViews: false,
  garden: false,
  parking: false,
  elevator: false,
  terrace: false,
  newConstruction: false,
  luxury: false,
  exclusive: false,
  nearBeach: false,
  mountain: false,
  investment: false,
  reference: '',
  province: '',
  city: '',
  areaMin: 0,
  areaMax: DEFAULT_MAX_AREA,
}

interface FilterState {
  filters: PropertyFilters
  sort: SortOption
  setFilter: <K extends keyof PropertyFilters>(key: K, value: PropertyFilters[K]) => void
  resetFilters: () => void
  setSort: (sort: SortOption) => void
}

export const useFilterStore = create<FilterState>((set) => ({
  filters: { ...defaultFilters },
  sort: 'newest',

  setFilter: (key, value) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    })),

  resetFilters: () =>
    set({
      filters: { ...defaultFilters },
      sort: 'newest',
    }),

  setSort: (sort) => set({ sort }),
}))
