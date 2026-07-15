import { useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
  enabled?: boolean
}

export function useInfiniteScroll(
  onIntersect: () => void,
  options: UseInfiniteScrollOptions = {},
) {
  const { root = null, rootMargin = '200px', threshold = 0, enabled = true } = options
  const sentinelRef = useRef<HTMLDivElement | null>(null)
  const onIntersectRef = useRef(onIntersect)

  useEffect(() => {
    onIntersectRef.current = onIntersect
  }, [onIntersect])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!enabled || !sentinel) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          onIntersectRef.current()
        }
      },
      { root, rootMargin, threshold },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [enabled, root, rootMargin, threshold])

  return sentinelRef
}
