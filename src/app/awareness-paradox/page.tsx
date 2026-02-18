'use client';

import Image from 'next/image';
import { ExternalLink, ArrowRight, Play } from 'lucide-react';

const templumOutputs = [
  '/images/templum/templum-0e651933.jpg',
  '/images/templum/templum-3e3d1fe9.jpg',
  '/images/templum/templum-28247a4f.jpg',
  '/images/templum/templum-2d79fb49.jpg',
  '/images/templum/templum-4d877c7d.jpg',
  '/images/templum/templum-31f0c55f.jpg',
  '/images/templum/templum-3abc6167.jpg',
  '/images/templum/templum-5a847b2c.jpg',
  '/images/templum/templum-1ee902d1.jpg',
  '/images/templum/templum-3ed96041.jpg',
];

const shorts = [
  { id: '_iSGVJtqrVc', title: 'You Are Not Your Thoughts' },
  { id: '_CIJFXU2oRU', title: 'Nature Does Not Hurry' },
  { id: '0gLao7dxq2s', title: 'Everyone You Meet Is a Mirror' },
  { id: 'ZStI1VTJTWc', title: 'The Quiet Work of Becoming' },
  { id: 'yn93--8UK14', title: 'Watch the Thought' },
];

const principles = [
  { number: 'I', name: 'Mentalism', description: 'The All is Mind; the Universe is Mental.' },
  { number: 'II', name: 'Correspondence', description: 'As above, so below; as below, so above.' },
  { number: 'III', name: 'Vibration', description: 'Nothing rests; everything moves; everything vibrates.' },
  { number: 'IV', name: 'Polarity', description: 'Everything is dual; everything has poles.' },
  { number: 'V', name: 'Rhythm', description: 'Everything flows, out and in; everything has its tides.' },
  { number: 'VI', name: 'Cause & Effect', description: 'Every cause has its effect; every effect has its cause.' },
  { number: 'VII', name: 'Gender', description: 'Gender is in everything; everything has its Masculine and Feminine Principles.' },
];

const topics = [
  'Sacred Geometry',
  'Hermetic Philosophy',
  'Archetypes & Symbolism',
  'Contemplative Traditions',
  'Consciousness Studies',
  'Esoteric Wisdom',
  'Meditation & Practice',
  'Ancient Mystery Schools',
];

export default function AwarenessParadoxPage() {
  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
              Philosophy &middot; Sacred Geometry &middot; Mysticism
            </p>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
              Awareness
              <br />
              <span className="text-gradient-gold">Paradox</span>
            </h1>
            <p className="text-[#F5F0E8]/50 text-lg leading-relaxed mb-8 max-w-lg">
              A living body of work exploring the intersection of Hermetic principles,
              sacred geometry, archetypes, and contemplative traditions. The convergence
              of art, technology, and the search for deeper meaning.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.awarenessparadox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-8 py-3 border border-[#C8C0B4]/40 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4]/10 hover:border-[#C8C0B4] transition-all duration-300"
              >
                Visit the Codex
                <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://www.awarenessparadox.com/principles"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F5F0E8]/40 text-sm uppercase tracking-[0.15em] hover:text-[#F5F0E8] transition-colors duration-300 flex items-center gap-2 px-4 py-3"
              >
                Sacred Geometry Codex
                <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Sacred Geometry SVG */}
          <div className="flex items-center justify-center">
            <div className="w-80 h-80 relative">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Seed of Life */}
                <circle cx="200" cy="200" r="60" fill="none" stroke="#C8C0B4" strokeWidth="0.5" opacity="0.3" />
                <circle cx="200" cy="140" r="60" fill="none" stroke="#C8C0B4" strokeWidth="0.5" opacity="0.3" />
                <circle cx="200" cy="260" r="60" fill="none" stroke="#C8C0B4" strokeWidth="0.5" opacity="0.3" />
                <circle cx="148" cy="170" r="60" fill="none" stroke="#C8C0B4" strokeWidth="0.5" opacity="0.3" />
                <circle cx="252" cy="170" r="60" fill="none" stroke="#C8C0B4" strokeWidth="0.5" opacity="0.3" />
                <circle cx="148" cy="230" r="60" fill="none" stroke="#C8C0B4" strokeWidth="0.5" opacity="0.3" />
                <circle cx="252" cy="230" r="60" fill="none" stroke="#C8C0B4" strokeWidth="0.5" opacity="0.3" />

                {/* Outer containment */}
                <circle cx="200" cy="200" r="120" fill="none" stroke="#C8C0B4" strokeWidth="0.3" opacity="0.15" />
                <circle cx="200" cy="200" r="180" fill="none" stroke="#C8C0B4" strokeWidth="0.3" opacity="0.08" />

                {/* Metatron lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle1 = (i * Math.PI) / 3;
                  const angle2 = ((i + 1) * Math.PI) / 3;
                  return (
                    <line
                      key={`meta-${i}`}
                      x1={200 + 60 * Math.cos(angle1)}
                      y1={200 + 60 * Math.sin(angle1)}
                      x2={200 + 60 * Math.cos(angle2)}
                      y2={200 + 60 * Math.sin(angle2)}
                      stroke="#C8C0B4"
                      strokeWidth="0.3"
                      opacity="0.2"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* YouTube Shorts — Visual Teachings */}
      <div className="mb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
                Visual Teachings
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] font-light">
                Short-Form Wisdom
              </h2>
            </div>
            <a
              href="https://www.youtube.com/@Awarenessparadox"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#C8C0B4]/40 hover:text-[#C8C0B4] text-xs uppercase tracking-wider transition-colors flex-shrink-0 pb-1"
            >
              <Play size={12} />
              Subscribe
              <ExternalLink size={10} />
            </a>
          </div>
        </div>

        {/* Horizontal scroll container */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-6 md:px-12 max-w-[1400px] mx-auto pb-4" style={{ minWidth: 'min-content' }}>
            {shorts.map((short) => (
              <div key={short.id} className="flex-shrink-0 w-[200px] md:w-[240px]">
                <div className="relative aspect-[9/16] bg-[#141414] border border-[#C8C0B4]/5 overflow-hidden group">
                  <iframe
                    src={`https://www.youtube.com/embed/${short.id}?rel=0&modestbranding=1`}
                    title={short.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <p className="text-[#F5F0E8]/30 text-xs mt-3 leading-relaxed font-[family-name:var(--font-mono)]">
                  {short.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Templum — Generative Art Collection */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-[#C9A84C]/60 text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
              Generative Art &middot; Coming Soon
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl text-[#F5F0E8] font-light mb-4">
              Templum
            </h2>
            <p className="text-[#F5F0E8]/40 text-base leading-relaxed max-w-xl">
              A generative art collection rooted in sacred geometry — algorithmic
              compositions exploring the Seed of Life, Metatron&apos;s Cube, toroidal
              fields, and the hidden architectures of nature. Each output is a unique
              meditation rendered through code. Releasing on the blockchain.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-5 py-2 border border-[#C9A84C]/30 text-[#C9A84C]/60 text-xs uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] flex-shrink-0">
            Coming Soon
          </span>
        </div>

        {/* Preview grid — 5 columns on desktop, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {templumOutputs.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[2/3] bg-[#141414] border border-[#C9A84C]/5 overflow-hidden group"
            >
              <Image
                src={src}
                alt={`Templum generative output ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle gold border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#C9A84C]/20 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Seven Hermetic Principles */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          The Seven Hermetic Principles
        </p>
        <div className="space-y-1">
          {principles.map((principle) => (
            <div
              key={principle.number}
              className="group p-6 md:p-8 bg-[#141414] hover:bg-[#1A1A1A] transition-all duration-300"
            >
              <div className="flex items-start gap-8">
                <span className="font-[family-name:var(--font-display)] text-3xl text-[#C8C0B4]/30 group-hover:text-[#C8C0B4]/60 transition-colors w-12 flex-shrink-0">
                  {principle.number}
                </span>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl text-[#F5F0E8] mb-2 group-hover:text-[#C8C0B4] transition-colors">
                    {principle.name}
                  </h3>
                  <p className="text-[#F5F0E8]/40 text-sm italic">
                    &ldquo;{principle.description}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topics Explored */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          Topics Explored
        </p>
        <div className="flex flex-wrap gap-3">
          {topics.map((topic) => (
            <span
              key={topic}
              className="px-5 py-2 border border-[#C8C0B4]/10 text-[#F5F0E8]/40 text-sm hover:border-[#C8C0B4]/30 hover:text-[#F5F0E8]/70 transition-all duration-300 cursor-default"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="p-12 md:p-20 bg-[#141414] border border-[#C8C0B4]/10 text-center relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <circle
                  key={i}
                  cx={400}
                  cy={200}
                  r={40 + i * 30}
                  fill="none"
                  stroke="#C8C0B4"
                  strokeWidth="0.5"
                />
              ))}
            </svg>
          </div>

          <div className="relative z-10">
            <blockquote className="font-[family-name:var(--font-display)] text-2xl md:text-4xl text-[#F5F0E8]/80 font-light leading-relaxed max-w-3xl mx-auto mb-8">
              &ldquo;The observer and the observed are one.
              To know thyself is to know the universe.&rdquo;
            </blockquote>
            <a
              href="https://www.awarenessparadox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 border border-[#C8C0B4] text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4] hover:text-[#0A0A0A] transition-all duration-300"
            >
              Enter the Codex
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
