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

    // The B&W-to-color scroll treatment is retired — photographs show in
    // their original color from the start. The hook remains so container
    // refs and [data-colorize] markers stay valid if the effect returns.
    const targets = el.querySelectorAll('[data-colorize]');
    targets.forEach((target) => {
      (target as HTMLElement).style.filter = '';
    });
  }, []);

  return ref;
}
