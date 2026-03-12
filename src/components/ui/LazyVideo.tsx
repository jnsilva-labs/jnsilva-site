'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export default function LazyVideo({ src, className, onLoadedMetadata }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // React has a known bug where `muted` prop doesn't get set on the DOM element.
  // Mobile browsers then block autoplay because they think the video isn't muted.
  // Fix: use a ref callback to force muted + play on mount.
  const videoRefCallback = useCallback((node: HTMLVideoElement | null) => {
    if (node) {
      node.muted = true;
      node.play().catch(() => {});
    }
  }, []);

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

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        <video
          ref={videoRefCallback}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-contain"
          onLoadedMetadata={onLoadedMetadata}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0D0D0D]" />
      )}
    </div>
  );
}
