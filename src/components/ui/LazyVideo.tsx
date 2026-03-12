'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export default function LazyVideo({ src, className, onLoadedMetadata }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 1500px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — silent fail is fine for decorative video
      });
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-contain"
          onLoadedMetadata={onLoadedMetadata}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0D0D0D]" />
      )}
    </div>
  );
}
