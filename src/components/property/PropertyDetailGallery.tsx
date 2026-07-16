import { useCallback, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import { ZoomIn } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface PropertyDetailGalleryProps {
  images: string[]
  title: string
  onImageClick: (index: number) => void
}

export function PropertyDetailGallery({ images, title, onImageClick }: PropertyDetailGalleryProps) {
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const mobileScrollRef = useRef<HTMLDivElement>(null)

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index)
      mainSwiper?.slideTo(index)
      const scroller = mobileScrollRef.current
      if (scroller) {
        scroller.scrollTo({ left: index * scroller.clientWidth, behavior: 'smooth' })
      }
    },
    [mainSwiper],
  )

  const handleMobileScroll = useCallback(() => {
    const scroller = mobileScrollRef.current
    if (!scroller || scroller.clientWidth <= 0) return
    const index = Math.round(scroller.scrollLeft / scroller.clientWidth)
    setActiveIndex(Math.min(Math.max(index, 0), images.length - 1))
  }, [images.length])

  if (images.length === 0) {
    return (
      <div className="property-detail-gallery flex min-w-0 items-center justify-center rounded-xl bg-charcoal/5 dark:bg-white/5 text-sm text-charcoal/40 dark:text-warm-white/40">
        —
      </div>
    )
  }

  const counter =
    images.length > 1 ? (
      <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded-md bg-charcoal/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        {activeIndex + 1} / {images.length}
      </span>
    ) : null

  const thumbs =
    images.length > 1 ? (
      <div className="property-gallery-thumbs flex min-w-0 gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={`thumb-${image}`}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`${title} — ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={`property-gallery-thumb shrink-0 overflow-hidden rounded-md border-2 transition-opacity ${
              index === activeIndex
                ? 'border-gold opacity-100'
                : 'border-transparent opacity-60 hover:opacity-90'
            }`}
          >
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              draggable={false}
              className="property-gallery-thumb-image"
            />
          </button>
        ))}
      </div>
    ) : null

  return (
    <div className="property-detail-gallery-root min-w-0 max-w-full space-y-2 overflow-hidden">
      {/* Mobile / tablet: native scroll-snap (no Swiper overflow issues) */}
      <div className="property-detail-gallery relative overflow-hidden rounded-xl bg-charcoal/5 dark:bg-white/5 lg:hidden">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="property-detail-gallery-track flex h-full w-full snap-x snap-mandatory overflow-x-auto overflow-y-hidden scrollbar-hide"
        >
          {images.map((image, index) => (
            <div
              key={image}
              className="property-detail-gallery-slide h-full w-full shrink-0 grow-0 basis-full snap-start snap-always"
            >
              <button
                type="button"
                className="property-gallery-slide group block h-full w-full"
                onClick={() => onImageClick(index)}
                aria-label={`${title} — ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${title} — ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                  className="property-gallery-image"
                />
              </button>
            </div>
          ))}
        </div>
        {counter}
      </div>

      {/* Desktop: Swiper */}
      <div className="property-detail-gallery relative hidden overflow-hidden rounded-xl bg-charcoal/5 dark:bg-white/5 lg:block">
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={images.length > 1}
          pagination={images.length > 1 ? { clickable: true } : false}
          slidesPerView={1}
          spaceBetween={0}
          onSwiper={setMainSwiper}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          observer
          observeParents
          resizeObserver
          className="property-gallery-main h-full w-full max-w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image} className="!w-full">
              <button
                type="button"
                className="property-gallery-slide group block h-full w-full"
                onClick={() => onImageClick(index)}
                aria-label={`${title} — ${index + 1}`}
              >
                <img
                  src={image}
                  alt={`${title} — ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  draggable={false}
                  className="property-gallery-image"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors group-hover:bg-charcoal/10">
                  <ZoomIn className="h-7 w-7 text-white opacity-0 drop-shadow-md transition-opacity group-hover:opacity-100" />
                </span>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        {counter}
      </div>

      {thumbs}
    </div>
  )
}
