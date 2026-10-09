'use client'

import { useEffect, useRef, useState } from 'react'
import { aiShots } from './ai-gallery-shots'

const BASE = 'ai-thumb h-20 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300'
const ON = BASE + ' z-[1] scale-105 border-emerald-500 opacity-100 shadow-lg shadow-emerald-500/30 ring-2 ring-emerald-500/25'
const OFF = BASE + ' scale-95 border-slate-300 opacity-60 grayscale hover:scale-100 hover:border-slate-400 hover:opacity-100 hover:grayscale-0 dark:border-white/10 dark:hover:border-white/30'

const ARROW_BTN = 'absolute top-1/2 -translate-y-1/2 rounded-full border border-slate-300 bg-white/90 p-2.5 text-slate-700 opacity-0 shadow-lg backdrop-blur-sm transition hover:bg-white group-hover:opacity-100 focus:opacity-100 dark:border-white/15 dark:bg-slate-900/80 dark:text-white dark:hover:bg-slate-800'

export function AiGallery() {
    const [index, setIndex] = useState(0)
    // any manual navigation takes over from the auto-advance for good
    const [paused, setPaused] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [reduced, setReduced] = useState(false)
    const [visible, setVisible] = useState(false)
    const rootRef = useRef<HTMLDivElement>(null)
    const stripRef = useRef<HTMLDivElement>(null)
    const thumbRefs = useRef<(HTMLButtonElement | null)[]>([])
    const indexRef = useRef(index)
    indexRef.current = index

    const count = aiShots.length
    const shot = aiShots[index]

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReduced(mq.matches)
        setPaused(mq.matches)
    }, [])

    useEffect(() => {
        const el = rootRef.current
        if (!el || !('IntersectionObserver' in window)) return
        const io = new IntersectionObserver(es => setVisible(es[0].isIntersecting), { threshold: 0.35 })
        io.observe(el)
        return () => io.disconnect()
    }, [])

    // auto-advance every 5s, stopped while hovered or after manual navigation
    useEffect(() => {
        if (paused || hovered || count < 2) return
        const timer = setInterval(() => setIndex(i => (i + 1) % count), 5000)
        return () => clearInterval(timer)
    }, [paused, hovered, count])

    // keep the active thumbnail centred in the strip
    useEffect(() => {
        const strip = stripRef.current
        const thumb = thumbRefs.current[index]
        if (!strip || !thumb) return
        const left = thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2
        strip.scrollTo({ left, behavior: reduced ? 'auto' : 'smooth' })
    }, [index, reduced])

    const go = (n: number) => {
        setPaused(true)
        setIndex(((n % count) + count) % count)
    }

    // arrow keys only while the gallery is on screen, so they don't hijack the rest of the page
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
            if (document.body.dataset.lightbox) return
            const root = rootRef.current
            const active = document.activeElement
            if (!visible && active !== root && !(root?.contains(active) ?? false)) return
            const t = e.target as HTMLElement | null
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
            e.preventDefault()
            go(indexRef.current + (e.key === 'ArrowRight' ? 1 : -1))
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [visible, count])

    return (
        <div
            ref={rootRef}
            id="ai-gallery"
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="AI Chat screenshots"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="group relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 opacity-25 blur-2xl dark:opacity-20" />

                <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-950">
                    <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-400" />
                            <div className="h-3 w-3 rounded-full bg-amber-400" />
                            <div className="h-3 w-3 rounded-full bg-green-400" />
                        </div>
                        <div id="ai-gallery-url" className="mx-auto w-full max-w-[280px] truncate rounded-md border border-slate-300 bg-white px-3 py-1 text-center font-mono text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                            {shot.url}
                        </div>
                    </div>

                    <div className="relative aspect-[16/9] bg-slate-100 dark:bg-slate-950">
                        {aiShots.map((s, n) => (
                            <img
                                key={s.src}
                                className={`ai-shot absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${n === index ? 'opacity-100' : 'opacity-0'}`}
                                src={s.src}
                                alt={s.alt}
                                loading={n === 0 ? undefined : 'lazy'}
                            />
                        ))}
                    </div>
                </div>

                <button type="button" onClick={() => go(index - 1)} aria-label="Previous" className={`${ARROW_BTN} left-2 group-hover:opacity-100`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button type="button" onClick={() => go(index + 1)} aria-label="Next" className={`${ARROW_BTN} right-2 group-hover:opacity-100`}>
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>

            <p id="ai-gallery-caption" className="mt-6 text-center text-lg text-slate-600 dark:text-slate-300">
                {shot.caption}
            </p>

            <div className="relative mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-inner shadow-slate-900/10 dark:border-white/10 dark:bg-slate-950/70 dark:shadow-black/50">
                <div className="pointer-events-none absolute inset-y-px left-px z-10 w-12 rounded-l-2xl bg-gradient-to-r from-slate-100 via-slate-100/80 to-transparent sm:w-20 dark:from-slate-950 dark:via-slate-950/80" />
                <div className="pointer-events-none absolute inset-y-px right-px z-10 w-12 rounded-r-2xl bg-gradient-to-l from-slate-100 via-slate-100/80 to-transparent sm:w-20 dark:from-slate-950 dark:via-slate-950/80" />
                <div
                    ref={stripRef}
                    id="ai-gallery-strip"
                    className="flex items-center gap-3 overflow-x-auto py-5 [&::-webkit-scrollbar]:hidden"
                    style={{ paddingLeft: 'calc(50% - 3.5rem)', paddingRight: 'calc(50% - 3.5rem)', scrollbarWidth: 'none' }}
                >
                    {aiShots.map((s, n) => (
                        <button
                            key={s.src}
                            type="button"
                            ref={el => { thumbRefs.current[n] = el }}
                            onClick={() => go(n)}
                            aria-label={s.alt}
                            className={n === index ? ON : OFF}
                        >
                            <img className="h-full w-full object-cover object-top" src={s.src} alt="" loading="lazy" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
