import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LegalDocumentId = 'privacy' | 'cookies' | 'legal'

interface LegalState {
  activeDocument: LegalDocumentId | null
  cookieConsent: 'accepted' | 'rejected' | null
  openLegal: (document: LegalDocumentId) => void
  closeLegal: () => void
  acceptCookies: () => void
  rejectCookies: () => void
}

export const useLegalStore = create<LegalState>()(
  persist(
    (set) => ({
      activeDocument: null,
      cookieConsent: null,

      openLegal: (document) => set({ activeDocument: document }),
      closeLegal: () => set({ activeDocument: null }),
      acceptCookies: () => set({ cookieConsent: 'accepted' }),
      rejectCookies: () => set({ cookieConsent: 'rejected' }),
    }),
    {
      name: 'golden-home-legal',
      partialize: (state) => ({ cookieConsent: state.cookieConsent }),
    },
  ),
)
