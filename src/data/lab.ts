export interface LabProject {
  slug: string;
  title: string;
  category: 'Generative Art' | 'Interactive & Games' | 'Websites' | 'Pitch Decks';
  description: string;
  tech: string[];
  image: string;
  /** Landscape screenshots are 16:10; some OG images are 1200x630 */
  url: string;
  repo?: string; // only set for public repos
  featured?: boolean;
}

export const labProjects: LabProject[] = [
  /* ── Generative Art ── */
  {
    slug: 'cinetica',
    title: 'Cinética',
    category: 'Generative Art',
    description:
      'A generative homage to Venezuela’s kinetic art masters — Cruz-Diez, Soto, and Gego — arranged by a sacred-geometry composition engine. Every piece is deterministic, browser-rendered, and provably unique. Proceeds support earthquake relief.',
    tech: ['Canvas', 'Generative', 'TypeScript'],
    image: '/images/lab/cinetica-wide.jpg',
    url: 'https://cinetica.jnsilva.com',
    featured: true,
  },
  {
    slug: 'arbitrumcity',
    title: 'Arbitrum City',
    category: 'Interactive & Games',
    description:
      'Hackathon project: a living pixel city driven by the Arbitrum blockchain in real time — transaction volume fills the streets, gas price colors the skyline, block time triggers weather. Eleven DeFi districts and a block pulse every 12 seconds. The chain plays itself.',
    tech: ['JavaScript', 'Alchemy API', 'Pixel Art', 'Web3'],
    image: '/images/lab/arbitrumcity.jpg',
    url: 'https://arbitrumcity.vercel.app',
    repo: 'https://github.com/jnsilva-labs/arbitrumcity',
    featured: true,
  },
  {
    slug: 'ap-visualizer',
    title: 'Awareness Paradox Visualizer',
    category: 'Interactive & Games',
    description:
      'A metaphysical music visualizer — sacred geometry reacting live to any audio source, from system sound to uploaded tracks. Part of the Awareness Paradox universe.',
    tech: ['WebGL', 'Web Audio API', 'JavaScript'],
    image: '/images/lab/apvisualizer.jpg',
    url: 'https://visualizer.awarenessparadox.com',
    repo: 'https://github.com/jnsilva-labs/awarenessparadox-visualizer',
  },
  {
    slug: 'awarenessparadox',
    title: 'Awareness Paradox',
    category: 'Websites',
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
    category: 'Generative Art',
    description:
      'A generative art system exploring sacred geometry, fractal mysticism, and contemplative minimalism. Each invocation renders a unique sigil from a seed hash.',
    tech: ['TypeScript', 'Canvas', 'Generative'],
    image: '/images/lab/thetemple.jpg',
    url: 'https://temple.awarenessparadox.com',
  },
  /* ── Interactive & Games ── */
  {
    slug: 'orbitalparadox',
    title: 'Orbital Paradox',
    category: 'Interactive & Games',
    description:
      'A Peggle-inspired game of cosmic transmutation — aim, cast Arcana powers, trigger Fever, and clear alchemical stages with portals, gates, and destructible obstacles. Chapter-based progression with a generated-asset pipeline.',
    tech: ['Phaser 3', 'Matter.js', 'TypeScript'],
    image: '/images/lab/orbitalparadox.jpg',
    url: 'https://orbital.awarenessparadox.com',
    repo: 'https://github.com/jnsilva-labs/orbitalparadox',
  },

  /* ── Websites ── */
  {
    slug: 'navarretestudio',
    title: 'Navarrete Studio',
    category: 'Websites',
    description:
      'Portfolio site for a California architecture & design studio — drone video hero, editorial filmstrip project layouts, animated blueprint overlays, and scroll-driven reveals.',
    tech: ['Next.js', 'TypeScript', 'GSAP'],
    image: '/images/lab/navarretestudio.jpg',
    url: 'https://navarretestudio.com',
    repo: 'https://github.com/jnsilva-labs/navarretestudio',
  },

  {
    slug: 'luvk9',
    title: 'Luv K9',
    category: 'Websites',
    description:
      'A fun, interactive site for Hoboken’s dog daycare, grooming, and walking company — playful motion, bold type, and booking flows for PlayCare and Luv Kuts.',
    tech: ['Next.js', 'TypeScript', 'GSAP'],
    image: '/images/lab/luvk9.jpg',
    url: 'https://luvhoboken.com',
    repo: 'https://github.com/jnsilva-labs/luvk9hoboken',
  },
  {
    slug: 'therapyenergy',
    title: 'Therapy Energy',
    category: 'Websites',
    description:
      'A serene site for holistic healer Adriana Monsalve — sacred geometry motifs over warm, misted fields, with session booking and practice information.',
    tech: ['Next.js', 'TypeScript'],
    image: '/images/lab/therapy.jpg',
    url: 'https://www.theraphyenergy.com',
    repo: 'https://github.com/jnsilva-labs/theraphyenergy',
  },
  {
    slug: 'earthquake-relief',
    title: 'Ayuda Venezuela',
    category: 'Websites',
    description:
      'Rapid-response resource hub after the June 24 earthquakes — vetted organizations, donation routes, and verified information for helping Venezuela, built and shipped in days.',
    tech: ['Next.js', 'TypeScript'],
    image: '/images/lab/earthquakerelief.jpg',
    url: 'https://venezuelaearthquakerelief.com',
  },
  {
    slug: 'hastalafinal',
    title: 'Hasta La Final',
    category: 'Websites',
    description:
      'A tribute to Venezuela’s 2026 World Baseball Classic champions — an interactive celebration of the run to the title. 🇻🇪',
    tech: ['JavaScript', 'CSS'],
    image: '/images/lab/hastalafinal.jpg',
    url: 'https://hastalafinal.com',
    repo: 'https://github.com/jnsilva-labs/hastalafinal',
  },

  /* ── Pitch Decks ── */
  {
    slug: 'buscandoamerica-pitch',
    title: 'Buscando América',
    category: 'Pitch Decks',
    description:
      'Interactive pitch for a cinematic universe by Códigos Global — an immersive, scroll-driven deck that carries the film’s world instead of a PDF.',
    tech: ['Next.js', 'TypeScript', 'GSAP'],
    image: '/images/lab/buscandoamerica.jpg',
    url: 'https://buscandoamerica.co',
  },
  {
    slug: 'riasuth',
    title: 'Ria Suth',
    category: 'Pitch Decks',
    description:
      'Story-driven production pitch site — editorial pacing and cinematic imagery presenting the director’s vision as a browsable experience.',
    tech: ['Next.js', 'TypeScript'],
    image: '/images/lab/riasuth.jpg',
    url: 'https://riasuth.vercel.app',
  },
  {
    slug: 'meyhem',
    title: 'Meyhem Lauren — The White Truffle Era',
    category: 'Pitch Decks',
    description:
      'Cinematic pitch for the Queens rapper’s White Truffle era — a cold-open reel treatment with editorial serif typography, film-slate framing, and scroll-driven pacing.',
    tech: ['Next.js', 'TypeScript', 'GSAP'],
    image: '/images/lab/meyhem.jpg',
    url: 'https://meyhem.vercel.app',
  },
];

export const labCategories = [
  'Generative Art',
  'Interactive & Games',
  'Websites',
  'Pitch Decks',
] as const;

export function getFeaturedLabProjects() {
  return labProjects.filter((p) => p.featured);
}
