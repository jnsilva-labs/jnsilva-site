export interface LabProject {
  slug: string;
  title: string;
  category: 'Creative Technology' | 'Products & Tools' | 'Games' | 'Client Work' | 'Causes';
  description: string;
  tech: string[];
  image: string;
  /** Landscape screenshots are 16:10; some OG images are 1200x630 */
  url: string;
  repo?: string; // only set for public repos
  featured?: boolean;
}

export const labProjects: LabProject[] = [
  /* ── Creative Technology ── */
  {
    slug: 'cinetica',
    title: 'Cinética',
    category: 'Creative Technology',
    description:
      'A generative homage to Venezuela’s kinetic art masters — Cruz-Diez, Soto, and Gego — arranged by a sacred-geometry composition engine. Every piece is deterministic, browser-rendered, and provably unique. Proceeds support earthquake relief.',
    tech: ['Canvas', 'Generative', 'TypeScript'],
    image: '/images/cinetica/syn-hero.jpg',
    url: 'https://cinetica.jnsilva.com',
    featured: true,
  },
  {
    slug: 'arbitrumcity',
    title: 'Arbitrum City',
    category: 'Creative Technology',
    description:
      'A living pixel city driven by the Arbitrum blockchain in real time — transaction volume fills the streets, gas price colors the skyline, block time triggers weather. Eleven DeFi districts and a block pulse every 12 seconds. The chain plays itself.',
    tech: ['JavaScript', 'Alchemy API', 'Pixel Art', 'Web3'],
    image: '/images/lab/arbitrumcity.jpg',
    url: 'https://arbitrumcity.vercel.app',
    repo: 'https://github.com/jnsilva-labs/arbitrumcity',
    featured: true,
  },
  {
    slug: 'ap-visualizer',
    title: 'Awareness Paradox Visualizer',
    category: 'Creative Technology',
    description:
      'A metaphysical music visualizer — sacred geometry reacting live to any audio source, from system sound to uploaded tracks. Part of the Awareness Paradox universe.',
    tech: ['WebGL', 'Web Audio API', 'JavaScript'],
    image: '/images/lab/apvisualizer.jpg',
    url: 'https://visualizer.awarenessparadox.com',
    repo: 'https://github.com/jnsilva-labs/awarenessparadox-visualizer',
  },
  {
    slug: 'thegreatwork',
    title: 'The Great Work',
    category: 'Creative Technology',
    description:
      'A ritual interface exploring the seven Hermetic principles through sacred geometry and fractal fields — editorial typography over a living WebGL substrate with cinematic scroll-driven transitions.',
    tech: ['Next.js', 'WebGL', 'GLSL'],
    image: '/images/lab/thegreatwork.jpg',
    url: 'https://www.awarenessparadox.com',
    repo: 'https://github.com/jnsilva-labs/thegreatwork',
  },
  {
    slug: 'thetemple',
    title: 'The Temple — Codex of Resonance',
    category: 'Creative Technology',
    description:
      'A generative art system exploring sacred geometry, fractal mysticism, and contemplative minimalism. Each invocation renders a unique sigil from a seed hash.',
    tech: ['TypeScript', 'Canvas', 'Generative'],
    image: '/images/lab/thetemple.jpg',
    url: 'https://temple.awarenessparadox.com',
  },
  {
    slug: 'canserbero',
    title: 'Canserbero — Vida y Muerte',
    category: 'Creative Technology',
    description:
      'Eight analytical visualizations of the Venezuelan rapper’s double album Vida (2010) and Muerte (2012) — narrative arc, voice matrix, citation network, lexical diptych, and biblical-mythological index.',
    tech: ['Data Viz', 'D3-style SVG', 'Single-file'],
    image: '/images/lab/canserbero.jpg',
    url: 'https://canserbero-one.vercel.app',
  },

  /* ── Products & Tools ── */
  {
    slug: 'shotmap',
    title: 'ShotMap',
    category: 'Products & Tools',
    description:
      'AI-powered shot list generator for photographers and filmmakers. Turn any creative brief into a production-ready shot list with lens recommendations, lighting diagrams, camera settings, and gear checklists.',
    tech: ['Next.js', 'Claude API', 'Supabase'],
    image: '/images/lab/shotmap.jpg',
    url: 'https://shotmap.app',
    featured: true,
  },
  {
    slug: 'gigradar',
    title: 'GigRadar',
    category: 'Products & Tools',
    description:
      'Job aggregation platform for photographers and videographers — one intelligent feed from every source, filtered, AI-scored, and delivered. Tracking 6+ sources across 20 cities.',
    tech: ['Next.js', 'TypeScript', 'AI Scoring'],
    image: '/images/lab/gigradar.jpg',
    url: 'https://gigradar-chi.vercel.app',
  },

  /* ── Games ── */
  {
    slug: 'orbitalparadox',
    title: 'Orbital Paradox',
    category: 'Games',
    description:
      'A Peggle-inspired game of cosmic transmutation — aim, cast Arcana powers, trigger Fever, and clear alchemical stages with portals, gates, and destructible obstacles. Chapter-based progression with a generated-asset pipeline.',
    tech: ['Phaser 3', 'Matter.js', 'TypeScript'],
    image: '/images/lab/orbitalparadox.jpg',
    url: 'https://orbital.awarenessparadox.com',
    repo: 'https://github.com/jnsilva-labs/orbitalparadox',
  },

  /* ── Client Work ── */
  {
    slug: 'navarretestudio',
    title: 'Navarrete Studio',
    category: 'Client Work',
    description:
      'Portfolio site for a California architecture & design studio — drone video hero, editorial filmstrip project layouts, animated blueprint overlays, and scroll-driven reveals.',
    tech: ['Next.js', 'TypeScript', 'GSAP'],
    image: '/images/lab/navarretestudio.jpg',
    url: 'https://navarretestudio.com',
    repo: 'https://github.com/jnsilva-labs/navarretestudio',
  },

  /* ── Causes ── */
  {
    slug: 'earthquake-relief',
    title: 'Ayuda Venezuela',
    category: 'Causes',
    description:
      'Rapid-response resource hub after the June 24 earthquakes — vetted organizations, donation routes, and verified information for helping Venezuela, built and shipped in days.',
    tech: ['Next.js', 'TypeScript'],
    image: '/images/lab/earthquakerelief.jpg',
    url: 'https://venezuelaearthquakerelief.com',
  },
  {
    slug: 'hastalafinal',
    title: 'Hasta La Final',
    category: 'Causes',
    description:
      'A tribute to Venezuela’s 2026 World Baseball Classic champions — an interactive celebration of the run to the title. 🇻🇪',
    tech: ['JavaScript', 'CSS'],
    image: '/images/lab/hastalafinal.jpg',
    url: 'https://hastalafinal.com',
    repo: 'https://github.com/jnsilva-labs/hastalafinal',
  },
];

export const labCategories = [
  'Creative Technology',
  'Products & Tools',
  'Games',
  'Client Work',
  'Causes',
] as const;

export function getFeaturedLabProjects() {
  return labProjects.filter((p) => p.featured);
}
