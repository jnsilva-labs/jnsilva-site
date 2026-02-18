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
  title: "J.N. Silva — Photographer, Filmmaker & Creative Director",
  description:
    "Venezuelan-born photographer, filmmaker, and creative director working at the intersection of storytelling, technology, and modern mysticism. Featured in TIME, Vogue, NY Times, Sotheby's.",
  keywords: [
    "JN Silva",
    "photographer",
    "filmmaker",
    "creative director",
    "NFT artist",
    "Awareness Paradox",
    "sacred geometry",
    "New York photographer",
  ],
  openGraph: {
    title: "J.N. Silva — Photographer, Filmmaker & Creative Director",
    description:
      "At the intersection of storytelling, technology, and modern mysticism.",
    type: "website",
    locale: "en_US",
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
