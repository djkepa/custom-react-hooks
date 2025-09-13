"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsland = void 0;
var react_1 = require("react");
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
function useIsland(options) {
    if (options === void 0) { options = {}; }
    var _a = options.threshold, threshold = _a === void 0 ? 0.1 : _a, _b = options.rootMargin, rootMargin = _b === void 0 ? '50px' : _b, _c = options.triggerOnce, triggerOnce = _c === void 0 ? true : _c, _d = options.delay, delay = _d === void 0 ? 0 : _d, _e = options.priority, priority = _e === void 0 ? 'auto' : _e;
    var _f = (0, react_1.useState)(false), isVisible = _f[0], setIsVisible = _f[1];
    var _g = (0, react_1.useState)(false), isHydrated = _g[0], setIsHydrated = _g[1];
    var ref = (0, react_1.useRef)(null);
    var observerRef = (0, react_1.useRef)(null);
    var timeoutRef = (0, react_1.useRef)(null);
    var hydrate = (0, react_1.useCallback)(function () {
        if (!isHydrated) {
            setIsHydrated(true);
        }
    }, [isHydrated]);
    var dehydrate = (0, react_1.useCallback)(function () {
        if (isHydrated) {
            setIsHydrated(false);
        }
    }, [isHydrated]);
    var handleIntersection = (0, react_1.useCallback)(function (entries) {
        var entry = entries[0];
        if (entry.isIntersecting) {
            setIsVisible(true);
            // Schedule hydration based on priority
            var hydrateWithDelay = function () {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(function () {
                    hydrate();
                }, delay);
            };
            if (priority === 'high') {
                // High priority: hydrate immediately
                hydrate();
            }
            else if (priority === 'low') {
                // Low priority: hydrate when browser is idle
                if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
                    window.requestIdleCallback(hydrateWithDelay);
                }
                else {
                    // Fallback for browsers without requestIdleCallback
                    setTimeout(hydrateWithDelay, 100);
                }
            }
            else {
                // Auto priority: hydrate with delay
                hydrateWithDelay();
            }
            // Stop observing if triggerOnce is true
            if (triggerOnce && observerRef.current && ref.current) {
                observerRef.current.unobserve(ref.current);
            }
        }
        else {
            setIsVisible(false);
            // Optionally dehydrate when not visible (for memory optimization)
            if (!triggerOnce) {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                // Dehydrate after a delay to avoid flickering
                timeoutRef.current = setTimeout(function () {
                    dehydrate();
                }, 1000);
            }
        }
    }, [hydrate, dehydrate, delay, priority, triggerOnce]);
    (0, react_1.useEffect)(function () {
        var element = ref.current;
        if (!element || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            // Fallback: hydrate immediately if IntersectionObserver is not supported
            setIsVisible(true);
            hydrate();
            return;
        }
        // Create intersection observer
        observerRef.current = new IntersectionObserver(handleIntersection, {
            threshold: threshold,
            rootMargin: rootMargin,
        });
        observerRef.current.observe(element);
        return function () {
            if (observerRef.current && element) {
                observerRef.current.unobserve(element);
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [handleIntersection, threshold, rootMargin]);
    // Cleanup timeout on unmount
    (0, react_1.useEffect)(function () {
        return function () {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    // Handle server-side rendering
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined') {
            // On server, don't hydrate by default
            setIsVisible(false);
            setIsHydrated(false);
        }
    }, []);
    return {
        isVisible: isVisible,
        isHydrated: isHydrated,
        ref: ref,
        hydrate: hydrate,
        dehydrate: dehydrate,
    };
}
exports.useIsland = useIsland;
