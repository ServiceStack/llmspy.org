'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface ScreenshotsGalleryViewProps {
  images: Record<string, string>
  className?: string
  alt?: string
}

export function ScreenshotsGalleryView({ images, className, alt }: ScreenshotsGalleryViewProps) {
  const entries = useMemo(() => Object.entries(images), [images])
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([])

  const count = entries.length
  const current = entries[activeIndex] ?? entries[0]

  useEffect(() => {
    if (activeIndex >= count) setActiveIndex(0)
  }, [activeIndex, count])

  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeIndex])

  const previous = useCallback(() => {
    if (count > 1) setActiveIndex(index => (index - 1 + count) % count)
  }, [count])

  const next = useCallback(() => {
    if (count > 1) setActiveIndex(index => (index + 1) % count)
  }, [count])

  useEffect(() => {
    if (!lightboxOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxOpen(false)
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        previous()
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        next()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxOpen, next, previous])

  const onGalleryKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (lightboxOpen) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      previous()
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      next()
    }
  }

  if (!current) return null

  const [title, src] = current
  const imageAlt = alt ? `${alt} — ${title}` : title

  return (
    <div
      className={className ?? 'not-prose my-8'}
      onKeyDown={onGalleryKeyDown}
      aria-label={`${alt || 'Screenshot'} gallery`}
    >
      <div className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
          aria-label={`Open ${title} in full size`}
        >
          <img
            src={src}
            alt={imageAlt}
            className="aspect-video w-full object-contain"
            loading="lazy"
            decoding="async"
          />
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/75 via-black/20 to-transparent px-4 pb-3 pt-12 text-white">
          <span className="min-w-0 truncate text-sm font-medium sm:text-base">{title}</span>
          <span className="shrink-0 rounded-full bg-black/45 px-2 py-0.5 text-xs tabular-nums">
            {activeIndex + 1} / {count}
          </span>
        </div>

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white opacity-80 shadow transition hover:bg-black/70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
              aria-label="Previous screenshot"
              title="Previous screenshot"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white opacity-80 shadow transition hover:bg-black/70 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
              aria-label="Next screenshot"
              title="Next screenshot"
            >
              <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex snap-x gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Choose a screenshot">
          {entries.map(([itemTitle, itemSrc], index) => (
            <button
              key={itemTitle}
              ref={element => { thumbnailRefs.current[index] = element }}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Show ${itemTitle}`}
              onClick={() => setActiveIndex(index)}
              className={`w-28 shrink-0 snap-center overflow-hidden rounded-lg border-2 bg-white p-1 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 sm:w-32 ${
                index === activeIndex
                  ? 'border-blue-500 shadow-sm dark:border-blue-400'
                  : 'border-gray-200 hover:bg-gray-50 hover:shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800'
              }`}
            >
              <img
                src={itemSrc}
                alt=""
                className="aspect-video w-full rounded object-cover"
                loading="lazy"
                decoding="async"
              />
              <span className="mt-1 block truncate px-0.5 text-xs font-medium text-gray-700 dark:text-gray-200">
                {itemTitle}
              </span>
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshot`}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close screenshot"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>

          <div className="absolute left-4 top-4 z-20 rounded-lg bg-black/55 px-3 py-2 text-sm font-medium text-white">
            {title} <span className="ml-1 text-white/65">{activeIndex + 1} / {count}</span>
          </div>

          <img
            src={src}
            alt={imageAlt}
            className="max-h-[92vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={event => event.stopPropagation()}
          />

          {count > 1 && (
            <>
              <button
                type="button"
                onClick={event => { event.stopPropagation(); previous() }}
                className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Previous screenshot"
              >
                <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={event => { event.stopPropagation(); next() }}
                className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Next screenshot"
              >
                <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
