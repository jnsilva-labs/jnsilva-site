'use client';

/**
 * FilmOverlay — Vignette-only cinematic overlay.
 * Darkens edges for a film-grade look without noise or scanlines.
 */
export default function FilmOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9996,
        background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0, 0, 0, 0.3) 100%)',
      }}
    />
  );
}
