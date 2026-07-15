import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Currency } from '@/types'

const MAX_COMPARE = 3
const MAX_RECENTLY_VIEWED = 10

interface AppState {
  favorites: string[]
  compare: string[]
  recentlyViewed: string[]
  currency: Currency
  darkMode: boolean
  toggleFavorite: (id: string) => void
  toggleCompare: (id: string) => void
  addRecentlyViewed: (id: string) => void
  setCurrency: (currency: Currency) => void
  toggleDarkMode: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      favorites: [],
      compare: [],
      recentlyViewed: [],
      currency: 'EUR',
      darkMode: false,

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favoriteId) => favoriteId !== id)
            : [...state.favorites, id],
        })),

      toggleCompare: (id) =>
        set((state) => {
          if (state.compare.includes(id)) {
            return {
              compare: state.compare.filter((compareId) => compareId !== id),
            }
          }

          if (state.compare.length >= MAX_COMPARE) {
            return state
          }

          return { compare: [...state.compare, id] }
        }),

      addRecentlyViewed: (id) =>
        set((state) => ({
          recentlyViewed: [
            id,
            ...state.recentlyViewed.filter((viewedId) => viewedId !== id),
          ].slice(0, MAX_RECENTLY_VIEWED),
        })),

      setCurrency: (currency) => set({ currency }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'golden-home-app',
      partialize: (state) => ({
        favorites: state.favorites,
        compare: state.compare,
        recentlyViewed: state.recentlyViewed,
        currency: state.currency,
        darkMode: state.darkMode,
      }),
    },
  ),
)
