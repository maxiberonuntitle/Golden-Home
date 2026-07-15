import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import es from '../locales/es.json'
import ca from '../locales/ca.json'
import en from '../locales/en.json'
import fr from '../locales/fr.json'

export const languages = ['es', 'ca', 'en', 'fr'] as const
export const defaultLanguage = 'es'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es },
      ca: { translation: ca },
      en: { translation: en },
      fr: { translation: fr },
    },
    fallbackLng: defaultLanguage,
    supportedLngs: [...languages],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
