import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { COMPANY } from '@/utils/constants'

export function NotFoundPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const lang = location.pathname.split('/')[1] || 'es'

  return (
    <>
      <SEO
        title={`404 | ${COMPANY.name}`}
        description={t('seo.defaultDescription')}
        noindex
      />

      <section className="min-h-[80vh] flex items-center justify-center py-20">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm uppercase tracking-[0.3em] mb-6">404</p>
            <h1 className="font-serif text-5xl sm:text-7xl text-charcoal mb-6">
              {lang === 'es' && 'Página no encontrada'}
              {lang === 'ca' && 'Pàgina no trobada'}
              {lang === 'en' && 'Page not found'}
              {lang === 'fr' && 'Page introuvable'}
            </h1>
            <p className="text-charcoal/60 text-lg max-w-md mx-auto mb-10 leading-relaxed">
              {lang === 'es' &&
                'La página que busca no existe o ha sido movida. Explore nuestra cartera de propiedades de lujo en la Costa Brava.'}
              {lang === 'ca' &&
                'La pàgina que busca no existeix o ha estat moguda. Explori la nostra cartera de propietats de luxe a la Costa Brava.'}
              {lang === 'en' &&
                'The page you are looking for does not exist or has been moved. Explore our luxury property portfolio on the Costa Brava.'}
              {lang === 'fr' &&
                'La page que vous recherchez n\'existe pas ou a été déplacée. Explorez notre portefeuille de propriétés de luxe sur la Costa Brava.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={`/${lang}`}>
                <Button variant="primary" size="lg">
                  <Home className="w-4 h-4" />
                  {t('nav.home')}
                </Button>
              </Link>
              <Link to={`/${lang}/properties`}>
                <Button variant="secondary" size="lg">
                  {t('nav.properties')}
                </Button>
              </Link>
              <button
                type="button"
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {t('common.back')}
              </button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
