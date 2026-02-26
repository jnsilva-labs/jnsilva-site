'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

interface FilmProject {
  title: string;
  type: string;
  year: string;
  description: string;
  client?: string;
  youtubeId?: string;
  featured?: boolean;
  link?: string;
  comingSoon?: boolean;
}

const filmProjects: FilmProject[] = [
  {
    title: 'Buscando America',
    type: 'Fiction Film / Web3',
    year: '2022–present',
    description: 'A fiction film under construction in Web3. Built by Latino filmmakers, funded through community-driven NFT collections. The IDIOSINCRASIA collection — 2,500 one-of-one photographs documenting Medellín\'s idiosyncrasy — was selected by OpenSea as a standout collection. Screened at NFT Now\'s The Gateway.',
    featured: true,
    link: '/buscando-america',
  },
  {
    title: 'NEA',
    type: 'Short Film',
    year: '2024',
    description: 'A short film proposing "Nearrealismo Mágico" — a fusion of Italian Neorealism and Latin American Magical Realism. World premiered at Tribeca 2024. Winner of Best International Short Film at NewFilmmakers LA. Nominated for Best National Short Film at Colombia\'s Macondo Awards.',
    featured: true,
    link: '/nea',
  },
  {
    title: 'Kinesthesia — The Film',
    type: 'Art Film',
    year: '2021',
    description: 'A transcendent fusion of fractal artwork projected over dancers, merging sacred geometry with human movement. The companion piece to the NFT that sold at Sotheby\'s for £90,000.',
    featured: true,
    comingSoon: true,
  },
  {
    title: 'Golden Era Future',
    type: 'Music / NFT',
    year: '2021',
    description: 'Nine instrumental tracks from DJ Premier paired with accompanying visuals. Directed as part of the Animus Collective collaboration on Nifty Gateway.',
    client: 'DJ Premier × Animus',
    comingSoon: true,
  },
  {
    title: 'The Venezuelan Diaspora',
    type: 'Documentary',
    year: '2022',
    description: 'A deeply personal short documentary exploring the stories of Venezuelan immigrants building new lives in America while holding onto their roots.',
    featured: true,
    comingSoon: true,
  },
  {
    title: 'Sacred Geometry in Motion',
    type: 'Art Film',
    year: '2023',
    description: 'An experimental visual meditation on the patterns underlying reality — combining macro photography, digital fractals, and drone footage.',
    comingSoon: true,
  },
];

export default function FilmPage() {
  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Cinematic
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
          Film &amp; Motion
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl leading-relaxed">
          Directing cinematic short-form and documentary-style projects for brands
          and artists worldwide. Every piece marries visual poetry with intentional
          storytelling.
        </p>
      </div>

      {/* Featured — IDIOSINCRASIA Documentary */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-8">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Featured
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-[#F5F0E8] font-light mb-2">
          IDIOSINCRASIA
        </h2>
        <p className="text-[#F5F0E8]/40 text-sm mb-6 max-w-2xl leading-relaxed">
          A Buscando America documentary. 2,500 one-of-one photographs capturing the idiosyncrasy
          of Medellín, Colombia — the characters, colors, and situations that define the city.
        </p>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="relative aspect-video bg-[#141414] border border-[#C8C0B4]/10 overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/VhJgK1K4fc4?start=34&rel=0&modestbranding=1&color=white"
            title="IDIOSINCRASIA — A Buscando America Documentary"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex gap-6 mt-4">
          <Link
            href="/buscando-america"
            className="text-[#C8C0B4]/50 text-xs uppercase tracking-wider font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors"
          >
            Explore the Universe →
          </Link>
          <a
            href="https://buscandoamerica.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#F5F0E8]/20 text-xs uppercase tracking-wider font-[family-name:var(--font-mono)] hover:text-[#C8C0B4] transition-colors inline-flex items-center gap-1"
          >
            BuscandoAmerica.co <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Film Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          Selected Projects
        </p>

        <div className="space-y-1">
          {filmProjects.map((project, index) => {
            const content = (
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#F5F0E8]/30 text-xs font-[family-name:var(--font-mono)] uppercase tracking-wider">
                      {project.year}
                    </span>
                    <span className="text-[#F5F0E8]/10">|</span>
                    <span className="text-[#C8C0B4]/50 text-xs font-[family-name:var(--font-mono)]">
                      {project.type}
                    </span>
                    {project.client && (
                      <>
                        <span className="text-[#F5F0E8]/10">|</span>
                        <span className="text-[#F5F0E8]/30 text-xs font-[family-name:var(--font-mono)]">
                          {project.client}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[#F5F0E8] mb-3 group-hover:text-[#C8C0B4] transition-colors">
                      {project.title}
                    </h3>
                    {project.comingSoon && (
                      <span className="mb-3 text-[10px] uppercase tracking-[0.15em] font-[family-name:var(--font-mono)] text-[#C8C0B4]/50 border border-[#C8C0B4]/20 px-2.5 py-1 rounded-sm">
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <p className="text-[#F5F0E8]/40 text-sm leading-relaxed max-w-2xl">
                    {project.description}
                  </p>
                </div>

                {project.featured && (
                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <span className="text-[#C8C0B4]/40 text-xs uppercase tracking-wider font-[family-name:var(--font-mono)]">
                      Featured
                    </span>
                    <div className="w-2 h-2 rounded-full bg-[#C8C0B4]/60" />
                  </div>
                )}
              </div>
            );

            return project.link ? (
              <Link
                key={index}
                href={project.link}
                className="group block p-8 md:p-10 bg-[#141414] hover:bg-[#1A1A1A] transition-all duration-300 cursor-pointer"
              >
                {content}
              </Link>
            ) : (
              <div
                key={index}
                className="group p-8 md:p-10 bg-[#141414] hover:bg-[#1A1A1A] transition-all duration-300"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          Services
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Direction', 'Cinematography', 'Post-Production', 'Music Videos', 'Brand Films', 'Documentary', 'Art Films', 'Experiential'].map(
            (service) => (
              <div key={service} className="p-6 bg-[#141414] border border-[#C8C0B4]/5 text-center">
                <p className="text-[#F5F0E8]/50 text-sm">{service}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
