import type { BlogPost, Language } from '@/types'
import { getLocalizedText } from '@/utils/format'

const blogModules = import.meta.glob<BlogPost>('../data/blog/*.json', {
  eager: true,
})

const allPosts: BlogPost[] = Object.values(blogModules).sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
)

export function getAllPosts(): BlogPost[] {
  return allPosts
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return allPosts.find((post) => post.slug === slug)
}

export function getRelatedPosts(slug: string, limit = 3, lang: Language = 'es'): BlogPost[] {
  const current = getPostBySlug(slug)
  if (!current) return []

  const currentCategory = getLocalizedText(current.category, lang)
  const currentTags = new Set(current.tags.map((tag) => getLocalizedText(tag, lang)))

  return allPosts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) =>
        currentTags.has(getLocalizedText(tag, lang)),
      ).length

      const sameCategory =
        getLocalizedText(post.category, lang) === currentCategory ? 2 : 0

      return { post, score: sameCategory + sharedTags }
    })
    .sort((a, b) => b.score - a.score)
    .map(({ post }) => post)
    .slice(0, limit)
}

export function getPostsByCategory(category: string, lang: Language = 'es'): BlogPost[] {
  return allPosts.filter(
    (post) => getLocalizedText(post.category, lang).toLowerCase() === category.toLowerCase(),
  )
}
