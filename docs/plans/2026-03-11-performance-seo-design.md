# Performance & SEO Optimization Design

**Date:** 2026-03-11
**Status:** Approved
**Context:** Lighthouse production score is 46/100 (LCP 18s, TBT 620ms). SEO has gaps in structured data and sitemap coverage.

## Section 1: Video Optimization

**Problem:** Three NFT videos from Nifty Gateway/Artifex total ~90MB, all autoplay immediately.

**Solution:**
- Add Cloudinary transforms to Nifty Gateway URLs (`w_800,q_auto` in URL path) to reduce file sizes by ~70%
- Replace `autoPlay` with IntersectionObserver-based lazy loading (`rootMargin: "0px 0px 1500px 0px"` for early prefetch)
- Set `preload="none"` as default on all video elements
- Use poster frames (first video frame or static image) as placeholders

**Files:** `src/data/nft.ts`, `src/components/sections/DigitalArtSection.tsx`

## Section 2: Redirect Chain Fix

**Problem:** `jnsilva.com` redirects to `www.jnsilva.com` via HTTP 307, adding ~772ms to every first visit.

**Solution:**
- Swap primary domain in Vercel dashboard so `jnsilva.com` is the canonical domain (no www redirect)
- Verify `metadataBase` in `src/app/layout.tsx` matches the primary domain

**Files:** Vercel dashboard (manual), `src/app/layout.tsx` (verify)

## Section 3: Code Splitting

**Problem:** All 9 homepage sections are statically imported, loading ~1.4MB of JS upfront including Three.js for Awareness Paradox.

**Solution:**
- Convert below-fold sections to `next/dynamic` imports: DigitalArtSection, AwarenessParadoxSection, FractalsSection, ContactSection
- Keep above-fold sections (Hero, About, Photography, Clients, Film) as static imports for fast initial paint

**Files:** `src/app/page.tsx`

## Section 4: SEO Structured Data + Sitemap

**Problem:** 5 pages lack JSON-LD structured data; sitemap missing 4 photography sub-gallery routes.

**Solution:**
- Add JSON-LD to:
  - `/work` — CollectionPage
  - `/film` — VideoObject
  - `/clients` — ItemList
  - `/awareness-paradox` — WebPage
  - `/buscando-america` — Movie
- Add 4 routes to sitemap: `/photography/music`, `/photography/nyc`, `/photography/people`, `/photography/places`

**Files:** 5 `page.tsx` files, `src/app/sitemap.ts`

## Section 5: Custom 404 Page

**Problem:** Default Next.js 404 page breaks the premium aesthetic.

**Solution:**
- Create branded `src/app/not-found.tsx` matching site design language
- Minimal layout: section label, heading, brief message, link back to home

**Files:** `src/app/not-found.tsx` (new)
