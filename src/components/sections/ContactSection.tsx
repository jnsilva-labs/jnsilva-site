'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { socialLinks } from '@/data/social';

export default function ContactSection() {
  const contactRef = useScrollReveal<HTMLDivElement>({ stagger: 0.1 });

  return (
    <section className="relative z-20 bg-background py-32 lg:py-48 section-fade">
      <div ref={contactRef} className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <h2 data-reveal="split" className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl text-foreground font-light mb-10 leading-tight tracking-tight">
          Let&apos;s Create Together
        </h2>

        <div data-reveal className="mb-12">
          <a
            href="mailto:jns@jnsilva.com"
            className="text-gold text-lg md:text-xl font-[family-name:var(--font-mono)] hover:text-foreground transition-colors duration-300"
          >
            jns@jnsilva.com
          </a>
        </div>

        {/* Social links — inline */}
        <div data-reveal className="flex flex-wrap items-center justify-center gap-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/30 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-gold transition-colors duration-300"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
