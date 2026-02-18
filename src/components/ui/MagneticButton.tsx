'use client';

import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number; // 0-1, how strongly the button follows the cursor
  as?: 'button' | 'a' | 'div' | 'span';
  onClick?: () => void;
  href?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  as = 'button',
  onClick,
  href,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Only on fine pointer devices (not touch)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  // Wrap the inner element in a div that handles the magnetic effect
  // This avoids complex generic typing while maintaining the effect
  if (as === 'a') {
    return (
      <div ref={buttonRef} className="inline-block">
        <a href={href} className={className} onClick={onClick}>
          {children}
        </a>
      </div>
    );
  }

  return (
    <div ref={buttonRef} className="inline-block">
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
