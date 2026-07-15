import { useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '@/stores/useAppStore'

export function DarkModeToggle() {
  const { t } = useTranslation()
  const { darkMode, toggleDarkMode } = useAppStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <button
      type="button"
      onClick={toggleDarkMode}
      className="p-2 text-charcoal/70 hover:text-gold transition-colors"
      aria-label={darkMode ? t('common.lightMode') : t('common.darkMode')}
    >
      {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  )
}
