/**
 * Split an element's text content into individually animatable word spans.
 * Each word is wrapped in an outer span (overflow:hidden mask) containing
 * an inner span (the animated element).
 *
 * Returns the array of inner spans for GSAP to animate.
 */
export function splitTextToWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || '';
  const words = text.split(/\s+/).filter(Boolean);
  element.innerHTML = '';

  const innerSpans: HTMLSpanElement[] = [];

  words.forEach((word, i) => {
    const outer = document.createElement('span');
    outer.style.display = 'inline-block';
    outer.style.overflow = 'hidden';
    outer.style.verticalAlign = 'top';

    const inner = document.createElement('span');
    inner.style.display = 'inline-block';
    inner.textContent = word;
    inner.className = 'word-inner';

    outer.appendChild(inner);
    element.appendChild(outer);

    // Add a regular space after each word (except last) — NOT \u00A0 which prevents line wrapping
    if (i < words.length - 1) {
      element.appendChild(document.createTextNode(' '));
    }

    innerSpans.push(inner);
  });

  return innerSpans;
}
