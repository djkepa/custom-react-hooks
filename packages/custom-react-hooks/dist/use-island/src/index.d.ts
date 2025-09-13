/// <reference types="react" />
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
declare function useIsland(options?: UseIslandOptions): UseIslandReturn;
export { useIsland };
