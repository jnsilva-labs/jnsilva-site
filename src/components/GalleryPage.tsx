'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useScrollColorize } from '@/hooks/useScrollColorize';
import Lightbox from '@/components/Lightbox';
import type { GalleryImage } from '@/data/galleries';

interface GalleryPageProps {
  title: string;
  subtitle?: string;
  images: GalleryImage[];
  backHref?: string;
  backLabel?: string;
}

export default function GalleryPage({
  title,
  subtitle,
  images,
  backHref = '/work',
  backLabel = 'Back to Photography',
}: GalleryPageProps) {
  const colorizeRef = useScrollColorize<HTMLDivElement>();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const handleNavigate = useCallback((index: number) => setLightboxIndex(index), []);

  return (
    <div ref={colorizeRef} className="relative z-10 bg-[#0A0A0A] pt-32 pb-24 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-6">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[#C8C0B4]/50 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors duration-300"
        >
          <ArrowLeft size={12} />
          {backLabel}
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#F5F0E8]/40 text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
        <p className="text-[#C8C0B4]/40 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] mt-4">
          {images.length} photographs
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {images.map((item, index) => (
            <div
              key={item.src}
              className="group relative overflow-hidden break-inside-avoid bg-[#141414] cursor-pointer"
              data-cursor="view"
              onClick={() => setLightboxIndex(index)}
            >
              <div className={`relative ${item.aspect === 'tall' ? 'aspect-[2/3]' : 'aspect-[3/2]'}`}>
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  data-colorize
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images.map((img) => img.src)}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
