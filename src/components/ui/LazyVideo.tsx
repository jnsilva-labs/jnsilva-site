'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  poster?: string;
  className?: string;
  onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export default function LazyVideo({ src, poster, className, onLoadedMetadata }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);

  // IntersectionObserver sets the src when the container nears viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 1500px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  // When src is set, force muted (React bug workaround) and play
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !activeSrc) return;

    video.muted = true;
    video.load();
    video.play().catch(() => {});
  }, [activeSrc]);

  return (
    <div ref={containerRef} className={className}>
      {/* Video element is always in the DOM — src toggles on/off for lazy loading.
          This avoids conditional rendering race conditions with refs on mobile. */}
      <video
        ref={videoRef}
        src={activeSrc}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload={activeSrc ? 'auto' : 'none'}
        className="absolute inset-0 w-full h-full object-contain"
        onLoadedMetadata={onLoadedMetadata}
      />
    </div>
  );
}
