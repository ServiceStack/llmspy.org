'use client'

import { FC, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Terminal, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ConsoleScreen {
  id: string
  title: string
  description: string
  command: string
  output: string
}

interface ConsoleCarouselProps {
  screens: ConsoleScreen[]
  autoPlayInterval?: number
  className?: string
}

export const ConsoleCarousel: FC<ConsoleCarouselProps> = ({ 
  screens, 
  autoPlayInterval = 10_000,
  className 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copied, setCopied] = useState(false)
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

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(screens[currentIndex].command)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const currentScreen = screens[currentIndex]

  return (
    <div
      className={cn("relative w-full w-[780px]", className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header with title and description */}
      <div className="mb-4 text-center min-h-[60px] flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
          {currentScreen.title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {currentScreen.description}
        </p>
      </div>

      {/* Terminal Window */}
      <div className="relative w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <Terminal className="w-4 h-4 text-slate-400 ml-2" />
            <span className="text-xs text-slate-400 font-mono">terminal</span>
          </div>
          <button
            onClick={copyCommand}
            className={cn(
              "flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium transition-all",
              copied
                ? "bg-green-600 text-white"
                : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            )}
            aria-label={copied ? "Copied!" : "Copy command"}
          >
            {copied ? (
              <>
                <Check className="w-3 h-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm h-[450px] overflow-auto text-left">
          {/* Command Line */}
          <div className="mb-3">
            <span className="text-green-400 select-none">$ </span>
            <span className="text-slate-100">{currentScreen.command}</span>
          </div>

          {/* Output */}
          <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
            {currentScreen.output}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={goToPrevious}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          aria-label="Previous screen"
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
              aria-label={`Go to screen ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          className="p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          aria-label="Next screen"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

