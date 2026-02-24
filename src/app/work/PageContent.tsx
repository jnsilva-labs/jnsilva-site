'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Lightbox from '@/components/Lightbox';
import { clients } from '@/data/clients';

interface PortfolioItem {
  src: string;
  alt: string;
  category: string;
  aspect: 'tall' | 'wide';
}

const categories = ['All', 'Music', 'People', 'Places', 'NYC', 'Clients'];

const portfolioItems: PortfolioItem[] = [
  // Music — curated selection
  { src: '/images/music/Tool.jpg', alt: 'Tool performing live on stage with dramatic lighting', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Kendrick_3.jpg', alt: 'Kendrick Lamar live in concert under stage lights', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Tame_Impala.jpg', alt: 'Tame Impala live performance with psychedelic visuals', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Coachella_4_2018_.jpg', alt: 'Coachella 2018 music festival stage and crowd', category: 'Music', aspect: 'wide' },
  { src: '/images/music/DSC03356_1_.jpg', alt: 'Live concert photography with dramatic stage lighting', category: 'Music', aspect: 'tall' },
  { src: '/images/music/jnsilva_day2_DSC07771.jpg', alt: 'Live music performance captured from the crowd', category: 'Music', aspect: 'tall' },
  { src: '/images/music/041019_-_Coachella-1-3.jpg', alt: 'Coachella 2019 festival crowd and stage panorama', category: 'Music', aspect: 'wide' },
  { src: '/images/music/DSC06882.jpg', alt: 'Concert photography with vibrant stage lights', category: 'Music', aspect: 'tall' },
  { src: '/images/music/092319_-_Freddie_Gibbs_Kiwanuka-04754.jpg', alt: 'Freddie Gibbs performing live at Kiwanuka concert', category: 'Music', aspect: 'tall' },
  { src: '/images/music/053119_-_Tyler_Gov_Ball-3-2.jpg', alt: 'Tyler the Creator performing at Governors Ball festival', category: 'Music', aspect: 'wide' },
  { src: '/images/music/111219_-_Schoolboy-00343.jpg', alt: 'ScHoolboy Q live concert performance', category: 'Music', aspect: 'tall' },
  { src: '/images/music/jnsilva_day1_DSC06771.jpg', alt: 'Live music performance with atmospheric lighting', category: 'Music', aspect: 'tall' },
  { src: '/images/music/110119_-_Preem-09229.jpg', alt: 'Live music performance with dramatic stage production', category: 'Music', aspect: 'tall' },
  { src: '/images/music/040819_-_Muse_MSG-4.jpg', alt: 'Muse performing at Madison Square Garden', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC03975.jpg', alt: 'Concert photography with colorful stage lighting', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Broey_2.jpg', alt: 'Live music performance with energetic stage presence', category: 'Music', aspect: 'wide' },
  { src: '/images/music/DSC02659.jpg', alt: 'Live concert scene with atmospheric stage lights', category: 'Music', aspect: 'tall' },
  { src: '/images/music/071119_-_Joywave-5.jpg', alt: 'Joywave live concert performance', category: 'Music', aspect: 'tall' },
  { src: '/images/music/062219_-_Wizzards_Photo_Walk.jpg', alt: 'Wizzards group photo walk event', category: 'Music', aspect: 'wide' },
  { src: '/images/music/060519_-_Joe_Russ_Pull_Up-4.jpg', alt: 'Live event photography at Pull Up party', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC09849.jpg', alt: 'Concert photography with moody stage lighting', category: 'Music', aspect: 'tall' },
  { src: '/images/music/033119_-_Cyn_Album-3.jpg', alt: 'CYN album shoot portrait in studio', category: 'Music', aspect: 'tall' },
  { src: '/images/music/jnsilva_day2_DSC08621.jpg', alt: 'Live music festival performance on stage', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC01824.jpg', alt: 'Concert photography with silhouetted performer', category: 'Music', aspect: 'tall' },
  { src: '/images/music/Photo_Aug_09_5_18_48_PM.jpg', alt: 'Live music performance under summer lights', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC07719.jpg', alt: 'Live concert with dynamic stage lighting effects', category: 'Music', aspect: 'tall' },
  { src: '/images/music/DSC09221.jpg', alt: 'Live music performance wide-angle stage view', category: 'Music', aspect: 'wide' },
  { src: '/images/music/041019_-_Coachella-1.jpg', alt: 'Coachella 2019 festival main stage performance', category: 'Music', aspect: 'wide' },
  { src: '/images/music/062219_-_Wizzards_Photo_Walk-4.jpg', alt: 'Wizzards photo walk creative group outing', category: 'Music', aspect: 'wide' },
  { src: '/images/music/041019_-_Coachella-1-6.jpg', alt: 'Coachella 2019 festival art installation and crowd', category: 'Music', aspect: 'wide' },

  // People — curated selection
  { src: '/images/people/008_MadeleineMirror.jpg', alt: 'Portrait of woman reflected in mirror, double exposure', category: 'People', aspect: 'tall' },
  { src: '/images/people/Fashion_Week.jpg', alt: 'New York Fashion Week street style portrait', category: 'People', aspect: 'tall' },
  { src: '/images/people/Film_Noir_2.jpg', alt: 'Film noir style portrait with dramatic shadows', category: 'People', aspect: 'tall' },
  { src: '/images/people/Film_Noir_4.jpg', alt: 'Film noir cinematic portrait with moody lighting', category: 'People', aspect: 'wide' },
  { src: '/images/people/Underwater_Couple_2.jpg', alt: 'Underwater portrait of couple swimming together', category: 'People', aspect: 'tall' },
  { src: '/images/people/Megan.jpg', alt: 'Portrait photograph with natural lighting', category: 'People', aspect: 'tall' },
  { src: '/images/people/Zach_.jpg', alt: 'Portrait photograph with studio lighting', category: 'People', aspect: 'tall' },
  { src: '/images/people/Couple.jpg', alt: 'Portrait of couple in intimate embrace', category: 'People', aspect: 'tall' },
  { src: '/images/people/030119_-_Marfa-12.jpg', alt: 'Portrait session in Marfa, Texas desert', category: 'People', aspect: 'tall' },
  { src: '/images/people/030119_-_Marfa-17.jpg', alt: 'Portrait session with Marfa desert landscape', category: 'People', aspect: 'wide' },
  { src: '/images/people/030119_-_Marfa-9.jpg', alt: 'Portrait in Marfa, Texas with golden hour light', category: 'People', aspect: 'wide' },
  { src: '/images/people/031219_-_EW-1.jpg', alt: 'Editorial portrait with artistic lighting', category: 'People', aspect: 'tall' },
  { src: '/images/people/Kando2_Portrait_3.jpg', alt: 'Portrait from Sony Kando trip adventure', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC08627.jpg', alt: 'Sony Kando 2019 candid portrait outdoors', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC06644.jpg', alt: 'Sony Kando 2019 portrait in natural setting', category: 'People', aspect: 'tall' },
  { src: '/images/people/041019_-_Coachella-2.jpg', alt: 'Portrait at Coachella music festival', category: 'People', aspect: 'tall' },
  { src: '/images/people/061319_-_Bonnaroo_Day_2-2.jpg', alt: 'Bonnaroo music festival day two candid portrait', category: 'People', aspect: 'wide' },
  { src: '/images/people/061319_-_Bonnaroo_Day_1-1.jpg', alt: 'Bonnaroo music festival day one portrait', category: 'People', aspect: 'tall' },
  { src: '/images/people/062119_-_Los_Wizzards_and_Mars-9.jpg', alt: 'Los Wizzards group portrait session', category: 'People', aspect: 'tall' },
  { src: '/images/people/081219_-_Kando-06445.jpg', alt: 'Sony Kando trip portrait with scenic backdrop', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC00108.jpg', alt: 'Sony Kando 2019 environmental portrait', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC00317.jpg', alt: 'Sony Kando 2019 portrait with dramatic light', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC06189.jpg', alt: 'Sony Kando 2019 candid moment portrait', category: 'People', aspect: 'tall' },
  { src: '/images/people/kando2019_jpgDSC00465.jpg', alt: 'Sony Kando 2019 portrait in golden hour', category: 'People', aspect: 'wide' },

  // Places — curated selection
  { src: '/images/places/Guatemala_Rays.jpg', alt: 'Sun rays streaming through Guatemala jungle canopy', category: 'Places', aspect: 'wide' },
  { src: '/images/places/Grand_Prismatic.jpg', alt: 'Grand Prismatic Spring aerial view, Yellowstone', category: 'Places', aspect: 'tall' },
  { src: '/images/places/Kenya_Zebras.jpg', alt: 'Zebras roaming the Kenyan savanna at golden hour', category: 'Places', aspect: 'wide' },
  { src: '/images/places/Mount_Tam_3.jpg', alt: 'Mount Tamalpais fog rolling over California hills', category: 'Places', aspect: 'tall' },
  { src: '/images/places/Glacier_National_Park.jpg', alt: 'Glacier National Park mountain and lake landscape', category: 'Places', aspect: 'wide' },
  { src: '/images/places/Solar_Eclipse.jpg', alt: 'Solar eclipse with corona visible against dark sky', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC00616.jpg', alt: 'Landscape photography with natural scenery', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC07799.jpg', alt: 'Scenic landscape with atmospheric conditions', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC03701.jpg', alt: 'Wide landscape vista with dramatic sky', category: 'Places', aspect: 'wide' },
  { src: '/images/places/DSC09765.jpg', alt: 'Landscape photography capturing natural beauty', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC02182_2.jpg', alt: 'Nature landscape with soft natural lighting', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC04115.jpg', alt: 'Scenic nature photography with vivid details', category: 'Places', aspect: 'tall' },
  { src: '/images/places/DSC04003-Edit.jpg', alt: 'Edited landscape photograph with cinematic tones', category: 'Places', aspect: 'wide' },
  { src: '/images/places/030119_-_Marfa-23.jpg', alt: 'Marfa, Texas desert landscape at golden hour', category: 'Places', aspect: 'wide' },
  { src: '/images/places/030119_-_Marfa-28.jpg', alt: 'Marfa, Texas open desert road and sky', category: 'Places', aspect: 'wide' },
  { src: '/images/places/030119_-_Marfa-29.jpg', alt: 'Marfa, Texas desert sunset with warm tones', category: 'Places', aspect: 'wide' },
  { src: '/images/places/050219_-_San_Francisco-4.jpg', alt: 'San Francisco cityscape with iconic skyline', category: 'Places', aspect: 'wide' },
  { src: '/images/places/050219_-_San_Francisco-5.jpg', alt: 'San Francisco urban landscape and architecture', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-00053.jpg', alt: 'Summer outdoor gathering by the pool', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-07750.jpg', alt: 'Pool party scene with friends in summer', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-09264.jpg', alt: 'Outdoor summer pool party atmosphere', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-00084.jpg', alt: 'Poolside gathering with warm afternoon light', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-05909.jpg', alt: 'Summer pool party candid moment', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-07851.jpg', alt: 'Pool party with friends enjoying summer', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-08264.jpg', alt: 'Outdoor pool party atmosphere at sunset', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-09296.jpg', alt: 'Summer gathering with pool and warm light', category: 'Places', aspect: 'wide' },
  { src: '/images/places/082419_-_Joe_Pool_Party-09759.jpg', alt: 'Pool party golden hour candid photography', category: 'Places', aspect: 'wide' },

  // NYC
  { src: '/images/nyc/NYOverEmpire.jpg', alt: 'Aerial view of Manhattan from above Empire State Building', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/Brooklyn_Bridge_Fog.jpg', alt: 'Brooklyn Bridge shrouded in morning fog', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/002_WindowReflection.jpg', alt: 'NYC street scene reflected in storefront window', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/012_BikerinLight.jpg', alt: 'Cyclist in dramatic light on NYC street', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/NYOverRiver.jpg', alt: 'Aerial view of NYC skyline and East River', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/Port_Authority_Reflection.jpg', alt: 'Port Authority building reflected in glass facade', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/Steam_and_Light.jpg', alt: 'NYC steam vent with dramatic street lighting', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/Puddle_.jpg', alt: 'NYC skyline reflected in street puddle', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/Bubbles_in_the_Park.jpg', alt: 'Bubbles floating in Central Park sunlight', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/DSC06629.jpg', alt: 'New York City street photography candid moment', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/DSC03961.jpg', alt: 'NYC urban street scene with city atmosphere', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/DSC07114_1_.jpg', alt: 'New York City street photography with urban detail', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/DSC03469.jpg', alt: 'NYC street scene with architectural elements', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/DSC03928.jpg', alt: 'New York City street photography at dusk', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/092919_-_Mutua-05434.jpg', alt: 'Street portrait in New York City', category: 'NYC', aspect: 'tall' },
  { src: '/images/nyc/070819_-_Sony_35_mm_Sean-2.jpg', alt: 'NYC street photography shot on Sony 35mm lens', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/070519_-_Sony_35_mm.jpg', alt: 'New York street scene captured on Sony 35mm', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/070519_-_Sony_35_mm-5.jpg', alt: 'NYC street photography on Sony 35mm with urban light', category: 'NYC', aspect: 'wide' },
  { src: '/images/nyc/051919_-_Street-1.jpg', alt: 'New York City street photography with pedestrians', category: 'NYC', aspect: 'wide' },

  // Clients — imported from shared data
  ...clients.map((c) => ({ src: c.coverImage, alt: `${c.name} — client project by J.N. Silva`, category: 'Clients' as const, aspect: 'wide' as const })),
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
                  alt={item.alt}
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
