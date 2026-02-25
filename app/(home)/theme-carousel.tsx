'use client'

import { FC, useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export interface ThemePreview {
  chromeBorder: string
  bgBody: string
  bgSidebar: string
  icon: string
  heading: string
}

export interface ThemeInfo {
  name: string
  label: string
  image: string
  preview: ThemePreview
}

const PaletteIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={className}>
    <path fill="currentColor" d="M17.5 12a1.5 1.5 0 0 1-1.5-1.5A1.5 1.5 0 0 1 17.5 9a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5m-3-4A1.5 1.5 0 0 1 13 6.5A1.5 1.5 0 0 1 14.5 5A1.5 1.5 0 0 1 16 6.5A1.5 1.5 0 0 1 14.5 8m-5 0A1.5 1.5 0 0 1 8 6.5A1.5 1.5 0 0 1 9.5 5A1.5 1.5 0 0 1 11 6.5A1.5 1.5 0 0 1 9.5 8m-3 4A1.5 1.5 0 0 1 5 10.5A1.5 1.5 0 0 1 6.5 9A1.5 1.5 0 0 1 8 10.5A1.5 1.5 0 0 1 6.5 12M12 3a9 9 0 0 0-9 9a9 9 0 0 0 9 9a1.5 1.5 0 0 0 1.5-1.5c0-.39-.15-.74-.39-1c-.23-.27-.38-.62-.38-1a1.5 1.5 0 0 1 1.5-1.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8" />
  </svg>
)

const lightThemes = [
  { name: "light_slate", label: "Light Slate", image: "/img/themes/light_slate.webp", preview: {
        "chromeBorder": "border-gray-200",
        "bgBody": "bg-white",
        "bgSidebar": "bg-gray-50",
        "icon": "text-gray-500",
        "heading": "text-gray-900"
    } },
  { name: "soft_pink", label: "Soft Pink", image: "/img/themes/soft_pink.webp", preview: {
        "chromeBorder": "border-pink-200",
        "bgBody": "bg-pink-50",
        "bgSidebar": "bg-pink-100",
        "icon": "text-pink-500",
        "heading": "text-pink-900"
    } },
  { name: "light_sky", label: "Light Sky", image: "/img/themes/light_sky.webp", preview: {
        "chromeBorder": "border-sky-200",
        "bgBody": "bg-sky-50",
        "bgSidebar": "bg-sky-100",
        "icon": "text-sky-500",
        "heading": "text-sky-900"
    } },
  { name: "light", label: "Light", image: "/img/themes/light.webp", preview: {
        "chromeBorder": "border-gray-200",
        "bgBody": "bg-white",
        "bgSidebar": "bg-gray-50",
        "icon": "text-gray-500",
        "heading": "text-gray-900"
    } },
]

const darkThemes = [
  { name: "nord", label: "Nord", image: "/img/themes/nord.webp", preview: {
        "chromeBorder": "border-frost-700/50",
        "bgBody": "bg-nord-900",
        "bgSidebar": "bg-nord-800",
        "icon": "text-nord-300",
        "heading": "text-nord-200"
    } },
  { name: "matrix", label: "Matrix", image: "/img/themes/matrix.webp", preview: {
        "chromeBorder": "border-green-500/50",
        "bgBody": "bg-black",
        "bgSidebar": "bg-green-950/80",
        "icon": "text-green-500",
        "heading": "text-green-400 font-mono"
    } },
  { name: "blue_smoke", label: "Blue Smoke", image: "/img/themes/blue_smoke.webp", preview: {
        "chromeBorder": "border-blue-500/60",
        "bgBody": "bg-gray-950",
        "bgSidebar": "bg-gray-950",
        "icon": "text-blue-400",
        "heading": "text-blue-100"
    } },
  { name: "dark", label: "Dark", image: "/img/themes/dark.webp", preview: {
        "chromeBorder": "border-gray-700",
        "bgBody": "bg-gray-900",
        "bgSidebar": "bg-gray-800/50",
        "icon": "text-gray-400",
        "heading": "text-indigo-200"
    } },
]

const themes: ThemeInfo[] = [
  ...darkThemes,
  ...lightThemes,
]

interface ThemeCarouselProps {
  autoPlayInterval?: number
  compact?: boolean
  className?: string
}

export const ThemeCarousel: FC<ThemeCarouselProps> = ({
  autoPlayInterval = 10000,
  compact,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    if (isPaused || themes.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % themes.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPaused, autoPlayInterval, currentIndex])

  const current = themes[currentIndex]

  return (
    <div
      className={cn("not-prose relative w-full", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main image */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700">
        <div className="relative w-full aspect-[2240/2228]">
          {themes.map((theme, index) => (
            <Image
              key={theme.name}
              src={theme.image}
              alt={`${theme.label} theme`}
              fill
              className={cn(
                "object-cover transition-opacity duration-500",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1024px"
            />
          ))}
        </div>
        {/* Theme name badge */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
          {current.label}
        </div>
      </div>

      {/* Theme selectors */}
      <div className={cn("mt-6 flex flex-col gap-3", !compact && "items-center")}>
        {[darkThemes, lightThemes].map((group, groupIndex) => (
          <div key={groupIndex} className={cn("flex gap-2", !compact && "justify-center")}>
            {group.map((theme) => {
              const index = themes.indexOf(theme)
              const p = theme.preview
              return (
                <button type="button"
                  key={theme.name}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "rounded-lg border overflow-hidden transition-all duration-300 flex items-stretch",
                      compact ? "w-40" : "w-44",
                    p.bgBody, p.chromeBorder,
                    index === currentIndex
                      ? "shadow-lg scale-105"
                      : "hover:scale-[1.02]"
                  )}
                  aria-label={`Select ${theme.label} theme`}
                >
                  <div className={cn("flex items-center justify-center px-2.5", p.bgSidebar)}>
                    <PaletteIcon className={cn("size-5", p.icon)} />
                  </div>
                  <span className={cn("text-sm font-medium truncate flex-1 px-3 py-2", compact && "text-left", p.heading)}>
                    {theme.label}
                  </span>
                  {!compact && (
                    <div className={cn("flex items-center pr-2.5", p.icon)}>
                      <svg className={cn(
                        "size-2 flex-shrink-0 transition-all duration-300",
                        index === currentIndex ? "scale-100" : "scale-0"
                      )} viewBox="0 0 8 8">
                        <circle cx="4" cy="4" r="4" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
