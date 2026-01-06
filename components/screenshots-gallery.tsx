'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface ScreenshotsGalleryProps {
    images: Record<string, string>;
    className?: string;
    gridClass?: string;
}

export function ScreenshotsGallery({ images, className, gridClass }: ScreenshotsGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const imageKeys = useMemo(() => Object.keys(images), [images]);

    const openLightbox = useCallback((imageUrl: string, title: string) => {
        setCurrentImage(imageUrl);
        setCurrentTitle(title);
        setCurrentIndex(imageKeys.indexOf(title));
        setLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    }, [imageKeys]);

    const closeLightbox = useCallback(() => {
        setLightboxOpen(false);
        document.body.style.overflow = '';
    }, []);

    const nextImage = useCallback(() => {
        const newIndex = (currentIndex + 1) % imageKeys.length;
        const key = imageKeys[newIndex];
        setCurrentIndex(newIndex);
        setCurrentImage(images[key]);
        setCurrentTitle(key);
    }, [currentIndex, imageKeys, images]);

    const previousImage = useCallback(() => {
        const newIndex = (currentIndex - 1 + imageKeys.length) % imageKeys.length;
        const key = imageKeys[newIndex];
        setCurrentIndex(newIndex);
        setCurrentImage(images[key]);
        setCurrentTitle(key);
    }, [currentIndex, imageKeys, images]);

    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (!lightboxOpen) return;

            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowRight':
                    if (imageKeys.length > 1) {
                        nextImage();
                    }
                    break;
                case 'ArrowLeft':
                    if (imageKeys.length > 1) {
                        previousImage();
                    }
                    break;
            }
        };

        if (lightboxOpen) {
            document.addEventListener('keydown', handleKeydown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [lightboxOpen, closeLightbox, nextImage, previousImage, imageKeys.length]);

    return (
        <div className={className ?? "not-prose my-16"}>
            {/* Gallery Grid */}
            <div className={gridClass || 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                {Object.entries(images).map(([title, imageUrl]) => (
                    <div
                        key={title}
                        onClick={() => openLightbox(imageUrl, title)}
                        className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] cursor-pointer bg-white dark:bg-gray-800"
                    >
                        {/* Image Container with aspect ratio for 2048x2158 */}
                        <div className="relative aspect-[2048/2158] overflow-hidden">
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                            {/* Image */}
                            <img
                                src={imageUrl}
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Title overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-white text-lg font-semibold capitalize">{title}</h3>
                                <p className="text-gray-200 text-sm mt-1">Click to view full size</p>
                            </div>

                            {/* Zoom icon */}
                            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/90 dark:bg-gray-900/90 rounded-full p-2 shadow-lg">
                                    <svg className="w-5 h-5 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && (
                <div
                    onClick={closeLightbox}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                >
                    {/* Close button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors p-2 hover:bg-white/10 rounded-full"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    {/* Image title */}
                    <div className="absolute top-4 left-4 z-50 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                        <h3 className="text-white text-xl font-semibold capitalize">{currentTitle}</h3>
                    </div>

                    {/* Image container */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-6xl max-h-[90vh] flex items-center justify-center"
                    >
                        <img
                            src={currentImage}
                            alt={currentTitle}
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Navigation arrows (if multiple images) */}
                    {imageKeys.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                previousImage();
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-3 hover:bg-white/10 rounded-full"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                    )}

                    {imageKeys.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-3 hover:bg-white/10 rounded-full"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    )}

                    {/* Image counter */}
                    {imageKeys.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <p className="text-white text-sm">{currentIndex + 1} / {imageKeys.length}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
