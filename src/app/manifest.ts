import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'J.N. Silva — Photographer, Filmmaker & Creative Director',
    short_name: 'JN Silva',
    description: 'Portfolio of J.N. Silva — photographer, filmmaker, and creative director based in New York City.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#0A0A0A',
    icons: [
      { src: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
