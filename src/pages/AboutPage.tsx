import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Award, Eye, Heart, Lightbulb, Shield, Target } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { TEAM } from '@/data/team'
import { COMPANY } from '@/utils/constants'
import { getLocalizedText } from '@/utils/format'
import type { Language } from '@/types'

const VALUE_ICONS = [Award, Shield, Lightbulb, Heart] as const
const VALUE_KEYS = ['excellence', 'integrity', 'innovation', 'dedication'] as const

const TIMELINE_YEARS = ['2010', '2015', '2020', '2026'] as const

const AWARDS = [
  {
    year: '2024',
    title: {
      es: 'Mejor Agencia Inmobiliaria de Lujo — Costa Brava',
      ca: 'Millor Agència Immobiliària de Luxe — Costa Brava',
      en: 'Best Luxury Real Estate Agency — Costa Brava',
      fr: 'Meilleure Agence Immobilière de Luxe — Costa Brava',
    },
    org: {
      es: 'Premios Inmobiliarios Catalunya',
      ca: 'Premis Immobiliaris Catalunya',
      en: 'Catalonia Real Estate Awards',
      fr: 'Prix Immobilier Catalogne',
    },
  },
  {
    year: '2023',
    title: {
      es: 'Excelencia en Servicio al Cliente Internacional',
      ca: 'Excel·lència en Servei al Client Internacional',
      en: 'Excellence in International Client Service',
      fr: 'Excellence en Service Client International',
    },
    org: {
      es: 'European Property Awards',
      ca: 'European Property Awards',
      en: 'European Property Awards',
      fr: 'European Property Awards',
    },
  },
  {
    year: '2022',
    title: {
      es: 'Agencia Recomendada — Lloret de Mar',
      ca: 'Agència Recomanada — Lloret de Mar',
      en: 'Recommended Agency — Lloret de Mar',
      fr: 'Agence Recommandée — Lloret de Mar',
    },
    org: {
      es: 'Costa Brava Tourism Board',
      ca: 'Costa Brava Tourism Board',
      en: 'Costa Brava Tourism Board',
      fr: 'Office de Tourisme Costa Brava',
    },
  },
] as const

export function AboutPage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language

  return (
    <>
      <SEO
        title={`${t('about.title')} | ${COMPANY.name}`}
        description={t('about.subtitle')}
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
              <p className="text-charcoal/70 text-lg leading-relaxed">
                {lang === 'es' &&
                  'Desde 2010, Golden Home Lloret ha sido el punto de referencia para compradores y vendedores exigentes que buscan propiedades excepcionales en la Costa Brava. Nuestra sede en el corazón de Lloret de Mar nos permite ofrecer un conocimiento profundo del mercado local combinado con una red internacional de clientes e inversores.'}
                {lang === 'ca' &&
                  'Des de 2010, Golden Home Lloret ha estat el punt de referència per a compradors i venedors exigents que busquen propietats excepcionals a la Costa Brava. La nostra seu al cor de Lloret de Mar ens permet oferir un coneixement profund del mercat local combinat amb una xarxa internacional de clients i inversors.'}
                {lang === 'en' &&
                  'Since 2010, Golden Home Lloret has been the reference point for discerning buyers and sellers seeking exceptional properties on the Costa Brava. Our headquarters in the heart of Lloret de Mar allows us to offer deep local market knowledge combined with an international network of clients and investors.'}
                {lang === 'fr' &&
                  'Depuis 2010, Golden Home Lloret est le point de référence pour les acheteurs et vendeurs exigeants recherchant des propriétés exceptionnelles sur la Costa Brava. Notre siège au cœur de Lloret de Mar nous permet d\'offrir une connaissance approfondie du marché local combinée à un réseau international de clients et d\'investisseurs.'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="p-8 lg:p-10 bg-charcoal text-warm-white rounded-xl h-full">
                <Target className="w-8 h-8 text-gold mb-6" />
                <h3 className="font-serif text-2xl mb-4">
                  {lang === 'es'
                    ? 'Misión'
                    : lang === 'ca'
                      ? 'Missió'
                      : lang === 'en'
                        ? 'Mission'
                        : 'Mission'}
                </h3>
                <p className="text-warm-white/70 leading-relaxed">{t('about.mission')}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-8 lg:p-10 bg-cream rounded-xl h-full">
                <Eye className="w-8 h-8 text-gold mb-6" />
                <h3 className="font-serif text-2xl text-charcoal mb-4">
                  {lang === 'es'
                    ? 'Visión'
                    : lang === 'ca'
                      ? 'Visió'
                      : lang === 'en'
                        ? 'Vision'
                        : 'Vision'}
                </h3>
                <p className="text-charcoal/70 leading-relaxed">{t('about.vision')}</p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-cream">
        <Container>
          <ScrollReveal>
            <SectionHeading
              title={
                lang === 'es'
                  ? 'Nuestros valores'
                  : lang === 'ca'
                    ? 'Els nostres valors'
                    : lang === 'en'
                      ? 'Our values'
                      : 'Nos valeurs'
              }
            />
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
                    <h3 className="font-serif text-xl text-charcoal mb-3">
                      {t(`about.values.${key}.title`)}
                    </h3>
                    <p className="text-charcoal/60 text-sm leading-relaxed">
                      {t(`about.values.${key}.description`)}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('about.teamTitle')} />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-10">
            {TEAM.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.1}>
                <article className="text-center group">
                  <div className="relative overflow-hidden rounded-xl mb-6 aspect-[3/4]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-charcoal">{member.name}</h3>
                  <p className="text-gold text-sm mt-1 mb-3">
                    {getLocalizedText(member.role, lang)}
                  </p>
                  <p className="text-charcoal/60 text-sm leading-relaxed">
                    {getLocalizedText(member.bio, lang)}
                  </p>
                </article>
              </ScrollReveal>
            ))}
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
            {TIMELINE_YEARS.map((year, index) => (
              <ScrollReveal key={year} delay={index * 0.1}>
                <div className="flex gap-6 pb-10 last:pb-0 relative">
                  {index < TIMELINE_YEARS.length - 1 && (
                    <div className="absolute left-[27px] top-14 bottom-0 w-px bg-gold/30" />
                  )}
                  <div className="w-14 h-14 rounded-full bg-gold/20 border border-gold flex items-center justify-center shrink-0">
                    <span className="text-gold font-serif text-sm">{year}</span>
                  </div>
                  <div className="pt-3">
                    <p className="text-warm-white/70 leading-relaxed">
                      {t(`about.timeline.${year}`)}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('about.awardsTitle')} />
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-8">
            {AWARDS.map((award, index) => (
              <ScrollReveal key={award.year + index} delay={index * 0.1}>
                <div className="p-8 border border-charcoal/10 rounded-xl hover:border-gold/30 transition-colors">
                  <Award className="w-8 h-8 text-gold mb-4" />
                  <p className="text-gold text-sm font-medium mb-2">{award.year}</p>
                  <h3 className="font-serif text-lg text-charcoal mb-2">
                    {getLocalizedText(award.title, lang)}
                  </h3>
                  <p className="text-charcoal/50 text-sm">
                    {getLocalizedText(award.org, lang)}
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
