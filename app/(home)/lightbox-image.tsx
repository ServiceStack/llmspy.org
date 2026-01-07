'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface LightboxImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function LightboxImage({ src, alt, width, height, className }: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <div
        className="cursor-zoom-in hover:opacity-90 transition-opacity"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
        />
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setIsOpen(false)}
        >
          <button
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="max-w-full max-h-full w-auto h-auto object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
