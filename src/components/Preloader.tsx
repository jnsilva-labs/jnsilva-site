'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * HeroMontage — Full-viewport crossfading photo montage.
 * Desktop: 12 landscape photos, cinematic deceleration (~5s).
 * Mobile: 6 portrait photos, snappier pacing (~3s).
 * Images are shuffled each visit for variety.
 * Only plays once per browser session (sessionStorage flag).
 */

const desktopImages = [
  '/images/hero/DSC05043.JPG',              // Laser concert
  '/images/hero/DSC08845.JPG',              // Sintra well
  '/images/hero/DSCFJAPAN249.JPG',          // Japan street
  '/images/hero/Qatar2025_147.JPG',         // Qatar architecture
  '/images/hero/DSC00180.JPG',              // Milky Way
  '/images/music/041019_-_Coachella-1.jpg', // Coachella
  '/images/places/Kenya_Zebras.jpg',        // Kenya zebras
  '/images/places/Guatemala_Rays.jpg',      // Guatemala rays
  '/images/fractals/kinesthesia.jpg',       // Kinesthesia
  '/images/music/Broey_2.jpg',              // Concert
  '/images/places/Glacier_National_Park.jpg', // Glacier
  '/images/people/Film_Noir_4.jpg',         // Film noir
];

const mobileImages = [
  '/images/hero/DSC00754.JPG',              // Portrait — high contrast
  '/images/hero/greecebw-04771.JPG',        // Greece B&W architecture
  '/images/music/Kendrick_3.jpg',           // Concert performance
  '/images/places/Solar_Eclipse.jpg',       // Solar eclipse
  '/images/people/Fashion_Week.jpg',        // Fashion portrait
  '/images/hero/DSC05341.JPG',              // Portrait variety
];

/** Fisher-Yates shuffle — randomizes montage order each visit */
function shuffleArray<T>(arr: readonly T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Cinematic deceleration curve:
 * Desktop: ~150ms → ~450ms → 800ms hold (12 frames, ~5s)
 * Mobile:  ~130ms → ~380ms → 500ms hold (6 frames, ~3s)
 */
function computeFrameTimings(count: number, mobile = false): number[] {
  const timings: number[] = [];
  const startMs = mobile ? 130 : 150;
  const rangeMs = mobile ? 250 : 300;
  const holdMs = mobile ? 500 : 800;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const eased = 1 - Math.pow(1 - t, 3); // cubic deceleration
    const duration = startMs + eased * rangeMs;
    timings.push(duration);
  }
  timings[count - 1] = holdMs;
  return timings;
}

const SESSION_KEY = 'montageShown';
const VISITED_KEY = 'jnsilva_visited';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLImageElement>(null);
  const backRef = useRef<HTMLImageElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const hasStartedExitRef = useRef(false);
  const isMobileRef = useRef(false);
  const imagesRef = useRef(desktopImages);
  const frameTimingsRef = useRef(computeFrameTimings(desktopImages.length));

  // Exit animation — cinematic dissolve with subtle zoom pull
  const handleExit = useCallback(() => {
    if (hasStartedExitRef.current) return;
    hasStartedExitRef.current = true;

    if (!containerRef.current) {
      document.body.style.overflow = '';
      setIsHidden(true);
      window.dispatchEvent(new CustomEvent('montageComplete'));
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        setIsHidden(true);
        window.dispatchEvent(new CustomEvent('montageComplete'));
      },
    });

    // Slow dissolve to black
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
    }, 0);

    // Subtle zoom pull on the visible image during dissolve
    const visibleImg =
      frontRef.current && frontRef.current.style.opacity !== '0'
        ? frontRef.current
        : backRef.current;
    if (visibleImg) {
      tl.to(visibleImg, {
        scale: 1.08,
        duration: 0.8,
        ease: 'power1.in',
      }, 0);
    }
  }, []);

  // Check session/returning visitor — skip if already shown this session or returning visitor
  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    let returningVisitor = false;
    try { returningVisitor = !!localStorage.getItem(VISITED_KEY); } catch { /* private browsing */ }

    if (alreadyShown || returningVisitor) {
      // Still mark session so downstream checks stay consistent
      try { sessionStorage.setItem(SESSION_KEY, 'true'); } catch { /* noop */ }
      setIsHidden(true);
      window.dispatchEvent(new CustomEvent('montageComplete'));
      return;
    }

    // Detect mobile, shuffle images for variety, set timings
    const mobile = window.innerWidth < 768;
    isMobileRef.current = mobile;
    imagesRef.current = shuffleArray(mobile ? mobileImages : desktopImages);
    frameTimingsRef.current = computeFrameTimings(imagesRef.current.length, mobile);

    document.body.style.overflow = 'hidden';

    // Preload only the relevant image set
    imagesRef.current.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Montage sequence with crossfade transitions
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      try { localStorage.setItem(VISITED_KEY, '1'); } catch { /* noop */ }
      handleExit();
      return;
    }

    const images = imagesRef.current;
    const timings = frameTimingsRef.current;
    let frameIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;
    let isFrontActive = true;

    // Set initial state
    if (frontRef.current && backRef.current) {
      frontRef.current.src = images[0];
      frontRef.current.style.opacity = '1';
      frontRef.current.style.zIndex = '2';
      backRef.current.style.opacity = '0';
      backRef.current.style.zIndex = '1';
    }

    function showNextFrame() {
      if (frameIndex >= images.length) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        try { localStorage.setItem(VISITED_KEY, '1'); } catch { /* noop */ }
        handleExit();
        return;
      }

      const front = frontRef.current;
      const back = backRef.current;
      if (!front || !back) return;

      const frameDuration = (timings[frameIndex] || 200) / 1000;

      if (frameIndex === 0) {
        // First frame: just show with Ken Burns
        gsap.fromTo(front, { scale: 1 }, {
          scale: 1.05,
          duration: frameDuration + 0.1,
          ease: 'none',
        });
      } else {
        // Crossfade to next frame
        const incoming = isFrontActive ? back : front;
        const outgoing = isFrontActive ? front : back;

        // Set new image on the hidden layer
        incoming.src = images[frameIndex];
        incoming.style.zIndex = '2';
        outgoing.style.zIndex = '1';

        // Crossfade duration scales with frame timing (faster early, smoother late)
        const crossDuration = Math.min(frameDuration * 0.5, 0.2);

        gsap.set(incoming, { scale: 1, opacity: 0 });
        gsap.to(incoming, {
          opacity: 1,
          duration: crossDuration,
          ease: 'power1.inOut',
        });
        gsap.to(outgoing, {
          opacity: 0,
          duration: crossDuration,
          ease: 'power1.inOut',
        });

        // Ken Burns on incoming
        gsap.fromTo(incoming, { scale: 1 }, {
          scale: 1.05,
          duration: frameDuration + 0.1,
          ease: 'none',
        });

        isFrontActive = !isFrontActive;
      }

      // Update film frame counter
      if (counterRef.current) {
        counterRef.current.textContent = String(frameIndex + 1).padStart(3, '0');
      }

      frameIndex++;
      timeoutId = setTimeout(showNextFrame, timings[frameIndex - 1]);
    }

    const startDelay = setTimeout(showNextFrame, 200);

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
        zIndex: 80,
        backgroundColor: '#0A0A0A',
      }}
    >
      {/* Two image layers for crossfade — src set dynamically by montage logic */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={backRef}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1)',
          willChange: 'transform, opacity',
          opacity: 0,
          zIndex: 1,
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={frontRef}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1)',
          willChange: 'transform, opacity',
          opacity: 1,
          zIndex: 2,
        }}
      />

      {/* Film grain overlay */}
      <div className="montage-grain" />

      {/* Cinematic vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(10,10,10,0.6) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Film frame counter */}
      <span
        ref={counterRef}
        className="font-[family-name:var(--font-mono)]"
        style={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          zIndex: 15,
          color: '#F5F0E8',
          opacity: 0.15,
          fontSize: 11,
          letterSpacing: '0.1em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        001
      </span>
    </div>
  );
}
