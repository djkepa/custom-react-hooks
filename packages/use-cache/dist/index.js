import { useRef, useCallback } from 'react';
/**
 * `useCache` is a hook for in-memory caching with TTL (Time To Live) support.
 * It provides a simple key-value cache that can automatically expire entries
 * and limit the maximum number of stored items.
 *
 * @param options - Configuration options for the cache
 * @return - An object containing cache management functions:
 *   - `get`: Retrieve a value from the cache
 *   - `set`: Store a value in the cache
 *   - `has`: Check if a key exists in the cache
 *   - `delete`: Remove a specific entry from the cache
 *   - `clear`: Clear all entries from the cache
 *   - `size`: Get the current number of entries
 *   - `keys`: Get all keys in the cache
 */
function useCache(options = {}) {
    const { ttl: defaultTtl, maxSize = 100 } = options;
    const cacheRef = useRef(new Map());
    const isExpired = useCallback((entry) => {
        if (!entry.ttl)
            return false;
        return Date.now() - entry.timestamp > entry.ttl;
    }, []);
    const cleanup = useCallback(() => {
        const cache = cacheRef.current;
        const now = Date.now();
        // Remove expired entries
        const entries = Array.from(cache.entries());
        for (const [key, entry] of entries) {
            if (entry.ttl && now - entry.timestamp > entry.ttl) {
                cache.delete(key);
            }
        }
        // If still over maxSize, remove oldest entries
        if (cache.size > maxSize) {
            const entries = Array.from(cache.entries());
            entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
            const toRemove = entries.slice(0, cache.size - maxSize);
            toRemove.forEach(([key]) => cache.delete(key));
        }
    }, [maxSize]);
    const get = useCallback((key) => {
        const cache = cacheRef.current;
        const entry = cache.get(key);
        if (!entry)
            return undefined;
        if (isExpired(entry)) {
            cache.delete(key);
            return undefined;
        }
        return entry.value;
    }, [isExpired]);
    const set = useCallback((key, value, ttl) => {
        const cache = cacheRef.current;
        const entryTtl = ttl !== null && ttl !== void 0 ? ttl : defaultTtl;
        const entry = {
            value,
            timestamp: Date.now(),
            ttl: entryTtl,
        };
        cache.set(key, entry);
        cleanup();
    }, [defaultTtl, cleanup]);
    const has = useCallback((key) => {
        const cache = cacheRef.current;
        const entry = cache.get(key);
        if (!entry)
            return false;
        if (isExpired(entry)) {
            cache.delete(key);
            return false;
        }
        return true;
    }, [isExpired]);
    const deleteEntry = useCallback((key) => {
        return cacheRef.current.delete(key);
    }, []);
    const clear = useCallback(() => {
        cacheRef.current.clear();
    }, []);
    const size = useCallback(() => {
        cleanup(); // Clean expired entries before returning size
        return cacheRef.current.size;
    }, [cleanup]);
    const keys = useCallback(() => {
        cleanup(); // Clean expired entries before returning keys
        return Array.from(cacheRef.current.keys());
    }, [cleanup]);
    return {
        get,
        set,
        has,
        delete: deleteEntry,
        clear,
        size,
        keys,
    };
}
export { useCache };
//# sourceMappingURL=index.js.map