'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const isAnimating = useRef(false);

  // Store the element that opened the lightbox so we can return focus on close
  useEffect(() => {
    triggerRef.current = document.activeElement;
  }, []);

  const goNext = useCallback(() => {
    if (isAnimating.current) return;
    const container = imageContainerRef.current;
    if (!container) {
      onNavigate((currentIndex + 1) % images.length);
      return;
    }
    isAnimating.current = true;
    gsap.killTweensOf(container);
    // Subtle exit left, then enter from right
    gsap.to(container, {
      x: -30,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        onNavigate((currentIndex + 1) % images.length);
        gsap.fromTo(container,
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out',
            onComplete: () => { isAnimating.current = false; }
          }
        );
      },
    });
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    if (isAnimating.current) return;
    const container = imageContainerRef.current;
    if (!container) {
      onNavigate((currentIndex - 1 + images.length) % images.length);
      return;
    }
    isAnimating.current = true;
    gsap.killTweensOf(container);
    // Subtle exit right, then enter from left
    gsap.to(container, {
      x: 30,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        onNavigate((currentIndex - 1 + images.length) % images.length);
        gsap.fromTo(container,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out',
            onComplete: () => { isAnimating.current = false; }
          }
        );
      },
    });
  }, [currentIndex, images.length, onNavigate]);

  // Animated close
  const handleClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    const tl = gsap.timeline({
      onComplete: () => {
        // Return focus to the element that triggered the lightbox
        if (triggerRef.current && triggerRef.current instanceof HTMLElement) {
          triggerRef.current.focus();
        }
        onClose();
      },
    });

    if (imageContainerRef.current) {
      tl.to(imageContainerRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      }, 0);
    }
    if (counterRef.current) {
      tl.to(counterRef.current, { opacity: 0, y: -10, duration: 0.2 }, 0);
    }
    if (closeRef.current) {
      tl.to(closeRef.current, { opacity: 0, y: -10, duration: 0.2 }, 0);
    }
    if (overlayRef.current) {
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.35,
        ease: 'power2.inOut',
      }, 0.1);
    }
  }, [isClosing, onClose]);

  // Entry animation
  useEffect(() => {
    const overlay = overlayRef.current;
    const container = imageContainerRef.current;
    const counter = counterRef.current;
    const close = closeRef.current;

    if (!overlay || !container) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.set(overlay, { opacity: 0 });
    gsap.set(container, { scale: 0.95, opacity: 0 });
    if (counter) gsap.set(counter, { opacity: 0, y: -10 });
    if (close) gsap.set(close, { opacity: 0, y: -10 });

    const tl = gsap.timeline();
    tl.to(overlay, { opacity: 1, duration: 0.3, ease: 'power2.out' });
    tl.to(container, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    }, 0.1);
    if (counter) tl.to(counter, { opacity: 1, y: 0, duration: 0.3 }, 0.2);
    if (close) tl.to(close, { opacity: 1, y: 0, duration: 0.3 }, 0.2);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus trap — move focus to close button and trap Tab within the dialog
  useEffect(() => {
    if (images.length === 0 || currentIndex === null) return;

    // Move focus to close button on open
    const closeBtn = closeRef.current;
    if (closeBtn) closeBtn.focus();

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
        'button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [currentIndex, images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, goNext, goPrev]);

  // Touch swipe navigation
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      touchStartRef.current = null;

      // Only trigger if horizontal swipe is dominant and exceeds threshold
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) goNext();
        else goPrev();
      }
    };

    overlay.addEventListener('touchstart', handleTouchStart, { passive: true });
    overlay.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      overlay.removeEventListener('touchstart', handleTouchStart);
      overlay.removeEventListener('touchend', handleTouchEnd);
    };
  }, [goNext, goPrev]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      className="fixed inset-0 z-[100] bg-[#0A0A0A]/95 backdrop-blur-md"
    >
      {/* Close button */}
      <button
        ref={closeRef}
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 p-3 text-[#F5F0E8]/40 hover:text-[#F5F0E8] transition-colors"
        aria-label="Close"
      >
        <X size={24} />
      </button>

      {/* Counter — styled with mono font */}
      <div
        ref={counterRef}
        className="absolute top-6 left-6 z-10 text-[#F5F0E8]/30 text-xs font-[family-name:var(--font-mono)] tracking-wider"
      >
        <span className="text-[#C8C0B4]/60">{String(currentIndex + 1).padStart(2, '0')}</span>
        <span className="mx-1.5 text-[#F5F0E8]/15">/</span>
        <span>{String(images.length).padStart(2, '0')}</span>
      </div>

      {/* Image */}
      <div
        ref={imageContainerRef}
        className="absolute inset-0 flex items-center justify-center p-12 md:p-20"
      >
        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]}
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Navigation arrows — only visible on hover */}
      <button
        onClick={goPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 text-[#F5F0E8]/20 hover:text-[#C8C0B4] transition-all duration-300 hover:left-3"
        aria-label="Previous"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 text-[#F5F0E8]/20 hover:text-[#C8C0B4] transition-all duration-300 hover:right-3"
        aria-label="Next"
      >
        <ChevronRight size={32} />
      </button>

      {/* Click overlay zones for navigation */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1/3 cursor-w-resize z-[5]"
        onClick={goPrev}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-1/3 cursor-e-resize z-[5]"
        onClick={goNext}
      />
    </div>
  );
}
