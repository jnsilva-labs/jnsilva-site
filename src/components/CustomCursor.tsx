'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor — GSAP-powered dot + ring cursor with smooth follow.
 * - Dot: 8px gold circle, GSAP quickTo lerp
 * - Ring: 24px circle outline, GSAP quickTo lerp (slower)
 * - Image hover: ring expands to 60px, "VIEW" text appears
 * - Link hover: ring to 40px
 * - mix-blend-mode: difference
 * - Hidden on touch devices
 * - Respects prefers-reduced-motion
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringTextRef = useRef<HTMLSpanElement>(null);
  const [isTouch, setIsTouch] = useState(true); // default hidden
  const [reducedMotion, setReducedMotion] = useState(false);

  // GSAP quickTo refs for smooth lerp
  const dotX = useRef<gsap.QuickToFunc | null>(null);
  const dotY = useRef<gsap.QuickToFunc | null>(null);
  const ringX = useRef<gsap.QuickToFunc | null>(null);
  const ringY = useRef<gsap.QuickToFunc | null>(null);

  // Check for fine pointer + reduced motion
  useEffect(() => {
    const pointerMq = window.matchMedia('(pointer: fine)');
    const motionMq = window.matchMedia('(prefers-reduced-motion: reduce)');

    setIsTouch(!pointerMq.matches);
    setReducedMotion(motionMq.matches);

    if (pointerMq.matches) {
      document.body.classList.add('custom-cursor-active');
    }

    return () => {
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  // Initialize GSAP quickTo for smooth cursor follow
  useEffect(() => {
    if (isTouch || reducedMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Dot follows faster (0.2s)
    dotX.current = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' });
    dotY.current = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' });

    // Ring follows slower (0.45s) — creates satisfying trail
    ringX.current = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power2.out' });
    ringY.current = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power2.out' });

    // Set initial positions off-screen
    gsap.set(dot, { x: -100, y: -100 });
    gsap.set(ring, { x: -100, y: -100 });
  }, [isTouch, reducedMotion]);

  // Track mouse position
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Dot offset: center the 8px dot
    dotX.current?.(e.clientX - 4);
    dotY.current?.(e.clientY - 4);

    // Ring offset: center the ring (dynamic size, offset by half of default 24px)
    ringX.current?.(e.clientX - 12);
    ringY.current?.(e.clientY - 12);
  }, []);

  // Mouse event listeners for hover states
  useEffect(() => {
    if (isTouch || reducedMotion) return;

    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const ring = ringRef.current;
      const dot = dotRef.current;
      const ringText = ringTextRef.current;
      if (!ring || !dot || !ringText) return;

      // Check if hovering over an image with data-cursor="view"
      const viewTarget = target.closest('[data-cursor="view"]');
      if (viewTarget) {
        gsap.to(ring, {
          width: 60,
          height: 60,
          borderColor: 'rgba(200, 192, 180, 0.5)',
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(ringText, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot, { opacity: 0, scale: 0.5, duration: 0.2 });
        return;
      }

      // Check if hovering over interactive elements
      const interactive = target.closest('a, button, [data-cursor="expand"], [role="button"]');
      if (interactive) {
        gsap.to(ring, {
          width: 40,
          height: 40,
          borderColor: 'rgba(200, 192, 180, 0.15)',
          duration: 0.35,
          ease: 'power2.out',
        });
        gsap.to(ringText, { opacity: 0, scale: 0.8, duration: 0.2 });
        gsap.to(dot, { opacity: 1, scale: 1.3, duration: 0.25, ease: 'back.out(2)' });
        return;
      }

      // Default state
      gsap.to(ring, {
        width: 24,
        height: 24,
        borderColor: 'rgba(200, 192, 180, 0.35)',
        duration: 0.35,
        ease: 'power2.out',
      });
      gsap.to(ringText, { opacity: 0, scale: 0.8, duration: 0.2 });
      gsap.to(dot, { opacity: 1, scale: 1, duration: 0.25 });
    };

    // Mouse down/up for click feedback
    const handleMouseDown = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;
      gsap.to(ring, { scale: 0.85, duration: 0.15, ease: 'power3.out' });
      gsap.to(dot, { scale: 0.7, duration: 0.15, ease: 'power3.out' });
    };

    const handleMouseUp = () => {
      const ring = ringRef.current;
      const dot = dotRef.current;
      if (!ring || !dot) return;
      gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
      gsap.to(dot, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isTouch, reducedMotion, handleMouseMove]);

  if (isTouch || reducedMotion) return null;

  return (
    <>
      {/* Dot — 8px gold */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#C8C0B4',
          pointerEvents: 'none',
          zIndex: 10000,
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
      {/* Ring — 24px outline */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: '1px solid rgba(200, 192, 180, 0.35)',
          pointerEvents: 'none',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      >
        <span
          ref={ringTextRef}
          style={{
            fontSize: 9,
            fontFamily: 'var(--font-mono)',
            color: '#C8C0B4',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            opacity: 0,
            transform: 'scale(0.8)',
            whiteSpace: 'nowrap',
          }}
        >
          View
        </span>
      </div>
    </>
  );
}
