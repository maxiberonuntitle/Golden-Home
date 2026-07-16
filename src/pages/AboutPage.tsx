import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Award, Eye, Heart, Lightbulb, Shield, Target } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { COMPANY } from '@/utils/constants'
import type { Language } from '@/types'

const VALUE_ICONS = [Award, Shield, Lightbulb, Heart] as const
const VALUE_KEYS = ['excellence', 'integrity', 'innovation', 'dedication'] as const
const TIMELINE_KEYS = ['origins', 'localPresence', 'digitalTools', 'commitment'] as const

export function AboutPage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language

  return (
    <>
      <SEO
        title={t('seo.aboutTitle')}
        description={t('seo.aboutDescription')}
        keywords={t('seo.defaultKeywords')}
        url={`${COMPANY.website}/${lang}/about`}
      />

      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0 image-overlay" />
        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gold text-sm uppercase tracking-[0.25em] mb-4">
              {COMPANY.name}
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-warm-white mb-6">
              {t('about.title')}
            </h1>
            <p className="text-warm-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <p className="text-charcoal/70 dark:text-warm-white/70 text-lg leading-relaxed">
                {t('about.intro')}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="p-8 lg:p-10 bg-charcoal text-warm-white rounded-xl h-full">
                <Target className="w-8 h-8 text-gold mb-6" />
                <h2 className="font-serif text-2xl mb-4">{t('about.missionTitle')}</h2>
                <p className="text-warm-white/70 leading-relaxed">{t('about.mission')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-8 lg:p-10 bg-cream dark:bg-graphite rounded-xl h-full">
                <Eye className="w-8 h-8 text-gold mb-6" />
                <h2 className="font-serif text-2xl text-charcoal dark:text-warm-white mb-4">
                  {t('about.visionTitle')}
                </h2>
                <p className="text-charcoal/70 dark:text-warm-white/70 leading-relaxed">{t('about.vision')}</p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-cream dark:bg-graphite">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('about.valuesTitle')} />
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUE_KEYS.map((key, index) => {
              const Icon = VALUE_ICONS[index]
              return (
                <ScrollReveal key={key} delay={index * 0.1}>
                  <div className="text-center p-6">
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                      <Icon className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="font-serif text-xl text-charcoal dark:text-warm-white mb-3">
                      {t(`about.values.${key}.title`)}
                    </h3>
                    <p className="text-charcoal/60 dark:text-warm-white/60 text-sm leading-relaxed">
                      {t(`about.values.${key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-charcoal text-warm-white">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={t('about.timelineTitle')}
              className="[&_h2]:text-warm-white [&_p]:text-warm-white/60"
            />
          </ScrollReveal>
          <div className="max-w-2xl mx-auto">
            {TIMELINE_KEYS.map((key, index) => (
              <ScrollReveal key={key} delay={index * 0.1}>
                <div className="flex gap-5 pb-10 last:pb-0 relative">
                  {index < TIMELINE_KEYS.length - 1 && (
                    <div className="absolute left-[7px] top-4 bottom-0 w-px bg-gold/30" />
                  )}
                  <div className="mt-1.5 h-3.5 w-3.5 rounded-full bg-gold shrink-0" />
                  <p className="text-warm-white/70 leading-relaxed pt-0.5">
                    {t(`about.timeline.${key}`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
