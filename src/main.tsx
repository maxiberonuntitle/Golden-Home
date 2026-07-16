import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { I18nextProvider } from 'react-i18next'
import App from './App'
import i18n from './i18n'
import './styles/index.css'
import { useAppStore } from './stores/useAppStore'

function readDarkModePreference(): boolean {
  try {
    const stored = localStorage.getItem('golden-home-app')
    if (!stored) return false
    const parsed = JSON.parse(stored) as { state?: { darkMode?: boolean } }
    return parsed.state?.darkMode === true
  } catch {
    return false
  }
}

function applyDarkMode(darkMode: boolean) {
  document.documentElement.classList.toggle('dark', darkMode)
  document.querySelector('meta[name="theme-color"]')?.setAttribute(
    'content',
    darkMode ? '#1a1a1a' : '#faf8f5',
  )
}

applyDarkMode(readDarkModePreference())

function AppProviders() {
  const darkMode = useAppStore((s) => s.darkMode)

  useEffect(() => {
    applyDarkMode(darkMode)
  }, [darkMode])

  return (
    <I18nextProvider i18n={i18n}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </I18nextProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
)
