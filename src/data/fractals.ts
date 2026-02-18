/**
 * Centralized fractal art data.
 * All fractal images organized by collection/category.
 */

export interface FractalImage {
  src: string;
  title: string;
  category: 'kinesthesia' | 'infinitum' | 'portraits' | 'abstract';
  description?: string;
  year?: string;
  aspect: 'square' | 'tall' | 'wide';
}

export const fractalImages: FractalImage[] = [
  // ─── Kinesthesia ───
  {
    src: '/images/fractals/kinesthesia.jpg',
    title: 'Kinesthesia',
    category: 'kinesthesia',
    description: "Fractal geometry projected onto dancers in motion. Sold at Sotheby's London for £90,000.",
    year: '2022',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/jnsilva-sothebys-kinesthesia.JPG',
    title: "Kinesthesia — Sotheby's",
    category: 'kinesthesia',
    year: '2022',
    aspect: 'wide',
  },

  // ─── Infinitum Collection ───
  {
    src: '/images/fractals/infinitum/jnsilva_infinitum_swingonthespiral.JPG',
    title: 'Swing on the Spiral',
    category: 'infinitum',
    description: 'From the Infinitum collection — exploring infinite recursion and sacred patterns.',
    year: '2022',
    aspect: 'tall',
  },
  {
    src: '/images/fractals/infinitum/jnsilva_infinitum_-selfsimilarity.JPG',
    title: 'Self-Similarity',
    category: 'infinitum',
    year: '2022',
    aspect: 'tall',
  },
  {
    src: '/images/fractals/infinitum/jnsilva_infinitum_-chaostheory.JPG',
    title: 'Chaos Theory',
    category: 'infinitum',
    year: '2022',
    aspect: 'tall',
  },
  {
    src: '/images/fractals/infinitum/jnsilva_infinitum_progressiveiteration.JPG',
    title: 'Progressive Iteration',
    category: 'infinitum',
    year: '2022',
    aspect: 'tall',
  },

  // ─── Fractal Portraits ───
  {
    src: '/images/fractals/fractalportraits1.JPG',
    title: 'Fractal Portrait I',
    category: 'portraits',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/fractalportraits2.JPG',
    title: 'Fractal Portrait II',
    category: 'portraits',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/fractalportraits3.JPG',
    title: 'Fractal Portrait III',
    category: 'portraits',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/TheUniverseInYou.JPG',
    title: 'The Universe In You',
    category: 'portraits',
    aspect: 'tall',
  },

  // ─── Abstract Fractals ───
  {
    src: '/images/fractals/CrushedIce.jpg',
    title: 'Crushed Ice',
    category: 'abstract',
    year: '2020',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/NeonPinkSpirals.jpg',
    title: 'Neon Pink Spirals',
    category: 'abstract',
    year: '2020',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/NeonPurpleSplatter-00046.jpg',
    title: 'Neon Purple Splatter',
    category: 'abstract',
    year: '2020',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/PastelWorld.jpg',
    title: 'Pastel World',
    category: 'abstract',
    year: '2020',
    aspect: 'tall',
  },
  {
    src: '/images/fractals/RedandBlueFlowers.jpg',
    title: 'Red and Blue Flowers',
    category: 'abstract',
    year: '2020',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/TrippyColorSpiral.jpg',
    title: 'Trippy Color Spiral',
    category: 'abstract',
    year: '2020',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/TrippyColorSpiral2.jpg',
    title: 'Trippy Color Spiral II',
    category: 'abstract',
    year: '2020',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/trippyripples-00084.jpg',
    title: 'Trippy Ripples',
    category: 'abstract',
    year: '2020',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/retropostervibes.jpg',
    title: 'Retro Poster Vibes',
    category: 'abstract',
    year: '2020',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/05.15.23 - SerotoninPatterns.jpg',
    title: 'Serotonin Patterns',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051523_DeepBlue.jpg',
    title: 'Deep Blue',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051623_RisingPhoenix.jpg',
    title: 'Rising Phoenix',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051523_NewtonsLaws.jpg',
    title: "Newton's Laws",
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051523_Radiate.jpg',
    title: 'Radiate',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051523_Wings.jpg',
    title: 'Wings',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051523_SkiPath3D.jpg',
    title: 'Ski Path 3D',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051523_SkiPath3DFlower.jpg',
    title: 'Ski Path 3D Flower',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051623_NeuronFields-00001.jpg',
    title: 'Neuron Fields',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/051623_OrbitTrapCameos.jpg',
    title: 'Orbit Trap Cameos',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/Imaginari.jpg',
    title: 'Imaginari',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/Symmatron2-00076.jpg',
    title: 'Symmatron',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/Reverse.jpg',
    title: 'Reverse',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/Reverse2.jpg',
    title: 'Reverse II',
    category: 'abstract',
    year: '2023',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/012226 - Dark Forces.jpg',
    title: 'Dark Forces',
    category: 'abstract',
    year: '2022',
    aspect: 'tall',
  },
  {
    src: '/images/fractals/SpiralColor3jpg.jpg',
    title: 'Spiral Color',
    category: 'abstract',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/DSC00605.jpg',
    title: 'Fractal Study I',
    category: 'abstract',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/DSC02252.jpg',
    title: 'Fractal Study II',
    category: 'abstract',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/DSC03555.jpg',
    title: 'Fractal Study III',
    category: 'abstract',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/11.07.22 - Rainbow Fractal Mash 3.jpg',
    title: 'Rainbow Fractal Mash',
    category: 'abstract',
    year: '2022',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/07.12.22 - red white blue julia.jpg',
    title: 'Red White Blue Julia',
    category: 'abstract',
    year: '2022',
    aspect: 'wide',
  },
  {
    src: '/images/fractals/Decomp Epsilon - Klein Squ Lattice2.jpg',
    title: 'Decomp Epsilon',
    category: 'abstract',
    aspect: 'wide',
  },
];

/* ─── Helper Functions ─── */

export function getFractalsByCategory(category: FractalImage['category']): FractalImage[] {
  return fractalImages.filter((f) => f.category === category);
}

export function getKinesthesia(): FractalImage {
  return fractalImages.find((f) => f.src.includes('kinesthesia.jpg'))!;
}

export function getInfinitum(): FractalImage[] {
  return getFractalsByCategory('infinitum');
}

export function getPortraits(): FractalImage[] {
  return getFractalsByCategory('portraits');
}

export function getAbstract(): FractalImage[] {
  return getFractalsByCategory('abstract');
}

export function getAllFractals(): FractalImage[] {
  return fractalImages;
}
