import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin } from 'lucide-react'
import { COMPANY, SOCIAL } from '@/utils/constants'
import { useLegalStore } from '@/stores/useLegalStore'
import { scrollToTop } from '@/utils/scroll'
import { Logo } from '@/components/ui/Logo'
import { Container } from '@/components/ui/Container'
import type { Language } from '@/types'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function Footer() {
  const { t } = useTranslation()
  const location = useLocation()
  const openLegal = useLegalStore((state) => state.openLegal)
  const lang = (location.pathname.split('/')[1] as Language) || 'es'
  const year = new Date().getFullYear()

  const quickLinks = [
    { href: `/${lang}`, label: t('nav.home') },
    { href: `/${lang}/properties`, label: t('nav.properties') },
    { href: `/${lang}/about`, label: t('nav.about') },
    { href: `/${lang}/blog`, label: t('nav.blog') },
    { href: `/${lang}/contact`, label: t('nav.contact') },
    { href: `/${lang}/favorites`, label: t('nav.favorites') },
  ]

  const socialLinks = [
    { href: SOCIAL.instagram, icon: InstagramIcon, label: 'Instagram' },
    { href: SOCIAL.facebook, icon: FacebookIcon, label: 'Facebook' },
  ]

  return (
    <footer className="bg-charcoal text-warm-white/80 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-1">
            <Logo to={`/${lang}`} forceLight imageClassName="opacity-90" onNavigate={() => scrollToTop()} />
            <p className="mt-4 text-sm leading-relaxed text-warm-white/50">
              {t('footer.description')}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-6">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={() => scrollToTop()}
                    className="text-sm text-warm-white/60 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-6">
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span className="text-sm text-warm-white/60">{COMPANY.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-sm text-warm-white/60 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-sm text-warm-white/60 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-gold mb-6">
              {t('footer.followUs')}
            </h3>
            <div className="flex gap-3 mb-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 border border-warm-white/10 text-warm-white/60 hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-sm font-medium rounded-sm hover:opacity-90 transition-opacity"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>{t('footer.instagramButton')}</span>
              <span className="text-white/80">{t('footer.instagramHandle')}</span>
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-warm-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-warm-white/40">
              {t('footer.rights', { year })}
            </p>
            <a
              href="https://maxisoluciones.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-[10px] text-gold italic hover:text-gold-light transition-colors"
            >
              {t('footer.siteBy')}
            </a>
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => openLegal('privacy')}
              className="text-xs text-warm-white/40 hover:text-gold transition-colors"
            >
              {t('footer.privacy')}
            </button>
            <button
              type="button"
              onClick={() => openLegal('cookies')}
              className="text-xs text-warm-white/40 hover:text-gold transition-colors"
            >
              {t('footer.cookies')}
            </button>
            <button
              type="button"
              onClick={() => openLegal('legal')}
              className="text-xs text-warm-white/40 hover:text-gold transition-colors"
            >
              {t('footer.legal')}
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
