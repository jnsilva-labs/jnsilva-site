'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitTextToWords } from '@/utils/splitText';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  mode?: 'default' | 'splitText' | 'clipPath';
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const { y = 40, duration = 0.8, delay = 0, stagger = 0.1, mode = 'default' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion — make everything visible instantly
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Ensure all data-reveal elements are visible without animation
      el.querySelectorAll('[data-reveal]').forEach((target) => {
        (target as HTMLElement).style.opacity = '1';
        (target as HTMLElement).style.transform = 'none';
      });
      return;
    }

    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    // On mobile, trigger slightly later — elements may already be visible on shorter viewports
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const triggerStart = isMobile ? 'top 95%' : 'top 85%';

    // ── Split-text word reveals ──
    const splitTargets = el.querySelectorAll('[data-reveal="split"]');
    splitTargets.forEach((target) => {
      const innerSpans = splitTextToWords(target as HTMLElement);
      gsap.set(innerSpans, { yPercent: 110 });

      const trigger = ScrollTrigger.create({
        trigger: target,
        start: triggerStart,
        once: true,
        onEnter: () => {
          gsap.to(innerSpans, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(trigger);
    });

    // ── Clip-path image reveals ──
    const clipTargets = el.querySelectorAll('[data-reveal="clip"]');
    clipTargets.forEach((target) => {
      gsap.set(target, { clipPath: 'inset(100% 0 0 0)', scale: 1.05 });

      const trigger = ScrollTrigger.create({
        trigger: target,
        start: triggerStart,
        once: true,
        onEnter: () => {
          gsap.to(target, {
            clipPath: 'inset(0% 0 0 0)',
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(trigger);
    });

    // ── Default fade-up reveals ──
    // Single selector catches both data-reveal and data-reveal="" (everything that isn't split or clip)
    const allDefault = Array.from(
      el.querySelectorAll('[data-reveal]:not([data-reveal="split"]):not([data-reveal="clip"])')
    );

    if (allDefault.length > 0) {
      gsap.set(allDefault, { opacity: 0, y });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: triggerStart,
        once: true,
        onEnter: () => {
          gsap.to(allDefault, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: 'power2.out',
          });
        },
      });
      triggers.push(trigger);
    } else if (splitTargets.length === 0 && clipTargets.length === 0) {
      // No data-reveal children at all — animate the element itself
      gsap.set(el, { opacity: 0, y });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: triggerStart,
        once: true,
        onEnter: () => {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            stagger,
            ease: 'power2.out',
          });
        },
      });
      triggers.push(trigger);
    }

    // Refresh ScrollTrigger positions after split-text DOM changes settle
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => t.kill());
    };
  }, [y, duration, delay, stagger, mode]);

  return ref;
}
