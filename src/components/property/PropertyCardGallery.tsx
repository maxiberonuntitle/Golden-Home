import { useCallback, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface PropertyCardGalleryProps {
  images: string[]
  title: string
  detailUrl: string
  scrollable?: boolean
}

export function PropertyCardGallery({
  images,
  title,
  detailUrl,
  scrollable = false,
}: PropertyCardGalleryProps) {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isDraggingRef = useRef(false)
  const pointerStartRef = useRef({ x: 0, y: 0 })

  const handleScroll = useCallback(() => {
    const scroller = scrollRef.current
    if (!scroller || scroller.clientWidth <= 0) return
    const index = Math.round(scroller.scrollLeft / scroller.clientWidth)
    setActiveIndex(Math.min(Math.max(index, 0), images.length - 1))
  }, [images.length])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false
    pointerStartRef.current = { x: event.clientX, y: event.clientY }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dx = Math.abs(event.clientX - pointerStartRef.current.x)
    const dy = Math.abs(event.clientY - pointerStartRef.current.y)
    if (dx > 10 || dy > 10) {
      isDraggingRef.current = true
    }
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) {
      navigate(detailUrl)
    }
  }

  const stopTouchPropagation = (event: React.TouchEvent) => {
    event.stopPropagation()
  }

  if (!scrollable || images.length <= 1) {
    return (
      <Link to={detailUrl} className="block h-full w-full">
        <img
          src={images[0]}
          alt={title}
          className="property-card-gallery-image transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </Link>
    )
  }

  return (
    <>
      <div
        ref={scrollRef}
        role="region"
        aria-label={title}
        aria-roledescription="carousel"
        onScroll={handleScroll}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchStart={stopTouchPropagation}
        onTouchMove={stopTouchPropagation}
        onTouchEnd={stopTouchPropagation}
        className="property-card-gallery flex h-full w-full min-w-0 snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-hide touch-pan-x"
      >
        {images.map((image, index) => (
          <div
            key={image}
            className="property-card-gallery-slide h-full w-full shrink-0 grow-0 basis-full snap-start snap-always"
            aria-hidden={index !== activeIndex}
          >
            <img
              src={image}
              alt={`${title} — ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className="property-card-gallery-image"
            />
          </div>
        ))}
      </div>
      <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex items-center rounded-sm bg-charcoal/50 px-2.5 py-1 text-xs text-warm-white backdrop-blur-sm">
        {activeIndex + 1} / {images.length}
      </span>
    </>
  )
}
