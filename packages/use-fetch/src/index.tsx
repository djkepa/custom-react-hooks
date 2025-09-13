import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export interface FetchOptions<T = any> extends RequestInit {
  manual?: boolean;
  timeout?: number;
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
  refreshInterval?: number;
  dedupingInterval?: number;
  errorRetryCount?: number;
  errorRetryInterval?: number;
  fallbackData?: T;
  keepPreviousData?: boolean;
  batchRequests?: boolean;
  batchDelay?: number;
  transform?: (data: any) => T;
}

// Cache manager for better memory management and isolation
class CacheManager {
  private cache = new Map<string, { data: any; timestamp: number; promise?: Promise<any> }>();
  private batchQueue = new Map<string, Array<{ resolve: Function; reject: Function }>>();

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, value: { data: any; timestamp: number; promise?: Promise<any> }) {
    this.cache.set(key, value);
  }

  getBatch(key: string) {
    return this.batchQueue.get(key);
  }

  setBatch(key: string, value: Array<{ resolve: Function; reject: Function }>) {
    this.batchQueue.set(key, value);
  }

  deleteBatch(key: string) {
    this.batchQueue.delete(key);
  }

  clear() {
    this.cache.clear();
    this.batchQueue.clear();
  }
}

// Global cache instance
const cacheManager = new CacheManager();

function useFetch<T = unknown>(
  url: string | null,
  options: FetchOptions<T> = {},
  cache: Map<string, T> | null = null,
  globalStateSetter?: (data: T | null) => void,
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  isValidating: boolean;
  fetchData: () => Promise<void>;
  mutate: (data?: T | Promise<T> | ((current: T | null) => T | Promise<T>)) => Promise<T | null>;
  revalidate: () => Promise<void>;
} {
  const {
    revalidateOnFocus = true,
    revalidateOnReconnect = true,
    refreshInterval = 0,
    dedupingInterval = 2000,
    errorRetryCount = 3,
    errorRetryInterval = 5000,
    fallbackData,
    keepPreviousData = false,
    batchRequests = false,
    batchDelay = 10,
    transform,
    manual = false,
    timeout,
    ...fetchOptions
  } = options;

  const [data, setData] = useState<T | null>(fallbackData || null);
  const [loading, setLoading] = useState<boolean>(!!url && !manual);
  const [error, setError] = useState<Error | null>(null);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  const retryCountRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Helper functions for better code organization
  const handleCachedData = useCallback(
    (cached: any, now: number) => {
      if (cached && now - cached.timestamp < dedupingInterval) {
        if (cached.promise) {
          return cached.promise;
        }
        setData(cached.data);
        setLoading(false);
        return true;
      }
      return false;
    },
    [dedupingInterval],
  );

  const performFetch = useCallback(async (): Promise<T> => {
    if (!url) throw new Error('No URL provided');

    // Set timeout if specified
    if (timeout) {
      setTimeout(() => {
        abortControllerRef.current?.abort();
      }, timeout);
    }

    const response = await fetch(url, {
      ...fetchOptions,
      signal: abortControllerRef.current?.signal,
    });

    if (!response.ok) throw new Error(response.statusText);

    const result = await response.json();
    return transform ? transform(result) : result;
  }, [url, fetchOptions, timeout, transform]);

  const executeBatchedRequest = useCallback(
    async (batchKey: string): Promise<T> => {
      const queue = cacheManager.getBatch(batchKey) || [];
      cacheManager.deleteBatch(batchKey);

      try {
        const transformedResult = await performFetch();

        // Resolve all queued promises with the same result
        queue.forEach(({ resolve }) => resolve(transformedResult));

        return transformedResult;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Fetch failed');
        // Reject all queued promises
        queue.forEach(({ reject }) => reject(error));
        throw error;
      }
    },
    [performFetch],
  );

  const handleBatchedRequest = useCallback(
    (batchKey: string): Promise<void> => {
      if (cacheManager.getBatch(batchKey)) {
        // Add to existing batch
        return new Promise<void>((resolve, reject) => {
          cacheManager.getBatch(batchKey)!.push({
            resolve: (data: T) => {
              setData(data);
              resolve();
            },
            reject,
          });
        });
      } else {
        // Create new batch
        cacheManager.setBatch(batchKey, []);

        // Execute batch after configurable delay
        setTimeout(() => {
          executeBatchedRequest(batchKey);
        }, batchDelay);

        return new Promise<void>((resolve, reject) => {
          cacheManager.getBatch(batchKey)!.push({
            resolve: (data: T) => {
              setData(data);
              resolve();
            },
            reject,
          });
        });
      }
    },
    [executeBatchedRequest, batchDelay],
  );

  // Main fetch function - now much more focused and readable
  const fetchData = useCallback(
    async (revalidate = false): Promise<void> => {
      if (!url) return;

      const now = Date.now();
      const cached = cacheManager.get(url);

      // Check if we have fresh cached data
      if (!revalidate) {
        const cacheResult = handleCachedData(cached, now);
        if (cacheResult === true) return;
        if (cacheResult instanceof Promise) {
          await cacheResult;
          return;
        }
      }

      // Handle request batching
      if (batchRequests) {
        const batchKey = `${url}_batch`;
        return handleBatchedRequest(batchKey);
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setIsValidating(true);
      setError(null);
      if (!keepPreviousData) {
        setLoading(true);
      }

      const fetchPromise = (async (): Promise<T> => {
        try {
          const transformedResult = await performFetch();

          // Cache the result
          cacheManager.set(url, {
            data: transformedResult,
            timestamp: now,
          });

          setData(transformedResult);
          setError(null);
          retryCountRef.current = 0;
          globalStateSetter?.(transformedResult);

          return transformedResult;
        } catch (err) {
          const error = err instanceof Error ? err : new Error('Fetch failed');

          // Retry logic
          if (retryCountRef.current < errorRetryCount) {
            retryCountRef.current++;

            setTimeout(() => {
              fetchData(true);
            }, errorRetryInterval);

            throw error;
          }

          setError(error);
          throw error;
        } finally {
          setLoading(false);
          setIsValidating(false);
        }
      })();

      // Cache the promise
      cacheManager.set(url, {
        data: cached?.data,
        timestamp: cached?.timestamp || now,
        promise: fetchPromise,
      });

      await fetchPromise;
    },
    [
      url,
      handleCachedData,
      batchRequests,
      handleBatchedRequest,
      performFetch,
      errorRetryCount,
      errorRetryInterval,
      keepPreviousData,
      globalStateSetter,
    ],
  );

  // Mutate function for manual data updates
  const mutate = useCallback(
    async (data?: T | Promise<T> | ((current: T | null) => T | Promise<T>)): Promise<T | null> => {
      if (!url) return null;

      if (typeof data === 'function') {
        const currentData = cacheManager.get(url)?.data || null;
        const newData = await (data as Function)(currentData);
        setData(newData);
        cacheManager.set(url, { data: newData, timestamp: Date.now() });
        return newData;
      } else if (data !== undefined) {
        const resolvedData = await Promise.resolve(data);
        setData(resolvedData);
        cacheManager.set(url, { data: resolvedData, timestamp: Date.now() });
        return resolvedData;
      } else {
        await fetchData(true);
        return cacheManager.get(url)?.data || null;
      }
    },
    [url, fetchData],
  );

  // Revalidate function
  const revalidate = useCallback(() => fetchData(true), [fetchData]);

  // Initial fetch
  useEffect(() => {
    if (url && !manual) {
      fetchData();
    }
  }, [url, manual, fetchData]);

  // Refresh interval
  useEffect(() => {
    if (refreshInterval > 0 && url && !manual) {
      intervalRef.current = setInterval(() => {
        fetchData(true);
      }, refreshInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [refreshInterval, url, manual, fetchData]);

  // Revalidate on focus
  useEffect(() => {
    if (!revalidateOnFocus) return;

    const handleFocus = () => {
      if (url && !manual) {
        fetchData(true);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [revalidateOnFocus, url, manual, fetchData]);

  // Revalidate on reconnect
  useEffect(() => {
    if (!revalidateOnReconnect) return;

    const handleOnline = () => {
      if (url && !manual) {
        fetchData(true);
      }
    };

    window.addEventListener('online', handleOnline);
    return () => window.removeEventListener('online', handleOnline);
  }, [revalidateOnReconnect, url, manual, fetchData]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    isValidating,
    fetchData: () => fetchData(false),
    mutate,
    revalidate,
  };
}

export { useFetch };
