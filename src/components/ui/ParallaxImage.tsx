'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Multiplier: 0.5 = slow, 1 = match scroll, -0.5 = reverse
  triggerStart?: string;
  triggerEnd?: string;
}

export default function ParallaxImage({
  children,
  className = '',
  speed = 0.3,
  triggerStart = 'top bottom',
  triggerEnd = 'bottom top',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    // Respect reduced motion + disable on touch (scrub causes jank)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReduced || isTouch) return;

    // Calculate the amount of travel based on speed
    // A higher speed means more movement relative to scroll
    const yTravel = speed * 100; // in px

    const tween = gsap.fromTo(
      inner,
      { y: -yTravel },
      {
        y: yTravel,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: triggerStart,
          end: triggerEnd,
          scrub: 0.6,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed, triggerStart, triggerEnd]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef} className="will-change-transform h-full">
        {children}
      </div>
    </div>
  );
}
