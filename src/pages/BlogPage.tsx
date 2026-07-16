import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Clock } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getAllPosts, getPostsByCategory } from '@/services/blogService'
import { COMPANY } from '@/utils/constants'
import { getLocalizedText } from '@/utils/format'
import type { Language } from '@/types'

export function BlogPage() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language
  const [activeCategory, setActiveCategory] = useState<string>('')

  const allPosts = getAllPosts()

  const categories = useMemo(() => {
    const unique = new Set(allPosts.map((post) => getLocalizedText(post.category, lang)))
    return ['', ...Array.from(unique)]
  }, [allPosts, lang])

  const filteredPosts = activeCategory
    ? getPostsByCategory(activeCategory, lang)
    : allPosts

  return (
    <>
      <SEO
        title={`${t('blog.title')} | ${COMPANY.name}`}
        description={t('blog.subtitle')}
        url={`${COMPANY.website}/${lang}/blog`}
      />

      <section className="py-16 lg:py-24">
        <Container>
          <ScrollReveal>
            <SectionHeading title={t('blog.title')} description={t('blog.subtitle')} />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3 justify-center mb-12">
              <button
                type="button"
                onClick={() => setActiveCategory('')}
                className={`px-4 py-2 text-sm border transition-colors ${
                  activeCategory === ''
                    ? 'bg-gold text-charcoal border-gold'
                    : 'border-charcoal/15 dark:border-white/15 text-charcoal/60 dark:text-warm-white/60 hover:border-gold/30'
                }`}
              >
                {lang === 'es'
                  ? 'Todas'
                  : lang === 'ca'
                    ? 'Totes'
                    : lang === 'en'
                      ? 'All'
                      : 'Toutes'}
              </button>
              {categories
                .filter(Boolean)
                .map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      activeCategory === category
                        ? 'bg-gold text-charcoal border-gold'
                        : 'border-charcoal/15 dark:border-white/15 text-charcoal/60 dark:text-warm-white/60 hover:border-gold/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.08}>
                <article className="group">
                  <Link to={`/${lang}/blog/${post.slug}`} className="block">
                    <div className="relative overflow-hidden rounded-xl aspect-[16/10] mb-5">
                      <img
                        src={post.image}
                        alt={getLocalizedText(post.title, lang)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-charcoal/80 text-warm-white text-xs">
                        {getLocalizedText(post.category, lang)}
                      </span>
                    </div>
                    <h2 className="font-serif text-xl text-charcoal dark:text-warm-white group-hover:text-gold transition-colors line-clamp-2 mb-3">
                      {getLocalizedText(post.title, lang)}
                    </h2>
                    <p className="text-charcoal/60 dark:text-warm-white/60 text-sm leading-relaxed line-clamp-3 mb-4">
                      {getLocalizedText(post.excerpt, lang)}
                    </p>
                    <div className="flex items-center justify-between text-xs text-charcoal/50 dark:text-warm-white/50">
                      <span>{post.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {t('blog.readingTime', { minutes: post.readingTime })}
                      </span>
                    </div>
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
