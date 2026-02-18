'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/Lightbox';
import { clients } from '@/data/clients';

interface PortfolioItem {
  src: string;
  category: string;
  aspect: 'tall' | 'wide';
}

const categories = ['All', 'Music', 'People', 'Places', 'NYC', 'Clients'];

const portfolioItems: PortfolioItem[] = [
  // Music — curated selection
  { src: '/images/music/Tool.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Kendrick_3.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Tame_Impala.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Coachella_4_2018_.jpg', category: 'Music', aspect: 'wide' },
  { src: '/images/music/DSC03356_1_.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/jnsilva_day2_DSC07771.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/041019_-_Coachella-1-3.jpg', category: 'Music', aspect: 'wide' },
  { src: '/images/music/DSC06882.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/092319_-_Freddie_Gibbs_Kiwanuka-04754.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/053119_-_Tyler_Gov_Ball-3-2.jpg', category: 'Music', aspect: 'wide' },
  { src: '/images/music/111219_-_Schoolboy-00343.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/jnsilva_day1_DSC06771.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/110119_-_Preem-09229.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/040819_-_Muse_MSG-4.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC03975.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Broey_2.jpg', category: 'Music', aspect: 'wide' },
  { src: '/images/music/DSC02659.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/071119_-_Joywave-5.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/062219_-_Wizzards_Photo_Walk.jpg', category: 'Music', aspect: 'wide' },
  { src: '/images/music/060519_-_Joe_Russ_Pull_Up-4.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC09849.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/033119_-_Cyn_Album-3.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/jnsilva_day2_DSC08621.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC01824.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Photo_Aug_09_5_18_48_PM.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC07719.jpg', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC09221.jpg', category: 'Music', aspect: 'wide' },
  { src: '/images/music/041019_-_Coachella-1.jpg', category: 'Music', aspect: 'wide' },
  { src: '/images/music/062219_-_Wizzards_Photo_Walk-4.jpg', category: 'Music', aspect: 'wide' },
  { src: '/images/music/041019_-_Coachella-1-6.jpg', category: 'Music', aspect: 'wide' },

  // People — curated selection
  { src: '/images/people/008_MadeleineMirror.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/Fashion_Week.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/Film_Noir_2.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/Film_Noir_4.jpg', category: 'People', aspect: 'wide' },
  { src: '/images/people/Underwater_Couple_2.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/Megan.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/Zach_.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/Couple.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/030119_-_Marfa-12.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/030119_-_Marfa-17.jpg', category: 'People', aspect: 'wide' },
  { src: '/images/people/030119_-_Marfa-9.jpg', category: 'People', aspect: 'wide' },
  { src: '/images/people/031219_-_EW-1.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/Kando2_Portrait_3.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC08627.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC06644.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/041019_-_Coachella-2.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/061319_-_Bonnaroo_Day_2-2.jpg', category: 'People', aspect: 'wide' },
  { src: '/images/people/061319_-_Bonnaroo_Day_1-1.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/062119_-_Los_Wizzards_and_Mars-9.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/081219_-_Kando-06445.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC00108.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC00317.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC06189.jpg', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC00465.jpg', category: 'People', aspect: 'wide' },

  // Places — curated selection
  { src: '/images/places/Guatemala_Rays.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/Grand_Prismatic.jpg', category: 'Places', aspect: 'tall' },
  { src: '/images/places/Kenya_Zebras.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/Mount_Tam_3.jpg', category: 'Places', aspect: 'tall' },
  { src: '/images/places/Glacier_National_Park.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/Solar_Eclipse.jpg', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC00616.jpg', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC07799.jpg', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC03701.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/DSC09765.jpg', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC02182_2.jpg', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC04115.jpg', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC04003-Edit.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/030119_-_Marfa-23.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/030119_-_Marfa-28.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/030119_-_Marfa-29.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/050219_-_San_Francisco-4.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/050219_-_San_Francisco-5.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-00053.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-07750.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-09264.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-00084.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-05909.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-07851.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-08264.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-09296.jpg', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-09759.jpg', category: 'Places', aspect: 'wide' },

  // NYC
  { src: '/images/nyc/NYOverEmpire.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/Brooklyn_Bridge_Fog.jpg', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/002_WindowReflection.jpg', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/012_BikerinLight.jpg', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/NYOverRiver.jpg', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/Port_Authority_Reflection.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/Steam_and_Light.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/Puddle_.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/Bubbles_in_the_Park.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/DSC06629.jpg', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/DSC03961.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/DSC07114_1_.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/DSC03469.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/DSC03928.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/092919_-_Mutua-05434.jpg', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/070819_-_Sony_35_mm_Sean-2.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/070519_-_Sony_35_mm.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/070519_-_Sony_35_mm-5.jpg', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/051919_-_Street-1.jpg', category: 'NYC', aspect: 'wide' },

  // Clients — imported from shared data
  ...clients.map((c) => ({ src: c.coverImage, category: 'Clients' as const, aspect: 'wide' as const })),
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return portfolioItems;
    return portfolioItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const filteredSrcs = useMemo(() => filtered.map((item) => item.src), [filtered]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: portfolioItems.length };
    for (const item of portfolioItems) {
      c[item.category] = (c[item.category] || 0) + 1;
    }
    return c;
  }, []);

  const handleNavigate = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  return (
    <div className="relative z-10 bg-[#0A0A0A] pt-32 pb-24 min-h-screen">
      {/* Header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-4 font-[family-name:var(--font-mono)]">
          Portfolio
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-8">
          Work
        </h1>
        <p className="text-[#F5F0E8]/50 text-lg max-w-2xl leading-relaxed">
          A decade of capturing human truth through street, portrait, live music,
          and aerial photography. Every frame is a meditation on light, emotion,
          and the spaces between.
        </p>
      </div>

      {/* Category Filters */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
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
              <span className="ml-2 opacity-40">{counts[cat] || 0}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid — Masonry-style */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-3 space-y-3">
          {filtered.map((item, index) => (
            <div
              key={`${item.src}-${activeFilter}`}
              className="group relative overflow-hidden break-inside-avoid bg-[#141414] cursor-pointer"
              style={{ animationDelay: `${index * 40}ms` }}
              onClick={() => setLightboxIndex(index)}
            >
              <div className={`relative ${item.aspect === 'tall' ? 'aspect-[2/3]' : 'aspect-[3/2]'}`}>
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/30 transition-all duration-500" />

                {/* Category label on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#C8C0B4] text-[10px] uppercase tracking-[0.2em] font-[family-name:var(--font-mono)]">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={filteredSrcs}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
