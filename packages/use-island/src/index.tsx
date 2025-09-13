import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseIslandOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
  priority?: 'high' | 'low' | 'auto';
}

export interface UseIslandReturn {
  isVisible: boolean;
  isHydrated: boolean;
  ref: React.RefObject<HTMLElement>;
  hydrate: () => void;
  dehydrate: () => void;
}

/**
 * `useIsland` is a hook for implementing island architecture and selective hydration.
 * It allows components to be hydrated only when they become visible or when explicitly triggered,
 * improving performance by reducing initial JavaScript bundle size and execution time.
 *
 * @param options - Configuration options for island behavior
 * @return - An object containing:
 *   - `isVisible`: Boolean indicating if the element is visible in viewport
 *   - `isHydrated`: Boolean indicating if the component is hydrated
 *   - `ref`: Ref to attach to the element for intersection observation
 *   - `hydrate`: Function to manually trigger hydration
 *   - `dehydrate`: Function to manually dehydrate the component
 */

function useIsland(options: UseIslandOptions = {}): UseIslandReturn {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
    delay = 0,
    priority = 'auto',
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hydrate = useCallback(() => {
    if (!isHydrated) {
      setIsHydrated(true);
    }
  }, [isHydrated]);

  const dehydrate = useCallback(() => {
    if (isHydrated) {
      setIsHydrated(false);
    }
  }, [isHydrated]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        setIsVisible(true);

        // Schedule hydration based on priority
        const hydrateWithDelay = () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }

          timeoutRef.current = setTimeout(() => {
            hydrate();
          }, delay);
        };

        if (priority === 'high') {
          // High priority: hydrate immediately
          hydrate();
        } else if (priority === 'low') {
          // Low priority: hydrate when browser is idle
          if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
            (window as any).requestIdleCallback(hydrateWithDelay);
          } else {
            // Fallback for browsers without requestIdleCallback
            setTimeout(hydrateWithDelay, 100);
          }
        } else {
          // Auto priority: hydrate with delay
          hydrateWithDelay();
        }

        // Stop observing if triggerOnce is true
        if (triggerOnce && observerRef.current && ref.current) {
          observerRef.current.unobserve(ref.current);
        }
      } else {
        setIsVisible(false);

        // Optionally dehydrate when not visible (for memory optimization)
        if (!triggerOnce) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          // Dehydrate after a delay to avoid flickering
          timeoutRef.current = setTimeout(() => {
            dehydrate();
          }, 1000);
        }
      }
    },
    [hydrate, dehydrate, delay, priority, triggerOnce],
  );

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: hydrate immediately if IntersectionObserver is not supported
      setIsVisible(true);
      hydrate();
      return;
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle server-side rendering
  useEffect(() => {
    if (typeof window === 'undefined') {
      // On server, don't hydrate by default
      setIsVisible(false);
      setIsHydrated(false);
    }
  }, []);

  return {
    isVisible,
    isHydrated,
    ref,
    hydrate,
    dehydrate,
  };
}

export { useIsland };

