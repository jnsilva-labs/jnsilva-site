'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  start?: number;
  className?: string;
}

/**
 * Lightweight YouTube facade — shows a thumbnail until clicked,
 * then loads the real iframe. Saves ~900 KiB of third-party JS on initial load.
 */
export default function YouTubeFacade({ videoId, title, start, className = '' }: YouTubeFacadeProps) {
  const [active, setActive] = useState(false);

  const activate = useCallback(() => setActive(true), []);

  const params = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    color: 'white',
  });
  if (start) params.set('start', String(start));

  if (active) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?${params.toString()}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`absolute inset-0 w-full h-full ${className}`}
        style={{ border: 'none' }}
      />
    );
  }

  return (
    <button
      onClick={activate}
      className={`absolute inset-0 w-full h-full cursor-pointer group bg-black ${className}`}
      aria-label={`Play ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
        alt={title}
        fill
        sizes="100vw"
        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
        unoptimized
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300 border border-white/20">
          <svg viewBox="0 0 24 24" className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
