export interface UseOffscreenOptions {
    enabled?: boolean;
    priority?: 'high' | 'normal' | 'low';
    timeout?: number;
}
export interface UseOffscreenReturn<T> {
    render: (renderFn: () => T) => T | null;
    isRendering: boolean;
    result: T | null;
    error: Error | null;
}
/**
 * `useOffscreen` is a hook for offscreen rendering and heavy computations.
 * It allows rendering components or performing computations in the background
 * without blocking the main thread, improving perceived performance.
 *
 * @param options - Configuration options for offscreen rendering
 * @return - An object containing:
 *   - `render`: Function to trigger offscreen rendering
 *   - `isRendering`: Boolean indicating if rendering is in progress
 *   - `result`: The result of the offscreen rendering
 *   - `error`: Error if rendering fails
 */
declare function useOffscreen<T = any>(options?: UseOffscreenOptions): UseOffscreenReturn<T>;
export { useOffscreen };
//# sourceMappingURL=index.d.ts.map