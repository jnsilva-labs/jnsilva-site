'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * HeroMontage — Full-viewport rapid-fire photo montage (landscape only).
 * Only plays once per browser session (sessionStorage flag).
 * Total duration: ~3 seconds max.
 */

// All landscape (width > height) images — no cropping issues at full viewport
const montageImages = [
  '/images/hero/DSC05043.JPG',              // Laser concert 1920×1280
  '/images/hero/DSC08845.JPG',              // Sintra well 1920×1280
  '/images/hero/DSCFJAPAN249.JPG',          // Japan street 1920×1280
  '/images/hero/Qatar2025_147.JPG',         // Qatar architecture 1920×1280
  '/images/hero/DSC00180.JPG',              // Milky Way 1920×1280
  '/images/music/041019_-_Coachella-1.jpg', // Coachella 1920×1280
  '/images/places/Kenya_Zebras.jpg',        // Kenya zebras 1920×1280
  '/images/places/Guatemala_Rays.jpg',      // Guatemala rays 1920×1280
  '/images/fractals/Kinesthesia.JPG',       // Kinesthesia 1920×823
  '/images/music/Broey_2.jpg',              // Concert 1920×1280
  '/images/places/Glacier_National_Park.jpg', // Glacier 1920×1279
  '/images/people/Film_Noir_4.jpg',         // Film noir 1920×1280
];

/**
 * Compute frame timings: ~80ms start, decelerate to ~250ms, last holds ~400ms.
 * Total: ~2.5s cycling + 0.5s dissolve = ~3s
 */
function computeFrameTimings(count: number): number[] {
  const timings: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const eased = 1 - Math.pow(1 - t, 2.5);
    const duration = 80 + eased * 170; // 80ms → 250ms
    timings.push(duration);
  }
  timings[count - 1] = 400; // Last frame holds
  return timings;
}

const SESSION_KEY = 'montageShown';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const hasStartedExitRef = useRef(false);
  const frameTimings = useRef(computeFrameTimings(montageImages.length));

  // Exit animation — dissolve to black, then unmount
  const handleExit = useCallback(() => {
    if (hasStartedExitRef.current) return;
    hasStartedExitRef.current = true;

    if (!containerRef.current) {
      document.body.style.overflow = '';
      setIsHidden(true);
      window.dispatchEvent(new CustomEvent('montageComplete'));
      return;
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        document.body.style.overflow = '';
        setIsHidden(true);
        window.dispatchEvent(new CustomEvent('montageComplete'));
      },
    });
  }, []);

  // Check session — skip if already shown this session
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) {
      setIsHidden(true);
      // Still dispatch so hero name reveals immediately
      window.dispatchEvent(new CustomEvent('montageComplete'));
      return;
    }

    document.body.style.overflow = 'hidden';

    // Preload images
    let loadedCount = 0;
    montageImages.forEach((src) => {
      const img = new window.Image();
      img.onload = img.onerror = () => { loadedCount++; };
      img.src = src;
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Montage sequence
  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      handleExit();
      return;
    }

    let frameIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    const timings = frameTimings.current;

    function showNextFrame() {
      if (frameIndex >= montageImages.length) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        handleExit();
        return;
      }

      setCurrentIndex(frameIndex);

      // Ken Burns zoom
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { scale: 1 },
          {
            scale: 1.05,
            duration: (timings[frameIndex] || 200) / 1000 + 0.05,
            ease: 'none',
          }
        );
      }

      frameIndex++;
      timeoutId = setTimeout(showNextFrame, timings[frameIndex - 1]);
    }

    const startDelay = setTimeout(showNextFrame, 150);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(startDelay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isHidden) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        backgroundColor: '#0A0A0A',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={montageImages[currentIndex]}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
