'use client';

import dynamic from 'next/dynamic';

const Preloader = dynamic(() => import('@/components/Preloader'), { ssr: false });
const FilmOverlay = dynamic(() => import('@/components/FilmOverlay'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

export default function ClientOverlays() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <FilmOverlay />
    </>
  );
}
