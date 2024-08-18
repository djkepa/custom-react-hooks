import { useState, useEffect, useRef, useMemo } from 'react';

/**
 * `useOnScreen` is a hook that uses the Intersection Observer API to determine whether an element is visible within the viewport.
 * It is useful for lazy loading and animations based on the element's visibility.
 *
 * @param options - (Optional) Options for the Intersection Observer.
 * @param once - (Optional) If true, the observer will unobserve after the element is first intersected.
 * @return - An object containing a ref to the element and a boolean `isIntersecting` state.
 */

function useOnScreen<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit,
  once?: boolean,
): { ref: React.RefObject<T>; isIntersecting: boolean } {
  const [isIntersecting, setIntersecting] = useState(false);
  const ref = useRef<T>(null);

  const observer = useMemo(() => {
    return new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);

      if (once && entry.isIntersecting && ref.current) {
        observer.unobserve(ref.current);
      }
    }, options);
  }, [options, once]);

  useEffect(() => {
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [observer, ref]);

  return { ref, isIntersecting };
}

export { useOnScreen };
