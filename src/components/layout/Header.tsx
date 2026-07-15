import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Heart, GitCompareArrows } from 'lucide-react'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { PROPERTY_TYPES } from '@/utils/constants'
import { LanguageSelector } from '@/components/ui/LanguageSelector'
import { CurrencySelector } from '@/components/ui/CurrencySelector'
import { Logo } from '@/components/ui/Logo'
import { Container } from '@/components/ui/Container'
import { StickySearchBar } from '@/components/search/StickySearchBar'
import { getLocalizedText } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { Language } from '@/types'

const LOCATIONS = [
  { slug: 'lloret-de-mar', name: 'Lloret de Mar' },
  { slug: 'tossa-de-mar', name: 'Tossa de Mar' },
  { slug: 'blanes', name: 'Blanes' },
  { slug: 'platja-daro', name: "Platja d'Aro" },
  { slug: 'santa-cristina', name: "Santa Cristina d'Aro" },
] as const

const linkClass =
  'text-sm font-medium tracking-wide text-charcoal/80 hover:text-gold transition-colors'

export function Header() {
  const { t } = useTranslation()
  const location = useLocation()
  const scrollY = useScrollPosition()
  const showStickySearch = scrollY > 280
  const [mobileOpen, setMobileOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const megaRef = useRef<HTMLDivElement>(null)

  const lang = (location.pathname.split('/')[1] as Language) || 'es'

  const navLinks = [
    { href: `/${lang}`, label: t('nav.home') },
    { href: `/${lang}/about`, label: t('nav.about') },
    { href: `/${lang}/blog`, label: t('nav.blog') },
    { href: `/${lang}/contact`, label: t('nav.contact') },
  ]

  useEffect(() => {
    if (showStickySearch) {
      document.documentElement.dataset.stickySearch = 'true'
    } else {
      delete document.documentElement.dataset.stickySearch
    }
  }, [showStickySearch])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMegaOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 overflow-visible bg-white/85 backdrop-blur-xl border-b border-charcoal/10 shadow-sm shadow-charcoal/[0.03]">
        <Container>
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Logo to={`/${lang}`} />

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href} className={linkClass}>
                  {link.label}
                </Link>
              ))}

              <div ref={megaRef} className="relative">
                <button
                  type="button"
                  onClick={() => setMegaOpen(!megaOpen)}
                  className={`flex items-center gap-1 ${linkClass}`}
                  aria-expanded={megaOpen}
                >
                  {t('nav.properties')}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[640px] bg-white border border-charcoal/10 shadow-xl p-8 rounded-sm"
                    >
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
                            {t('search.type')}
                          </h3>
                          <ul className="space-y-2">
                            {PROPERTY_TYPES.map((type) => (
                              <li key={type.value}>
                                <Link
                                  to={`/${lang}/properties?type=${type.value}`}
                                  className="text-sm text-charcoal/70 hover:text-gold transition-colors"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  {getLocalizedText(type.label, lang)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
                            {t('search.city')}
                          </h3>
                          <ul className="space-y-2">
                            {LOCATIONS.map((loc) => (
                              <li key={loc.slug}>
                                <Link
                                  to={`/${lang}/properties?city=${encodeURIComponent(loc.name)}`}
                                  className="text-sm text-charcoal/70 hover:text-gold transition-colors"
                                  onClick={() => setMegaOpen(false)}
                                >
                                  {loc.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="hidden lg:flex items-center gap-1">
              <LanguageSelector />
              <CurrencySelector />
              <Link
                to={`/${lang}/favorites`}
                className="p-2 text-charcoal/70 hover:text-gold transition-colors"
                aria-label={t('nav.favorites')}
              >
                <Heart className="w-4 h-4" />
              </Link>
              <Link
                to={`/${lang}/compare`}
                className="p-2 text-charcoal/70 hover:text-gold transition-colors"
                aria-label={t('nav.compare')}
              >
                <GitCompareArrows className="w-4 h-4" />
              </Link>
            </div>

            <div className="lg:hidden flex items-center gap-1">
              <LanguageSelector />
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="p-2 text-charcoal hover:text-gold transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>

        <div
          aria-hidden={!showStickySearch}
          className={cn(
            'absolute left-0 right-0 top-[var(--header-nav-h)] h-[var(--header-search-h)] border-t border-charcoal/[0.06] bg-white/90 backdrop-blur-xl shadow-sm shadow-charcoal/[0.04] transition-[opacity,transform] duration-200 ease-out',
            showStickySearch
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-full pointer-events-none',
          )}
        >
          <Container className="h-full">
            <StickySearchBar />
          </Container>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-charcoal/40 z-50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl border-l border-charcoal/10"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-charcoal/10 bg-white">
                  <Logo to={`/${lang}`} />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-charcoal hover:text-gold transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6 space-y-1 bg-white">
                  <Link
                    to={`/${lang}/properties`}
                    className="block py-3 text-base font-medium text-charcoal hover:text-gold transition-colors border-b border-charcoal/5"
                  >
                    {t('nav.properties')}
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="block py-3 text-base font-medium text-charcoal hover:text-gold transition-colors border-b border-charcoal/5"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="pt-6">
                    <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-3">
                      {t('search.type')}
                    </h3>
                    <div className="space-y-2 mb-6">
                      {PROPERTY_TYPES.map((type) => (
                        <Link
                          key={type.value}
                          to={`/${lang}/properties?type=${type.value}`}
                          className="block text-sm text-charcoal/70 hover:text-gold transition-colors"
                        >
                          {getLocalizedText(type.label, lang)}
                        </Link>
                      ))}
                    </div>

                    <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-3">
                      {t('search.city')}
                    </h3>
                    <div className="space-y-2">
                      {LOCATIONS.map((loc) => (
                        <Link
                          key={loc.slug}
                          to={`/${lang}/properties?city=${encodeURIComponent(loc.name)}`}
                          className="block text-sm text-charcoal/70 hover:text-gold transition-colors"
                        >
                          {loc.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </nav>

                <div className="p-6 border-t border-charcoal/10 flex items-center justify-end gap-1 bg-white">
                  <CurrencySelector />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
