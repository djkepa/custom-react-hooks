"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCache = void 0;
var react_1 = require("react");
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
function useCache(options) {
    if (options === void 0) { options = {}; }
    var defaultTtl = options.ttl, _a = options.maxSize, maxSize = _a === void 0 ? 100 : _a;
    var cacheRef = (0, react_1.useRef)(new Map());
    var isExpired = (0, react_1.useCallback)(function (entry) {
        if (!entry.ttl)
            return false;
        return Date.now() - entry.timestamp > entry.ttl;
    }, []);
    var cleanup = (0, react_1.useCallback)(function () {
        var cache = cacheRef.current;
        var now = Date.now();
        // Remove expired entries
        var entries = Array.from(cache.entries());
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var _a = entries_1[_i], key = _a[0], entry = _a[1];
            if (entry.ttl && now - entry.timestamp > entry.ttl) {
                cache.delete(key);
            }
        }
        // If still over maxSize, remove oldest entries
        if (cache.size > maxSize) {
            var entries_2 = Array.from(cache.entries());
            entries_2.sort(function (a, b) { return a[1].timestamp - b[1].timestamp; });
            var toRemove = entries_2.slice(0, cache.size - maxSize);
            toRemove.forEach(function (_a) {
                var key = _a[0];
                return cache.delete(key);
            });
        }
    }, [maxSize]);
    var get = (0, react_1.useCallback)(function (key) {
        var cache = cacheRef.current;
        var entry = cache.get(key);
        if (!entry)
            return undefined;
        if (isExpired(entry)) {
            cache.delete(key);
            return undefined;
        }
        return entry.value;
    }, [isExpired]);
    var set = (0, react_1.useCallback)(function (key, value, ttl) {
        var cache = cacheRef.current;
        var entryTtl = ttl !== null && ttl !== void 0 ? ttl : defaultTtl;
        var entry = {
            value: value,
            timestamp: Date.now(),
            ttl: entryTtl,
        };
        cache.set(key, entry);
        cleanup();
    }, [defaultTtl, cleanup]);
    var has = (0, react_1.useCallback)(function (key) {
        var cache = cacheRef.current;
        var entry = cache.get(key);
        if (!entry)
            return false;
        if (isExpired(entry)) {
            cache.delete(key);
            return false;
        }
        return true;
    }, [isExpired]);
    var deleteEntry = (0, react_1.useCallback)(function (key) {
        return cacheRef.current.delete(key);
    }, []);
    var clear = (0, react_1.useCallback)(function () {
        cacheRef.current.clear();
    }, []);
    var size = (0, react_1.useCallback)(function () {
        cleanup(); // Clean expired entries before returning size
        return cacheRef.current.size;
    }, [cleanup]);
    var keys = (0, react_1.useCallback)(function () {
        cleanup(); // Clean expired entries before returning keys
        return Array.from(cacheRef.current.keys());
    }, [cleanup]);
    return {
        get: get,
        set: set,
        has: has,
        delete: deleteEntry,
        clear: clear,
        size: size,
        keys: keys,
    };
}
exports.useCache = useCache;
