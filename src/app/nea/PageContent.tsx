'use client';

import Link from 'next/link';
import { ExternalLink, ArrowRight, ArrowLeft } from 'lucide-react';

const festivalLaurels = [
  { festival: 'Tribeca Film Festival', year: '2024', note: 'World Premiere' },
  { festival: 'Premios Macondo', year: '2025', note: 'Nominee — Best Fiction Short Film' },
  { festival: 'NewFilmmakers LA', year: '2025', note: 'Best International Short Film Comedy' },
  { festival: 'Le Chien qui Aboie — PACCPA', year: '2024', note: 'Audience Award — Best Short Film' },
  { festival: 'Villa de Leyva Film Festival', year: '2024', note: 'Premio Fósil' },
  { festival: 'San Diego Latino Film Festival', year: '2024', note: 'Official Selection' },
  { festival: 'Festival Internacional de Cine de Quito', year: '2025', note: 'Official Selection' },
  { festival: 'FICICA', year: '2024', note: 'Official Selection' },
  { festival: 'Felina', year: '2024', note: 'Official Selection' },
  { festival: 'Shore Scripts', year: '2023', note: 'Semi-Finalist' },
  { festival: 'Indie Shorts Awards Cannes', year: '2023', note: 'Semi-Finalist' },
];

const technicalSpecs = [
  { label: 'Country', value: 'Colombia' },
  { label: 'Year', value: '2024' },
  { label: 'Runtime', value: '23 minutes' },
  { label: 'Format', value: '4K / 2:35:1 / 24fps' },
  { label: 'Language', value: 'Spanish' },
  { label: 'Subtitles', value: 'English' },
  { label: 'Rating', value: 'PG-13 (language)' },
  { label: 'Sound', value: '5.1' },
];

const teamCredits = [
  { role: 'Written & Directed by', names: 'Alex Ulises & Nelson G. Navarrete' },
  { role: 'Executive Producer', names: 'JN Silva' },
  { role: 'General Producer', names: 'Jesús Peña' },
  { role: 'Producers', names: 'Astrid Cordero & Johanna Ipial Troncos' },
  { role: 'Starring', names: 'Julián Sánchez Jiménez' },
  { role: 'Cinematography', names: 'Andrés Felipe Vega & Daniel Mejía' },
  { role: 'Sound Design', names: 'Juan Andrés Cammarano' },
  { role: 'Production Company', names: 'Códigos, LLC' },
];

export default function NeaPageContent() {
  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-6">
        <Link
          href="/film"
          className="inline-flex items-center gap-2 text-[#C8C0B4]/50 text-xs uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors duration-300"
        >
          <ArrowLeft size={12} />
          Film &amp; Motion
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
        <p className="text-[#C8C0B4]/40 text-xs uppercase tracking-[0.4em] font-[family-name:var(--font-mono)] mb-6">
          A Códigos Production
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(4rem,12vw,10rem)] text-[#F5F0E8] font-light leading-[0.85] tracking-wide mb-6">
          NEA
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg md:text-xl max-w-2xl leading-relaxed mb-4">
          A film by Alex Ulises &amp; Nelson G. Navarrete
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-[family-name:var(--font-mono)] text-[#F5F0E8]/30 uppercase tracking-wider">
          <span>Short Film</span>
          <span className="text-[#F5F0E8]/10">|</span>
          <span>2024</span>
          <span className="text-[#F5F0E8]/10">|</span>
          <span>23 min</span>
          <span className="text-[#F5F0E8]/10">|</span>
          <span>Colombia</span>
          <span className="text-[#F5F0E8]/10">|</span>
          <span>Spanish w/ English subtitles</span>
        </div>
      </div>

      {/* Hero image placeholder — user adds stills later */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="relative aspect-[21/9] bg-[#141414] border border-[#C8C0B4]/5 overflow-hidden flex items-center justify-center">
          <p className="text-[#F5F0E8]/10 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider">
            Film Still
          </p>
        </div>
      </div>

      {/* Festival Laurels */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-10 font-[family-name:var(--font-mono)]">
          Festival Selection
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {festivalLaurels.map((laurel) => (
            <div
              key={laurel.festival}
              className="p-5 bg-[#141414] border border-[#C8C0B4]/5"
            >
              <p className="font-[family-name:var(--font-display)] text-base text-[#F5F0E8] mb-1.5 leading-tight">
                {laurel.festival}
              </p>
              <p className="text-[#C8C0B4]/60 text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] mb-1">
                {laurel.note}
              </p>
              <p className="text-[#F5F0E8]/20 text-[10px] font-[family-name:var(--font-mono)]">
                {laurel.year}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Logline */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-8 font-[family-name:var(--font-mono)]">
          Logline
        </p>
        <p className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[#F5F0E8]/80 font-light leading-relaxed max-w-4xl">
          At five in the morning, after an exhausting shift, an impulsive taxi driver in
          Medell&iacute;n is ordered by his boss to fix an air conditioner and intervene in a
          family matter nearby &mdash; an errand that tests his determination as uncontrollable
          situations push him toward an unexpected moment of self-reflection.
        </p>
      </div>

      {/* Synopsis */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-8 font-[family-name:var(--font-mono)]">
          Synopsis
        </p>
        <div className="max-w-3xl space-y-6 text-[#F5F0E8]/40 text-base leading-relaxed">
          <p>
            After a grueling shift, Peluche, a young taxi driver in Medell&iacute;n, is tasked
            with taking a critically injured passenger to the hospital. That same night, his boss
            orders him to repair an air conditioner and deal with a personal family matter back in
            the neighborhood.
          </p>
          <p>
            When Peluche leaves his taxi blocking a parking entrance, he triggers a surreal
            confrontation with enraged men. He flees in panic, causes a traffic accident, and
            ultimately loses his taxi. Defeated, he arrives at a repair shop where he experiences
            something mysterious, before finally reuniting with his daughter.
          </p>
        </div>
      </div>

      {/* Director's Statement */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-8 font-[family-name:var(--font-mono)]">
          Director&apos;s Statement
        </p>
        <div className="max-w-3xl space-y-6 text-[#F5F0E8]/40 text-base leading-relaxed">
          <p>
            The project emerges from an aesthetic and cultural movement we self-designate as
            Nearrealismo M&aacute;gico, a hybrid language born from the encounter between
            European Neorealism and Latin American Magical Realism. We incorporate the colloquial
            term <em className="text-[#F5F0E8]/60">nea</em> as an homage to the everyday language of
            contemporary Medell&iacute;n, embedding local expression into the narrative form itself.
          </p>
          <p>
            NEA is a fictional drama with subtle hints of satirical comedy, concealed beneath the
            quiet sadness produced by our own anxieties. The film explores universal themes such as
            violence, masculinity, and fatherhood, performed primarily by non-professional actors.
          </p>
          <p>
            The director&apos;s priority is authenticity above all, drawing from real experiences
            shaped by environment and circumstance. Through an intensive process of casting,
            rehearsals, and character development, the team crafted a visual language that balances
            emotional realism with subtle stylization.
          </p>
        </div>
      </div>

      {/* Technical Specifications */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-10 font-[family-name:var(--font-mono)]">
          Technical Specifications
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#C8C0B4]/5">
          {technicalSpecs.map((spec) => (
            <div key={spec.label} className="bg-[#0A0A0A] p-5">
              <p className="text-[#C8C0B4]/40 text-[10px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] mb-2">
                {spec.label}
              </p>
              <p className="text-[#F5F0E8] text-sm">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Credits */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-10 font-[family-name:var(--font-mono)]">
          Credits
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
          {teamCredits.map((credit) => (
            <div key={credit.role}>
              <p className="text-[#C8C0B4]/40 text-[10px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)] mb-1.5">
                {credit.role}
              </p>
              <p className="text-[#F5F0E8] text-base font-[family-name:var(--font-display)]">
                {credit.names}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Press Quotes */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-10 font-[family-name:var(--font-mono)]">
          Press
        </p>
        <div className="space-y-8 max-w-3xl">
          <blockquote className="border-l-2 border-[#C8C0B4]/20 pl-6">
            <p className="text-[#F5F0E8]/50 text-base leading-relaxed italic mb-3">
              &ldquo;NEA is a captivating and entertaining film, where many things happen at the same
              time. Excellent film.&rdquo;
            </p>
            <cite className="text-[#C8C0B4]/40 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider not-italic">
              Programming Team &mdash; Mirada Corta International Short Film Festival
            </cite>
          </blockquote>
          <blockquote className="border-l-2 border-[#C8C0B4]/20 pl-6">
            <p className="text-[#F5F0E8]/50 text-base leading-relaxed italic mb-3">
              &ldquo;My favorite short film of the festival.&rdquo;
            </p>
            <cite className="text-[#C8C0B4]/40 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider not-italic">
              Luis Martinez, Programmer &mdash; San Diego Latino Film Festival
            </cite>
          </blockquote>
        </div>
      </div>

      {/* Medellín Premiere */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="p-8 md:p-12 bg-[#141414] border border-[#C8C0B4]/5">
          <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
            Medell&iacute;n Premiere
          </p>
          <p className="text-[#F5F0E8]/40 text-base leading-relaxed max-w-2xl">
            After a long festival journey, the short film returned home on December 11.
            The premiere took place at the Medell&iacute;n Museum of Modern Art, with an audience
            of 900 people across three screenings. The event was attended by prominent figures from
            the local cultural scene as well as leading voices from the film industry.
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-10 font-[family-name:var(--font-mono)]">
          Links
        </p>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'IMDb', href: 'https://www.imdb.com/title/tt29218083/' },
            { label: 'YouTube', href: 'https://www.youtube.com/buscandoamerica' },
            { label: 'Instagram', href: 'https://www.instagram.com/buscandoam3rica' },
            { label: 'X', href: 'https://www.x.com/buscandoam3rica' },
            { label: 'BuscandoAmerica.co', href: 'https://buscandoamerica.co' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#C8C0B4]/10 text-[#F5F0E8]/50 text-sm hover:text-[#C8C0B4] hover:border-[#C8C0B4]/30 transition-all duration-300"
            >
              {link.label}
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>

      {/* CTA — Buscando America */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="p-12 md:p-16 bg-[#141414] border border-[#C8C0B4]/10 text-center">
          <p className="text-[#C8C0B4]/40 text-xs uppercase tracking-[0.3em] font-[family-name:var(--font-mono)] mb-4">
            Part of the Buscando America Universe
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] mb-4">
            Buscando America
          </h2>
          <p className="text-[#F5F0E8]/40 text-base mb-8 max-w-lg mx-auto">
            NEA paves the way for the feature-length fiction film currently in development &mdash;
            blending drama, fantasy, and dark comedy through Medell&iacute;n.
          </p>
          <Link
            href="/buscando-america"
            className="inline-flex items-center gap-2 px-10 py-4 border border-[#C8C0B4] text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4] hover:text-[#0A0A0A] transition-all duration-300"
          >
            Explore the Universe
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
