'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Work', href: '/work' },
  { label: 'Photography', href: '/photography' },
  { label: 'Film', href: '/film' },
  { label: 'Fractals', href: '/fractals' },
  { label: 'Digital Art', href: '/digital-art' },
  { label: 'Clients', href: '/clients' },
  { label: 'Awareness Paradox', href: '/awareness-paradox' },
  { label: 'About', href: '/about' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#C8C0B4]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-[#F5F0E8] font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-wide hover:text-[#C8C0B4] transition-colors duration-300"
            >
              J.N. Silva
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-sm tracking-widest uppercase transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-[#C8C0B4]'
                      : 'text-[#F5F0E8]/70 hover:text-[#F5F0E8]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-[#F5F0E8] hover:text-[#C8C0B4] transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        role="navigation"
        aria-label="Main menu"
        className={`fixed inset-0 z-[60] bg-[#0A0A0A] transition-all duration-500 lg:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Close button inside overlay — always above overlay content */}
        <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12">
          <div className="flex items-center justify-end h-20">
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#F5F0E8] hover:text-[#C8C0B4] transition-colors p-3 -mr-3"
              aria-label="Close menu"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Decorative sacred geometry background for mobile menu */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg viewBox="0 0 400 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="120" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
            <circle cx="200" cy="80" r="120" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
            <circle cx="200" cy="320" r="120" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
            <circle cx="96" cy="140" r="120" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
            <circle cx="304" cy="140" r="120" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
            <circle cx="96" cy="260" r="120" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
            <circle cx="304" cy="260" r="120" fill="none" stroke="#C8C0B4" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center min-h-full pt-24 pb-12 px-6 gap-5 overflow-y-auto">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`relative z-10 text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-display)] tracking-wider transition-all duration-300 py-2 px-6 ${
                pathname === item.href
                  ? 'text-[#C8C0B4]'
                  : 'text-[#F5F0E8]/60 hover:text-[#F5F0E8] active:text-[#F5F0E8]'
              }`}
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              {item.label}
            </Link>
          ))}

          {/* Social links in mobile menu */}
          <div className="relative z-10 flex gap-6 mt-4 pt-6 border-t border-[#C8C0B4]/20">
            <a
              href="https://instagram.com/jnsilva"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F0E8]/40 hover:text-[#C8C0B4] text-sm uppercase tracking-widest transition-colors py-2 px-3"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              Instagram
            </a>
            <a
              href="https://x.com/JNSilva_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F5F0E8]/40 hover:text-[#C8C0B4] text-sm uppercase tracking-widest transition-colors py-2 px-3"
              style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            >
              X
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
