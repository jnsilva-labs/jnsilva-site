'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: ReactNode;
  mode?: 'words' | 'chars';
  as?: React.ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  triggerStart?: string;
  once?: boolean;
  /** If true, animation plays immediately (no scroll trigger) */
  immediate?: boolean;
}

export default function TextReveal({
  children,
  mode = 'words',
  as: Tag = 'div',
  className = '',
  delay = 0,
  stagger,
  duration,
  triggerStart = 'top 85%',
  once = true,
  immediate = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '1';
      return;
    }

    const text = el.textContent || '';
    const units = mode === 'chars'
      ? text.split('')
      : text.split(/\s+/).filter(Boolean);

    el.innerHTML = '';
    el.style.opacity = '1';

    const innerSpans: HTMLSpanElement[] = [];

    units.forEach((unit, i) => {
      const outer = document.createElement('span');
      outer.style.display = 'inline-block';
      outer.style.overflow = 'hidden';
      outer.style.verticalAlign = 'top';

      const inner = document.createElement('span');
      inner.style.display = 'inline-block';
      inner.textContent = unit;
      inner.className = `${mode === 'chars' ? 'char-inner' : 'word-inner'}`;

      outer.appendChild(inner);
      el.appendChild(outer);

      // Space between words (not after last)
      if (mode === 'words' && i < units.length - 1) {
        el.appendChild(document.createTextNode(' '));
      }

      innerSpans.push(inner);
    });

    const defaultStagger = mode === 'chars' ? 0.02 : 0.04;
    const defaultDuration = mode === 'chars' ? 0.6 : 0.9;

    gsap.set(innerSpans, { yPercent: 110, opacity: 0 });

    const animateIn = () => {
      hasAnimated.current = true;
      gsap.to(innerSpans, {
        yPercent: 0,
        opacity: 1,
        duration: duration ?? defaultDuration,
        stagger: stagger ?? defaultStagger,
        delay,
        ease: 'power3.out',
      });
    };

    if (immediate) {
      animateIn();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: triggerStart,
      once,
      onEnter: animateIn,
    });

    return () => {
      trigger.kill();
    };
  }, [mode, delay, stagger, duration, triggerStart, once, immediate]);

  // Use a simple div/span/h2 etc based on `as` prop
  // Direct element rendering avoids complex generic typing issues
  if (Tag === 'h1') return <h1 ref={containerRef as React.Ref<HTMLHeadingElement>} className={className} style={{ opacity: 0 }}>{children}</h1>;
  if (Tag === 'h2') return <h2 ref={containerRef as React.Ref<HTMLHeadingElement>} className={className} style={{ opacity: 0 }}>{children}</h2>;
  if (Tag === 'h3') return <h3 ref={containerRef as React.Ref<HTMLHeadingElement>} className={className} style={{ opacity: 0 }}>{children}</h3>;
  if (Tag === 'p') return <p ref={containerRef as React.Ref<HTMLParagraphElement>} className={className} style={{ opacity: 0 }}>{children}</p>;
  if (Tag === 'span') return <span ref={containerRef as React.Ref<HTMLSpanElement>} className={className} style={{ opacity: 0 }}>{children}</span>;

  return (
    <div ref={containerRef as React.Ref<HTMLDivElement>} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
