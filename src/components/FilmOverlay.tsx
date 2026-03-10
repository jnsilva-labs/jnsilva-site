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
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        background: 'radial-gradient(ellipse at center, transparent 65%, rgba(0, 0, 0, 0.3) 100%)',
      }}
    />
  );
}
