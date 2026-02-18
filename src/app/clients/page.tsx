'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { clients, getAllCategories } from '@/data/clients';

const allCategories = getAllCategories();

export default function ClientsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? clients
      : clients.filter((c) => c.category === activeFilter);

  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Collaborations
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
          Clients
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl leading-relaxed">
          A selection of brands and publications that have trusted JN Silva
          to bring their vision to life through photography, film, and
          creative direction.
        </p>
      </div>

      {/* Category Filters */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-wrap gap-3">
          {allCategories.map((cat) => {
            const count =
              cat === 'All'
                ? clients.length
                : clients.filter((c) => c.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-xs uppercase tracking-[0.15em] border transition-all duration-300 font-[family-name:var(--font-mono)] ${
                  activeFilter === cat
                    ? 'border-[#C8C0B4] text-[#C8C0B4] bg-[#C8C0B4]/10'
                    : 'border-[#F5F0E8]/10 text-[#F5F0E8]/40 hover:border-[#F5F0E8]/30 hover:text-[#F5F0E8]/60'
                }`}
              >
                {cat}
                <span className="ml-2 opacity-40">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Client Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {filtered.map((client) => (
            <Link
              key={client.slug}
              href={`/clients/${client.slug}`}
              className="group relative overflow-hidden block"
            >
              <div className="relative aspect-[3/2]">
                <Image
                  src={client.coverImage}
                  alt={client.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Dark overlay — darker at bottom for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-[#0A0A0A]/20 to-transparent group-hover:from-[#0A0A0A]/90 transition-all duration-500" />

                {/* Client name + category */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#F5F0E8] group-hover:text-[#C8C0B4] transition-colors duration-300">
                    {client.name}
                  </h3>
                  <p className="text-[#F5F0E8]/0 group-hover:text-[#F5F0E8]/40 text-xs uppercase tracking-[0.15em] mt-1 transition-colors duration-300 font-[family-name:var(--font-mono)]">
                    {client.category}
                  </p>
                </div>

                {/* Gold accent line */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-[#C8C0B4] w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 text-center">
        <div className="p-16 bg-[#141414] border border-[#C8C0B4]/10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] mb-6">
            Interested in working together?
          </h2>
          <p className="text-[#F5F0E8]/40 text-base mb-8 max-w-md mx-auto">
            Let&apos;s create something meaningful for your brand.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 border border-[#C8C0B4] text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4] hover:text-[#0A0A0A] transition-all duration-300"
          >
            Start a Conversation
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
