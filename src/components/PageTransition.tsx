'use client';

import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      window.scrollTo(0, 0);
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    // Enter animation: circle contracts to reveal new page
    gsap.set(overlay, { clipPath: 'circle(150% at 50% 50%)', visibility: 'visible' });

    const tl = gsap.timeline();
    tl.to(overlay, {
      clipPath: 'circle(0% at 50% 50%)',
      duration: 0.5,
      ease: 'power3.out',
    });
    tl.set(overlay, { visibility: 'hidden' });

    window.scrollTo(0, 0);

    return () => { tl.kill(); };
  }, [pathname]);

  return (
    <>
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 70,
          backgroundColor: 'var(--background)',
          pointerEvents: 'none',
          visibility: 'hidden',
        }}
      />
      <div>{children}</div>
    </>
  );
}
