"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOffscreen = void 0;
var react_1 = require("react");
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
function useOffscreen(options) {
    if (options === void 0) { options = {}; }
    var _a = options.enabled, enabled = _a === void 0 ? true : _a, _b = options.priority, priority = _b === void 0 ? 'normal' : _b, _c = options.timeout, timeout = _c === void 0 ? 5000 : _c;
    var _d = (0, react_1.useState)(false), isRendering = _d[0], setIsRendering = _d[1];
    var _e = (0, react_1.useState)(null), result = _e[0], setResult = _e[1];
    var _f = (0, react_1.useState)(null), error = _f[0], setError = _f[1];
    var timeoutRef = (0, react_1.useRef)(null);
    var abortControllerRef = (0, react_1.useRef)(null);
    var render = (0, react_1.useCallback)(function (renderFn) {
        if (!enabled) {
            // If disabled, render synchronously
            try {
                var syncResult = renderFn();
                setResult(syncResult);
                setError(null);
                return syncResult;
            }
            catch (err) {
                var error_1 = err instanceof Error ? err : new Error('Rendering failed');
                setError(error_1);
                return null;
            }
        }
        // Cancel previous rendering if in progress
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        abortControllerRef.current = new AbortController();
        var signal = abortControllerRef.current.signal;
        setIsRendering(true);
        setError(null);
        var executeRender = function () {
            try {
                if (signal.aborted)
                    return null;
                var renderResult = renderFn();
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
                var error_2 = err instanceof Error ? err : new Error('Offscreen rendering failed');
                setError(error_2);
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
            timeoutRef.current = setTimeout(function () {
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
                window.requestIdleCallback(function () {
                    if (!signal.aborted) {
                        executeRender();
                    }
                });
            }
            else {
                // Fallback: use setTimeout with longer delay
                setTimeout(function () {
                    if (!signal.aborted) {
                        executeRender();
                    }
                }, 100);
            }
        }
        else {
            // Normal priority: use setTimeout with short delay
            setTimeout(function () {
                if (!signal.aborted) {
                    executeRender();
                }
            }, 0);
        }
        return null;
    }, [enabled, priority, timeout]);
    // Cleanup on unmount
    (0, react_1.useEffect)(function () {
        return function () {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    return {
        render: render,
        isRendering: isRendering,
        result: result,
        error: error,
    };
}
exports.useOffscreen = useOffscreen;
