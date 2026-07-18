// Coordination between the Preloader montage and the hero reveal.
// A bare CustomEvent can be missed when the dispatcher mounts before the
// listener (the Preloader sits earlier in the layout tree than the hero),
// so completion is also tracked as module state that late subscribers read.
let complete = false;

export function signalMontageComplete() {
  complete = true;
  window.dispatchEvent(new CustomEvent('montageComplete'));
}

/**
 * Run `fn` once the montage has completed. Fires immediately if it already
 * has. Returns an unsubscribe function.
 */
export function onMontageComplete(fn: () => void): () => void {
  if (complete) {
    fn();
    return () => {};
  }
  const handler = () => fn();
  window.addEventListener('montageComplete', handler, { once: true });
  return () => window.removeEventListener('montageComplete', handler);
}
