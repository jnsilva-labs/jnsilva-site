'use client';

import { Play, ExternalLink } from 'lucide-react';

interface FilmProject {
  title: string;
  type: string;
  year: string;
  description: string;
  client?: string;
  youtubeId?: string;
  featured?: boolean;
}

const filmProjects: FilmProject[] = [
  {
    title: 'Kinesthesia — The Film',
    type: 'Art Film',
    year: '2021',
    description: 'A transcendent fusion of fractal artwork projected over dancers, merging sacred geometry with human movement. The companion piece to the NFT that sold at Sotheby\'s.',
    featured: true,
  },
  {
    title: 'Vans — Off The Wall',
    type: 'Commercial',
    year: '2022',
    description: 'Short-form brand campaign capturing skateboard culture through a cinematic lens. Shot on location in Brooklyn and Lower Manhattan.',
    client: 'Vans',
  },
  {
    title: 'Golden Era Future',
    type: 'Music / NFT',
    year: '2021',
    description: 'Nine instrumental tracks from DJ Premier paired with accompanying visuals. Directed as part of the Animus Collective collaboration on Nifty Gateway.',
    client: 'DJ Premier × Animus',
  },
  {
    title: 'Ducati — NYC Nightride',
    type: 'Commercial',
    year: '2023',
    description: 'Cinematic short showcasing the Ducati Streetfighter weaving through Manhattan at night. A study in speed, light, and urban geometry.',
    client: 'Ducati',
  },
  {
    title: 'The Venezuelan Diaspora',
    type: 'Documentary',
    year: '2022',
    description: 'A deeply personal short documentary exploring the stories of Venezuelan immigrants building new lives in America while holding onto their roots.',
    featured: true,
  },
  {
    title: 'Lululemon — Movement Series',
    type: 'Commercial',
    year: '2023',
    description: 'Athletic brand campaign focused on the meditative quality of physical movement, bridging wellness culture with artistic expression.',
    client: 'Lululemon',
  },
  {
    title: 'Sacred Geometry in Motion',
    type: 'Art Film',
    year: '2023',
    description: 'An experimental visual meditation on the patterns underlying reality — combining macro photography, digital fractals, and drone footage.',
  },
  {
    title: 'Don Julio — Spirit of Mexico',
    type: 'Commercial',
    year: '2022',
    description: 'Brand storytelling piece capturing the artisanal tequila-making process and the cultural heritage behind every bottle.',
    client: 'Don Julio',
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

      {/* Featured Reel Placeholder */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <div className="relative aspect-video bg-[#141414] border border-[#C8C0B4]/10 flex items-center justify-center group cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#141414]" />
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full border-2 border-[#C8C0B4]/40 flex items-center justify-center group-hover:border-[#C8C0B4] group-hover:bg-[#C8C0B4]/10 transition-all duration-300">
              <Play size={32} className="text-[#C8C0B4]/60 group-hover:text-[#C8C0B4] transition-colors ml-1" />
            </div>
            <p className="text-[#F5F0E8]/30 text-sm font-[family-name:var(--font-mono)] uppercase tracking-wider">
              Director&apos;s Reel — Coming Soon
            </p>
          </div>
        </div>
      </div>

      {/* Film Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-24">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-12 font-[family-name:var(--font-mono)]">
          Selected Projects
        </p>

        <div className="space-y-1">
          {filmProjects.map((project, index) => (
            <div
              key={index}
              className="group p-8 md:p-10 bg-[#141414] hover:bg-[#1A1A1A] transition-all duration-300 cursor-pointer"
            >
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

                  <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-[#F5F0E8] mb-3 group-hover:text-[#C8C0B4] transition-colors">
                    {project.title}
                  </h3>

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
            </div>
          ))}
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
