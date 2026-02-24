import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ClientOverlays from "@/components/ClientOverlays";
import SmoothScroll from "@/components/layout/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://jnsilva.com'),
  title: {
    default: 'J.N. Silva — Photographer, Filmmaker & Creative Director',
    template: '%s — J.N. Silva',
  },
  description:
    'Venezuelan-born photographer, filmmaker, and creative director working at the intersection of storytelling, technology, and modern mysticism. Featured in TIME, Vogue, NY Times, Sotheby\'s.',
  keywords: [
    'JN Silva',
    'photographer',
    'filmmaker',
    'creative director',
    'NFT artist',
    'fractal art',
    'New York photographer',
    'Venezuelan photographer',
    'Sotheby\'s artist',
    'music photographer',
    'concert photography',
    'fine art photography',
  ],
  openGraph: {
    title: 'J.N. Silva — Photographer, Filmmaker & Creative Director',
    description:
      'At the intersection of storytelling, technology, and modern mysticism.',
    url: 'https://jnsilva.com',
    siteName: 'J.N. Silva',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'J.N. Silva — Photographer, Filmmaker & Creative Director' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@JNSilva_',
    creator: '@JNSilva_',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'J.N. Silva',
                alternateName: 'JN Silva',
                url: 'https://jnsilva.com',
                image: 'https://jnsilva.com/images/portrait/8x10_IG_JNSILVA.png',
                jobTitle: ['Photographer', 'Filmmaker', 'Creative Director'],
                description:
                  'Venezuelan-born photographer, filmmaker, and creative director working at the intersection of storytelling, technology, and modern mysticism.',
                birthPlace: { '@type': 'Place', name: 'Venezuela' },
                workLocation: {
                  '@type': 'Place',
                  name: 'New York City, NY',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'New York',
                    addressRegion: 'NY',
                    addressCountry: 'US',
                  },
                },
                alumniOf: {
                  '@type': 'EducationalOrganization',
                  name: 'Rutgers University',
                },
                sameAs: [
                  'https://instagram.com/jnsilva',
                  'https://x.com/JNSilva_',
                  'https://tiktok.com/@jnsilva',
                  'https://substack.com/@josensilva',
                  'https://superrare.com/jnsilva',
                ],
                knowsAbout: [
                  'Photography',
                  'Filmmaking',
                  'Sacred Geometry',
                  'NFT Art',
                  'Fractal Art',
                  'Creative Direction',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'J.N. Silva',
                url: 'https://jnsilva.com',
              },
            ]),
          }}
        />
        <SmoothScroll>
          <ClientOverlays />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
