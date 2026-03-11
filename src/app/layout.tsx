import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
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
    default: 'J.N. Silva — Artist & Creative Technologist',
    template: '%s — J.N. Silva',
  },
  description:
    'Venezuelan-born artist and creative technologist. Photographer, filmmaker, and creative director. Featured in TIME, Vogue, NY Times, Sotheby\'s.',
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
    title: 'J.N. Silva — Artist & Creative Technologist',
    description:
      'Venezuelan-born artist and creative technologist. Photographer, filmmaker, and creative director.',
    url: 'https://jnsilva.com',
    siteName: 'J.N. Silva',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'J.N. Silva — Artist & Creative Technologist' }],
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[var(--gold)] focus:text-[var(--background)] focus:rounded focus:font-[family-name:var(--font-body)] focus:text-sm"
        >
          Skip to content
        </a>
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
                  'Venezuelan-born artist and creative technologist. Photographer, filmmaker, and creative director.',
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
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
