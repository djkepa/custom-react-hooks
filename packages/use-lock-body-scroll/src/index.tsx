import { useLayoutEffect } from 'react';

/**
 * `useLockBodyScroll` is a hook to lock the scrolling of the body, typically used in modals and overlays.
 * It prevents the background content from scrolling when the modal or overlay is active.
 *
 * @param lock - (Optional) A boolean indicating whether to lock the body scroll. Defaults to true.
 */

function useLockBodyScroll(lock: boolean = true) {
  useLayoutEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const originalStyle = window.getComputedStyle(document.body).overflow;
    if (lock) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      if (lock) {
        document.body.style.overflow = originalStyle;
      }
    };
  }, [lock]);
}

export { useLockBodyScroll };
