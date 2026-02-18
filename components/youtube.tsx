'use client';

import { useState } from 'react';

interface YouTubeProps {
  id: string;
  title?: string;
  splash?: string;
  width?: number;
  height?: number;
}

/**
 * A YouTube embed component for documentation.
 * When a splash image URL is provided, shows the image with a play button overlay.
 * Clicking loads the YouTube player with autoplay.
 */
export function YouTube({ id, title = 'YouTube Video', splash, width, height }: YouTubeProps) {
  const [playing, setPlaying] = useState(false);

  const w = width ? Number(width) : undefined;
  const h = height ? Number(height) : undefined;
  const hasSize = w || h;
  const containerClass = hasSize
    ? "relative my-4 overflow-hidden rounded-lg"
    : "relative my-4 aspect-video w-full overflow-hidden rounded-lg";
  const containerStyle = hasSize ? { width: w, height: h } : undefined;

  if (splash && !playing) {
    return (
      <div className={containerClass} style={containerStyle}>
        <button
          type="button"
          className="group relative block h-full w-full cursor-pointer border-0 bg-transparent p-0"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
        >
          <img
            src={splash}
            alt={title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 transition-colors group-hover:bg-black/15">
            <svg
              className="h-16 w-16 text-white drop-shadow-lg transition-transform group-hover:scale-110"
              viewBox="0 0 68 48"
              fill="none"
            >
              <path
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74 0.06 13.05 0 24 0 24s0.06 10.95 1.48 16.26c0.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
                fill="#FF0000"
              />
              <path d="M45 24L27 14v20" fill="white" />
            </svg>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={containerClass} style={containerStyle}>
      <iframe
        className={hasSize ? "h-full w-full" : "absolute inset-0 h-full w-full"}
        src={`https://www.youtube.com/embed/${id}${splash ? '?autoplay=1' : ''}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
