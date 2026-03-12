# Performance & SEO Optimization — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Raise Lighthouse production score from 46 to 80+ by eliminating 90MB video payload, code-splitting below-fold sections, and hardening SEO with JSON-LD structured data.

**Architecture:** Optimize video delivery via Cloudinary URL transforms + IntersectionObserver lazy loading. Code-split 4 below-fold homepage sections with `next/dynamic`. Add JSON-LD to 5 pages missing structured data. Create branded 404 page.

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4, GSAP, `next/dynamic`

---

### Task 1: Add Cloudinary transforms to NFT video URLs

**Files:**
- Modify: `src/data/nft.ts:17,25,41`

**Step 1: Update Nifty Gateway video URLs with width + quality transforms**

The Nifty Gateway CDN uses Cloudinary. Insert `w_800,q_auto` after `/upload/` in the URL path. The Artifex URL is on Google Cloud Storage (not Cloudinary) so leave it unchanged.

Replace lines 17, 25 in `src/data/nft.ts`:

```ts
// Line 17 — Thank You New York
video: 'https://media.niftygateway.com/video/upload/w_800,q_auto/v1609275397/ThankYouX/AvenueoftheStars_l2pbjb.mp4',

// Line 25 — Thank You Miami
video: 'https://media.niftygateway.com/video/upload/w_800,q_auto/v1614875643/Ashley/ThankYouxSilva2/Suspension_of_Disbelief_-_ThankYouX_nq75my.mp4',
```

Leave line 41 (Artifex/Google Cloud) unchanged — no Cloudinary transforms available.

**Step 2: Verify the URLs resolve**

Run:
```bash
curl -sI "https://media.niftygateway.com/video/upload/w_800,q_auto/v1609275397/ThankYouX/AvenueoftheStars_l2pbjb.mp4" | head -5
```
Expected: `HTTP/2 200` (or 301/302 redirect to CDN)

**Step 3: Commit**

```bash
git add src/data/nft.ts
git commit -m "perf: add Cloudinary transforms to NFT video URLs (w_800,q_auto)"
```

---

### Task 2: Create LazyVideo component with IntersectionObserver

**Files:**
- Create: `src/components/ui/LazyVideo.tsx`

**Step 1: Create the LazyVideo component**

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  onLoadedMetadata?: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
}

export default function LazyVideo({ src, className, onLoadedMetadata }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px 1500px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — silent fail is fine for decorative video
      });
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className={className}>
      {isVisible ? (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="none"
          className="absolute inset-0 w-full h-full object-contain"
          onLoadedMetadata={onLoadedMetadata}
        />
      ) : (
        <div className="absolute inset-0 bg-[#0D0D0D]" />
      )}
    </div>
  );
}
```

**Step 2: Verify file compiles**

Run: `npx tsc --noEmit src/components/ui/LazyVideo.tsx 2>&1 | head -10`

If TypeScript complains about isolated module resolution, just run the full build check later in Task 3.

**Step 3: Commit**

```bash
git add src/components/ui/LazyVideo.tsx
git commit -m "feat: add LazyVideo component with IntersectionObserver prefetch"
```

---

### Task 3: Replace autoPlay videos in DigitalArtSection with LazyVideo

**Files:**
- Modify: `src/components/sections/DigitalArtSection.tsx:3,42-58,95-105`

**Step 1: Import LazyVideo**

Add import at line 3 area:
```tsx
import LazyVideo from '@/components/ui/LazyVideo';
```

**Step 2: Replace featured hero video (lines 42-58)**

Replace the `<video>` element in the featured hero section with LazyVideo. The featured video needs the `onLoadedMetadata` callback for orientation detection, so pass it through:

```tsx
<LazyVideo
  src={featured.video}
  className={`absolute inset-0 w-full h-full`}
  onLoadedMetadata={(e) => {
    const v = e.currentTarget as HTMLVideoElement;
    if (v.videoWidth && v.videoHeight) {
      const ratio = v.videoWidth / v.videoHeight;
      if (ratio < 0.9) setOrientation('portrait');
      else if (ratio > 1.1) setOrientation('landscape');
      else setOrientation('square');
    }
  }}
/>
```

Note: The LazyVideo component renders the video with `object-contain` internally. The `isPortrait` conditional class was on the old `<video>` but `object-contain` is the universal safe default. If the featured video needs `object-cover` for landscape, update LazyVideo to accept an `objectFit` prop — but `object-contain` matches the current behavior for all existing NFT videos.

**Step 3: Replace collection card videos (lines 95-105)**

Replace the `<video>` block inside the cards `.map()`:

```tsx
{collection.video ? (
  <div className="relative aspect-square overflow-hidden bg-[#0D0D0D]">
    <LazyVideo src={collection.video} className="absolute inset-0 w-full h-full" />
  </div>
)
```

**Step 4: Remove unused `autoPlay` — clean up imports if needed**

The component no longer uses `<video>` directly, so no `autoPlay` attributes remain. The `useEffect` and `useState` imports are still needed for `NFTContent`'s featured title logic.

**Step 5: Build check**

Run:
```bash
cd /Users/jnsilva/Claude/jnsilva-site && npm run build 2>&1 | tail -20
```
Expected: Build succeeds with no errors.

**Step 6: Commit**

```bash
git add src/components/sections/DigitalArtSection.tsx
git commit -m "perf: replace autoPlay videos with LazyVideo (IntersectionObserver)"
```

---

### Task 4: Code-split below-fold homepage sections

**Files:**
- Modify: `src/app/page.tsx:1-18`

**Step 1: Add dynamic import**

Add `import dynamic from 'next/dynamic';` to the imports section.

**Step 2: Convert 4 below-fold sections to dynamic imports**

Replace the static imports for sections 6-9 (lines 15-18) with dynamic imports:

```tsx
// Static imports — above the fold (fast initial paint)
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import PhotographySection from '@/components/sections/PhotographySection';
import ClientsSection from '@/components/sections/ClientsSection';
import FilmSection from '@/components/sections/FilmSection';

// Dynamic imports — below the fold (code-split)
const FractalsSection = dynamic(() => import('@/components/sections/FractalsSection'));
const DigitalArtSection = dynamic(() => import('@/components/sections/DigitalArtSection'));
const AwarenessParadoxSection = dynamic(() => import('@/components/sections/AwarenessParadoxSection'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));
```

Remove the old static import lines for these 4 sections.

**Step 3: Build check**

Run:
```bash
cd /Users/jnsilva/Claude/jnsilva-site && npm run build 2>&1 | tail -20
```
Expected: Build succeeds. The `.next` output should show smaller initial JS chunks.

**Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "perf: code-split 4 below-fold homepage sections with next/dynamic"
```

---

### Task 5: Add JSON-LD structured data to 5 pages

**Files:**
- Modify: `src/app/work/page.tsx`
- Modify: `src/app/film/page.tsx`
- Modify: `src/app/clients/page.tsx`
- Modify: `src/app/awareness-paradox/page.tsx`
- Modify: `src/app/buscando-america/page.tsx`

**Step 1: Add JSON-LD to `/work` (CollectionPage)**

After the `metadata` export, before the default export, add:

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Photography — J.N. Silva',
  description: 'A decade of photography — music, street, portrait, aerial, and fine art.',
  url: 'https://jnsilva.com/work',
  author: {
    '@type': 'Person',
    name: 'J.N. Silva',
    url: 'https://jnsilva.com',
  },
};
```

Update the return to include the script tag:

```tsx
export default function WorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageContent />
    </>
  );
}
```

**Step 2: Add JSON-LD to `/film` (VideoObject)**

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Film & Motion — J.N. Silva',
  description: 'Cinematic direction and filmmaking — documentaries, music videos, and brand campaigns.',
  url: 'https://jnsilva.com/film',
  author: {
    '@type': 'Person',
    name: 'J.N. Silva',
    url: 'https://jnsilva.com',
  },
};
```

Same return pattern wrapping `<PageContent />` in a fragment with the `<script>` tag.

**Step 3: Add JSON-LD to `/clients` (ItemList)**

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Clients — J.N. Silva',
  description: 'Photography and creative direction for Nike, Sony, Spotify, Samsung, and 20+ global brands.',
  url: 'https://jnsilva.com/clients',
  numberOfItems: 27,
};
```

Same return pattern.

**Step 4: Add JSON-LD to `/awareness-paradox` (WebPage)**

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Awareness Paradox — J.N. Silva',
  description: 'Exploring Hermetic philosophy, perception, and consciousness through visual storytelling.',
  url: 'https://jnsilva.com/awareness-paradox',
  author: {
    '@type': 'Person',
    name: 'J.N. Silva',
    url: 'https://jnsilva.com',
  },
};
```

Same return pattern. Note: this page is `async` and already returns `<PageContent substackPosts={substackPosts} />`. Wrap in fragment.

**Step 5: Add JSON-LD to `/buscando-america` (Movie)**

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Movie',
  name: 'Buscando America',
  description: 'A Web3 fiction film built by Latino filmmakers. 2,500 NFT photographs documenting Medellín.',
  url: 'https://jnsilva.com/buscando-america',
  director: {
    '@type': 'Person',
    name: 'J.N. Silva',
    url: 'https://jnsilva.com',
  },
};
```

Same return pattern.

**Step 6: Build check**

Run:
```bash
cd /Users/jnsilva/Claude/jnsilva-site && npm run build 2>&1 | tail -20
```
Expected: Build succeeds with no errors.

**Step 7: Commit**

```bash
git add src/app/work/page.tsx src/app/film/page.tsx src/app/clients/page.tsx src/app/awareness-paradox/page.tsx src/app/buscando-america/page.tsx
git commit -m "seo: add JSON-LD structured data to 5 pages"
```

---

### Task 6: Create branded 404 page

**Files:**
- Create: `src/app/not-found.tsx`

**Step 1: Create the 404 page**

```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <p className="text-[#C8C0B4] text-xs uppercase tracking-[0.3em] mb-6 font-[family-name:var(--font-mono)]">
          404
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl text-[#F5F0E8] font-light mb-6">
          Page Not Found
        </h1>
        <p className="text-[#F5F0E8]/40 text-base leading-relaxed mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 px-8 py-3 border border-[#C8C0B4]/40 text-[#C8C0B4] text-sm uppercase tracking-[0.15em] hover:bg-[#C8C0B4]/10 hover:border-[#C8C0B4] transition-all duration-300"
        >
          Back to Home
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
```

**Step 2: Build check**

Run:
```bash
cd /Users/jnsilva/Claude/jnsilva-site && npm run build 2>&1 | tail -20
```
Expected: Build succeeds. The 404 route should appear in the build output.

**Step 3: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat: add branded 404 page"
```

---

### Task 7: Redirect chain fix (manual user action)

**Action:** User needs to open Vercel dashboard and set `jnsilva.com` as the primary domain (instead of `www.jnsilva.com`). This eliminates the 772ms HTTP 307 redirect on every first visit.

**Verify:** `metadataBase` in `src/app/layout.tsx:33` is already `new URL('https://jnsilva.com')` — no code change needed.

---

### Task 8: Final verification

**Step 1: Full build**

Run:
```bash
cd /Users/jnsilva/Claude/jnsilva-site && npm run build 2>&1 | tail -30
```
Expected: Clean build, all 45+ pages generated.

**Step 2: Push to deploy**

```bash
git push origin main
```

**Step 3: Post-deploy Lighthouse check**

After Vercel deploys, run Lighthouse on production to verify score improvement.
