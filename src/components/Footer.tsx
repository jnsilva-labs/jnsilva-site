'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#C8C0B4]/10 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-[#F5F0E8] font-[family-name:var(--font-display)] text-3xl tracking-wide"
            >
              J.N. Silva
            </Link>
            <p className="mt-4 text-[#888] text-sm leading-relaxed max-w-xs">
              Artist &amp; Creative Technologist.
              <br />
              Photographer. Filmmaker. Creative Director.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#C8C0B4] text-xs uppercase tracking-[0.2em] mb-6">
              Navigate
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Work', href: '/work' },
                { label: 'Photography', href: '/photography' },
                { label: 'Film', href: '/film' },
                { label: 'Fractals', href: '/fractals' },
                { label: 'Digital Art', href: '/digital-art' },
                { label: 'Clients', href: '/clients' },
                { label: 'Buscando America', href: '/buscando-america' },
                { label: 'About', href: '/about' },
                { label: 'Press', href: '/press' },
                { label: 'Contact', href: '/contact' },
                { label: 'Awareness Paradox', href: '/awareness-paradox' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#F5F0E8]/50 hover:text-[#F5F0E8] text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[#C8C0B4] text-xs uppercase tracking-[0.2em] mb-6">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:jns@jnsilva.com"
                className="text-[#F5F0E8]/50 hover:text-[#F5F0E8] text-sm transition-colors"
              >
                jns@jnsilva.com
              </a>
              <a
                href="https://instagram.com/jnsilva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F0E8]/50 hover:text-[#F5F0E8] text-sm transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://x.com/JNSilva_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F0E8]/50 hover:text-[#F5F0E8] text-sm transition-colors"
              >
                X (Twitter)
              </a>
              <a
                href="https://tiktok.com/@jnsilva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F0E8]/50 hover:text-[#F5F0E8] text-sm transition-colors"
              >
                TikTok
              </a>
              <a
                href="https://substack.com/@josensilva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F0E8]/50 hover:text-[#F5F0E8] text-sm transition-colors"
              >
                Substack
              </a>
              <a
                href="https://superrare.com/jnsilva"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F0E8]/50 hover:text-[#F5F0E8] text-sm transition-colors"
              >
                SuperRare
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#C8C0B4]/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#888] text-xs tracking-wider">
            &copy; {new Date().getFullYear()} JN Silva Media, Inc. All rights reserved.
          </p>
          <p className="text-[#888] text-xs font-[family-name:var(--font-mono)]">
            Built with intention
          </p>
        </div>
      </div>
    </footer>
  );
}
