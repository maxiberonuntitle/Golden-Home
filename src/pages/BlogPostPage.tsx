import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Clock, User } from 'lucide-react'
import { SEO } from '@/components/seo/SEO'
import { Container } from '@/components/ui/Container'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getPostBySlug, getRelatedPosts } from '@/services/blogService'
import { COMPANY } from '@/utils/constants'
import { formatDate, getLocalizedText } from '@/utils/format'
import type { Language } from '@/types'

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const lang = (i18n.language.split('-')[0] || 'es') as Language

  const post = slug ? getPostBySlug(slug) : undefined
  const relatedPosts = slug ? getRelatedPosts(slug, 3, lang) : []

  if (!post) {
    return (
      <Container className="py-24 text-center">
        <p className="text-charcoal/60">{t('common.error')}</p>
        <Link to={`/${lang}/blog`} className="text-gold hover:underline mt-4 inline-block">
          {t('common.back')}
        </Link>
      </Container>
    )
  }

  const title = getLocalizedText(post.title, lang)
  const content = getLocalizedText(post.content, lang)
  const seoTitle = getLocalizedText(post.seo.title, lang)
  const seoDescription = getLocalizedText(post.seo.description, lang)
  const authorRole = getLocalizedText(post.authorRole, lang)

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={getLocalizedText(post.seo.keywords, lang)}
        image={post.image}
        url={`${COMPANY.website}/${lang}/blog/${post.slug}`}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          image: post.image,
          datePublished: post.publishedAt,
          author: { '@type': 'Person', name: post.author },
          publisher: {
            '@type': 'Organization',
            name: COMPANY.name,
            logo: { '@type': 'ImageObject', url: `${COMPANY.website}${COMPANY.logo}` },
          },
        }}
      />

      <article>
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.image})` }}
          />
          <div className="absolute inset-0 image-overlay" />
          <Container className="relative z-10">
            <Breadcrumbs
              items={[
                { label: t('blog.title'), href: `/${lang}/blog` },
                { label: title },
              ]}
            />
            <div className="max-w-3xl mt-8">
              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs uppercase tracking-wider mb-4">
                {getLocalizedText(post.category, lang)}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-warm-white leading-tight mb-6">
                {title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-warm-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t('blog.readingTime', { minutes: post.readingTime })}
                </span>
                <span>
                  {t('blog.publishedOn')} {formatDate(post.publishedAt, lang)}
                </span>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-12 lg:py-16">
          <Container>
            <div className="grid lg:grid-cols-12 gap-12">
              <ScrollReveal className="lg:col-span-8">
                <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/70 prose-a:text-gold prose-strong:text-charcoal prose-li:text-charcoal/70">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2} className="lg:col-span-4">
                <aside className="sticky top-[var(--header-sticky-offset)] p-8 bg-cream rounded-xl transition-[top] duration-200 ease-out">
                  <h3 className="font-serif text-xl text-charcoal mb-4">{t('blog.author')}</h3>
                  <p className="font-medium text-charcoal">{post.author}</p>
                  <p className="text-sm text-gold mb-4">{authorRole}</p>
                  <p className="text-sm text-charcoal/60 leading-relaxed">
                    {lang === 'es' &&
                      'Experto en mercado inmobiliario de la Costa Brava con amplia experiencia asesorando a compradores nacionales e internacionales.'}
                    {lang === 'ca' &&
                      'Expert en mercat immobiliari de la Costa Brava amb àmplia experiència assessorant compradors nacionals i internacionals.'}
                    {lang === 'en' &&
                      'Expert in the Costa Brava real estate market with extensive experience advising national and international buyers.'}
                    {lang === 'fr' &&
                      'Expert du marché immobilier de la Costa Brava avec une vaste expérience conseillant des acheteurs nationaux et internationaux.'}
                  </p>
                </aside>
              </ScrollReveal>
            </div>
          </Container>
        </section>

        {relatedPosts.length > 0 && (
          <section className="py-16 lg:py-24 bg-cream">
            <Container>
              <h2 className="font-serif text-3xl text-charcoal mb-10 text-center">
                {t('blog.relatedArticles')}
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    to={`/${lang}/blog/${related.slug}`}
                    className="group block"
                  >
                    <div className="overflow-hidden rounded-xl aspect-[16/10] mb-4">
                      <img
                        src={related.image}
                        alt={getLocalizedText(related.title, lang)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-serif text-lg text-charcoal group-hover:text-gold transition-colors line-clamp-2">
                      {getLocalizedText(related.title, lang)}
                    </h3>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </article>
    </>
  )
}
