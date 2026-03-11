'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

/* ─── Mega-menu category type ─── */
interface MegaCategory {
  label: string;
  href: string;
  sub: string[];
  image: string;
}

interface NavItem {
  label: string;
  href: string;
  mega?: MegaCategory[];
}

/* ─── Nav structure: 5 consolidated items ─── */
const navItems: NavItem[] = [
  {
    label: 'Work',
    href: '/work',
    mega: [
      {
        label: 'Photography',
        href: '/photography/music',
        sub: ['Music', 'People', 'Places', 'NYC'],
        image: '/images/hero/DSC07671.JPG',
      },
      {
        label: 'Film',
        href: '/film',
        sub: ['Buscando America', 'NEA'],
        image: '/images/people/Film_Noir_2.jpg',
      },
      {
        label: 'Fractals',
        href: '/fractals',
        sub: ['Kinesthesia', 'Infinitum', 'Portraits'],
        image: '/images/fractals/kinesthesia.jpg',
      },
      {
        label: 'Digital Art',
        href: '/digital-art',
        sub: ['NFT Collections'],
        image: '/images/fractals/infinitum/infinitumhero.JPG',
      },
    ],
  },
  { label: 'Clients', href: '/clients' },
  { label: 'About', href: '/about' },
  { label: 'AP', href: '/awareness-paradox' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const pathname = usePathname();

  const megaPanelRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ─── Work item reference ─── */
  const workItem = navItems[0];

  /* ─── RAF-throttled scroll listener ─── */
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

  /* ─── Close mobile menu on Escape key ─── */
  useEffect(() => {
    if (!isOpen && !megaOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (megaOpen) setMegaOpen(false);
        if (isOpen) setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, megaOpen]);

  /* ─── Lock body scroll when mobile menu is open ─── */
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

  /* ─── Close mega-menu on click outside ─── */
  useEffect(() => {
    if (!megaOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        megaPanelRef.current &&
        !megaPanelRef.current.contains(target) &&
        megaTriggerRef.current &&
        !megaTriggerRef.current.contains(target)
      ) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [megaOpen]);

  /* ─── Close mega-menu on route change ─── */
  useEffect(() => {
    setMegaOpen(false);
    setMobileWorkOpen(false);
  }, [pathname]);

  /* ─── GSAP animation for mega panel ─── */
  useEffect(() => {
    if (!megaPanelRef.current) return;
    if (megaOpen) {
      gsap.fromTo(
        megaPanelRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [megaOpen]);

  /* ─── Hover handlers with debounce to prevent flicker ─── */
  const openMega = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setMegaOpen(true);
  }, []);

  const closeMegaDebounced = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setMegaOpen(false);
    }, 150);
  }, []);

  /* ─── Cleanup hover timeout ─── */
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  /* ─── Check if a path is active (exact or starts with) ─── */
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  /* ─── Check if any Work sub-item is active ─── */
  const isWorkActive =
    isActive('/work') ||
    isActive('/photography') ||
    isActive('/film') ||
    isActive('/fractals') ||
    isActive('/digital-art');

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
              {navItems.map((item) =>
                item.mega ? (
                  /* ─── Work item with mega-menu ─── */
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openMega}
                    onMouseLeave={closeMegaDebounced}
                  >
                    <button
                      ref={megaTriggerRef}
                      className={`nav-link text-sm tracking-widest uppercase transition-colors duration-300 flex items-center gap-1 ${
                        isWorkActive
                          ? 'text-[#C8C0B4]'
                          : 'text-[#F5F0E8]/70 hover:text-[#F5F0E8]'
                      }`}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onClick={() => setMegaOpen(!megaOpen)}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${megaOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                ) : (
                  /* ─── Regular nav items ─── */
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link text-sm tracking-widest uppercase transition-colors duration-300 ${
                      isActive(item.href)
                        ? 'text-[#C8C0B4]'
                        : 'text-[#F5F0E8]/70 hover:text-[#F5F0E8]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
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

        {/* ─── Mega-menu panel (desktop) ─── */}
        {megaOpen && (
          <div
            ref={megaPanelRef}
            className="absolute top-full left-0 w-full bg-[#0D0D0D]/95 backdrop-blur-md border-t border-gold/10"
            role="menu"
            aria-label="Work categories"
            onMouseEnter={openMega}
            onMouseLeave={closeMegaDebounced}
          >
            <div className="max-w-[1400px] mx-auto px-12 py-8 grid grid-cols-4 gap-8">
              {workItem.mega!.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  role="menuitem"
                  className="group"
                  onClick={() => setMegaOpen(false)}
                >
                  <div className="aspect-[3/2] relative rounded overflow-hidden mb-3">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="25vw"
                    />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-foreground">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-gold/50">{cat.sub.join(' / ')}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        aria-hidden={!isOpen}
        role="navigation"
        aria-label="Main menu"
        className={`fixed inset-0 z-55 bg-background transition-all duration-500 lg:hidden ${
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
          {navItems.map((item) =>
            item.mega ? (
              /* ─── Work item with mobile accordion ─── */
              <div key={item.href} className="flex flex-col items-center w-full">
                <button
                  onClick={() => setMobileWorkOpen(!mobileWorkOpen)}
                  className={`relative z-10 text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-display)] tracking-wider transition-all duration-300 py-2 px-6 flex items-center gap-2 ${
                    isWorkActive
                      ? 'text-[#C8C0B4]'
                      : 'text-[#F5F0E8]/60 hover:text-[#F5F0E8] active:text-[#F5F0E8]'
                  }`}
                  style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                  aria-expanded={mobileWorkOpen}
                >
                  {item.label}
                  <ChevronDown
                    size={20}
                    className={`transition-transform duration-300 ${mobileWorkOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Accordion sub-links */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileWorkOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 pb-2">
                    {item.mega!.map((cat) => (
                      <Link
                        key={cat.label}
                        href={cat.href}
                        onClick={() => {
                          setIsOpen(false);
                          setMobileWorkOpen(false);
                        }}
                        className={`relative z-10 text-base sm:text-lg font-[family-name:var(--font-display)] tracking-wider transition-all duration-300 py-1 px-6 ${
                          isActive(cat.href)
                            ? 'text-[#C8C0B4]'
                            : 'text-[#F5F0E8]/40 hover:text-[#F5F0E8] active:text-[#F5F0E8]'
                        }`}
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* ─── Regular mobile nav items ─── */
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`relative z-10 text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-display)] tracking-wider transition-all duration-300 py-2 px-6 ${
                  isActive(item.href)
                    ? 'text-[#C8C0B4]'
                    : 'text-[#F5F0E8]/60 hover:text-[#F5F0E8] active:text-[#F5F0E8]'
                }`}
                style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
              >
                {item.label}
              </Link>
            )
          )}

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
