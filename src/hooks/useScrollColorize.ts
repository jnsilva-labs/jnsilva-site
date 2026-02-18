'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollColorize<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll('[data-colorize]');
    if (targets.length === 0) return;

    // Respect reduced motion — show full color immediately
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      targets.forEach((target) => {
        (target as HTMLElement).style.filter = 'grayscale(0) brightness(1)';
      });
      return;
    }

    const tweens: gsap.core.Tween[] = [];

    targets.forEach((target) => {
      const tween = gsap.fromTo(
        target,
        { filter: 'grayscale(1) brightness(0.9)' },
        {
          filter: 'grayscale(0) brightness(1)',
          scrollTrigger: {
            trigger: target,
            start: 'top 90%',
            end: 'top 40%',
            scrub: 0.6,
            onEnter: () => {
              (target as HTMLElement).style.willChange = 'filter';
            },
            onLeaveBack: () => {
              (target as HTMLElement).style.willChange = 'auto';
            },
            onLeave: () => {
              (target as HTMLElement).style.willChange = 'auto';
            },
          },
        }
      );
      tweens.push(tween);
    });

    return () => {
      tweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return ref;
}
