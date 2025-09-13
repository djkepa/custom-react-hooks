import { useState, useEffect, useRef, useCallback } from 'react';
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
function useOffscreen(options = {}) {
    const { enabled = true, priority = 'normal', timeout = 5000 } = options;
    const [isRendering, setIsRendering] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);
    const abortControllerRef = useRef(null);
    const render = useCallback((renderFn) => {
        if (!enabled) {
            // If disabled, render synchronously
            try {
                const syncResult = renderFn();
                setResult(syncResult);
                setError(null);
                return syncResult;
            }
            catch (err) {
                const error = err instanceof Error ? err : new Error('Rendering failed');
                setError(error);
                return null;
            }
        }
        // Cancel previous rendering if in progress
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        const { signal } = abortControllerRef.current;
        setIsRendering(true);
        setError(null);
        const executeRender = () => {
            try {
                if (signal.aborted)
                    return null;
                const renderResult = renderFn();
                if (signal.aborted)
                    return null;
                setResult(renderResult);
                setIsRendering(false);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                return renderResult;
            }
            catch (err) {
                if (signal.aborted)
                    return null;
                const error = err instanceof Error ? err : new Error('Offscreen rendering failed');
                setError(error);
                setIsRendering(false);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                return null;
            }
        };
        // Set timeout for rendering
        if (timeout > 0) {
            timeoutRef.current = setTimeout(() => {
                var _a;
                if (!signal.aborted) {
                    setError(new Error('Offscreen rendering timed out'));
                    setIsRendering(false);
                    (_a = abortControllerRef.current) === null || _a === void 0 ? void 0 : _a.abort();
                }
            }, timeout);
        }
        // Schedule rendering based on priority
        if (priority === 'high') {
            // High priority: execute immediately
            return executeRender();
        }
        else if (priority === 'low') {
            // Low priority: use requestIdleCallback if available
            if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                window.requestIdleCallback(() => {
                    if (!signal.aborted) {
                        executeRender();
                    }
                });
            }
            else {
                // Fallback: use setTimeout with longer delay
                setTimeout(() => {
                    if (!signal.aborted) {
                        executeRender();
                    }
                }, 100);
            }
        }
        else {
            // Normal priority: use setTimeout with short delay
            setTimeout(() => {
                if (!signal.aborted) {
                    executeRender();
                }
            }, 0);
        }
        return null;
    }, [enabled, priority, timeout]);
    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return {
        render,
        isRendering,
        result,
        error,
    };
}
export { useOffscreen };
//# sourceMappingURL=index.js.map