'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = 'up' | 'down' | 'left' | 'right';

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  duration?: number;
  delay?: number;
  scale?: number;
  triggerStart?: string;
  once?: boolean;
}

// Partial initial clip — shows a sliver of the image so frames
// are never fully invisible (prevents dark gaps in scroll)
const clipPaths: Record<RevealDirection, { from: string; to: string }> = {
  up: { from: 'inset(80% 0 0 0)', to: 'inset(0% 0 0 0)' },
  down: { from: 'inset(0 0 80% 0)', to: 'inset(0 0 0% 0)' },
  left: { from: 'inset(0 80% 0 0)', to: 'inset(0 0% 0 0)' },
  right: { from: 'inset(0 0 0 80%)', to: 'inset(0 0 0 0%)' },
};

export default function ImageReveal({
  children,
  className = '',
  direction = 'up',
  duration = 1.2,
  delay = 0,
  scale = 1.15,
  triggerStart = 'top 85%',
  once = true,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(el, { clipPath: 'none', scale: 1 });
      return;
    }

    const { from, to } = clipPaths[direction];

    gsap.set(el, { clipPath: from, scale });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: triggerStart,
      once,
      onEnter: () => {
        gsap.to(el, {
          clipPath: to,
          scale: 1,
          duration,
          delay,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [direction, duration, delay, scale, triggerStart, once]);

  return (
    <div ref={containerRef} className={className} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  );
}
