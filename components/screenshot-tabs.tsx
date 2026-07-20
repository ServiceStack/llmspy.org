'use client';

import { useState, useMemo } from 'react';

interface ScreenshotTabsProps {
    images: Record<string, string>;
    className?: string;
    alt?: string;
    /** Optional link opened when the active image is clicked (e.g. the live site) */
    href?: string;
}

export function ScreenshotTabs({ images, className, alt, href }: ScreenshotTabsProps) {
    const tabs = useMemo(() => Object.keys(images), [images]);
    const [active, setActive] = useState(tabs[0]);

    const src = images[active];

    const img = (
        <img
            src={src}
            alt={alt ? `${alt} - ${active}` : active}
            className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow"
            loading="lazy"
        />
    );

    return (
        <div className={className ?? 'not-prose my-8'}>
            {/* Tab bar */}
            <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-1 border-b border-gray-200 dark:border-gray-700">
                    {tabs.map((tab) => (
                        <button type="button"
                            key={tab}
                            onClick={() => setActive(tab)}
                            className={`relative px-5 py-2.5 -mb-px text-sm font-medium tracking-wide transition-colors border-b-2 ${
                                active === tab
                                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                                    : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Active image */}
            {href ? (
                <a href={href} target="_blank" rel="noopener noreferrer" className="block">
                    {img}
                </a>
            ) : (
                img
            )}
        </div>
    );
}
