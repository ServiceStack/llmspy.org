'use client'

import { FC, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export interface ScreenshotScreen {
  id: string
  title: string
  description: string
  image: string
  alt: string
}

interface ScreenshotCarouselProps {
  screens: ScreenshotScreen[]
  autoPlayInterval?: number
  className?: string
}

export const ScreenshotCarousel: FC<ScreenshotCarouselProps> = ({ 
  screens, 
  autoPlayInterval = 6000,
  className 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused || screens.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPaused, screens.length, autoPlayInterval])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % screens.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + screens.length) % screens.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentScreen = screens[currentIndex]

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header with title and description */}
      <div className="mb-6 text-center">
        <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          {currentScreen.title}
        </h3>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {currentScreen.description}
        </p>
      </div>

      {/* Screenshot Display */}
      <div className="relative bg-slate-100 dark:bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full" style={{ aspectRatio: '2560/1600' }}>
          <Image
            src={currentScreen.image}
            alt={currentScreen.alt}
            fill
            className="object-contain"
            priority={currentIndex === 0}
            sizes="(max-width: 1280px) 100vw, 2560px"
          />
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {screens.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentIndex
                  ? "bg-slate-900 dark:bg-slate-100 w-8"
                  : "bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 w-2"
              )}
              aria-label={`Go to screenshot ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          aria-label="Next screenshot"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

