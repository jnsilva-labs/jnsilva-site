'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { labProjects, labCategories, type LabProject } from '@/data/lab';

function ProjectCard({ project }: { project: LabProject }) {
  return (
    <div
      data-reveal
      className="group bg-[#141414] border border-[#C8C0B4]/[0.06] hover:border-[#C8C0B4]/25 transition-all duration-300 overflow-hidden flex flex-col"
    >
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden bg-[#0D0D0D] aspect-[16/10]"
      >
        <Image
          src={project.image}
          alt={`${project.title} — screenshot`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </a>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[#C8C0B4]/60 text-[10px] uppercase tracking-[0.25em] font-[family-name:var(--font-mono)]">
            {project.category}
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#F5F0E8] font-light mb-3 group-hover:text-[#C8C0B4] transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-[#F5F0E8]/40 text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] text-[#C8C0B4]/50 border border-[#C8C0B4]/10"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[#C8C0B4]/60 hover:text-[#C8C0B4] text-[11px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] transition-colors duration-300"
          >
            Live Site <ArrowUpRight size={12} />
          </a>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#F5F0E8]/25 hover:text-[#F5F0E8]/60 text-[11px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] transition-colors duration-300"
            >
              <Github size={12} /> Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LabPageContent() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: 0.08 });

  const byCategory = [...labProjects].sort(
    (a, b) => labCategories.indexOf(a.category) - labCategories.indexOf(b.category)
  );
  const filtered =
    activeCategory === 'All'
      ? byCategory
      : byCategory.filter((p) => p.category === activeCategory);

  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Creative Technology &middot; Developer Work
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
          The Lab
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl leading-relaxed">
          Code as a medium. Generative art systems, on-chain visualizations,
          AI tools for working creatives, games, and commissioned sites —
          designed and engineered end to end.
        </p>
      </div>

      {/* Stats bar */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-wrap gap-x-8 gap-y-3 py-6 border-t border-b border-[#C8C0B4]/10">
          {[
            `${labProjects.length} Projects Shipped`,
            'Generative Systems',
            'AI-Powered Tools',
            'Live On-Chain Data',
          ].map((stat) => (
            <span
              key={stat}
              className="text-[#C8C0B4] text-sm font-[family-name:var(--font-mono)] tracking-wider"
            >
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* Category filter */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-12">
        <div className="flex flex-wrap gap-3">
          {['All', ...labCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-[#C8C0B4] text-[#0A0A0A] bg-[#C8C0B4]'
                  : 'border-[#C8C0B4]/15 text-[#F5F0E8]/50 hover:border-[#C8C0B4]/40 hover:text-[#F5F0E8]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <div ref={gridRef} className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>

      {/* GitHub CTA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 text-center">
        <a
          href="https://github.com/jnsilva-labs"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-10 py-4 border border-[#C8C0B4]/30 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:bg-[#C8C0B4] hover:text-[#0A0A0A] hover:border-[#C8C0B4] transition-all duration-300"
        >
          <Github size={16} />
          More on GitHub
        </a>
      </div>
    </div>
  );
}
