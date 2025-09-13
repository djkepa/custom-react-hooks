export interface CacheEntry<T> {
    value: T;
    timestamp: number;
    ttl?: number;
}
export interface UseCacheOptions {
    ttl?: number;
    maxSize?: number;
}
export interface UseCacheReturn<T> {
    get: (key: string) => T | undefined;
    set: (key: string, value: T, ttl?: number) => void;
    has: (key: string) => boolean;
    delete: (key: string) => boolean;
    clear: () => void;
    size: () => number;
    keys: () => string[];
}
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
declare function useCache<T = any>(options?: UseCacheOptions): UseCacheReturn<T>;
export { useCache };
