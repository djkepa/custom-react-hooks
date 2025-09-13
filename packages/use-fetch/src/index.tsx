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
  compression?: boolean;
  batchRequests?: boolean;
  transform?: (data: any) => T;
}

// Global cache for SWR pattern
const globalCache = new Map<string, { data: any; timestamp: number; promise?: Promise<any> }>();
const batchQueue = new Map<string, Array<{ resolve: Function; reject: Function }>>();

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
    compression = false,
    batchRequests = false,
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

  // Batch request handler
  const executeBatchedRequest = useCallback(
    async (batchKey: string): Promise<T> => {
      const queue = batchQueue.get(batchKey) || [];
      batchQueue.delete(batchKey);

      try {
        if (!url) throw new Error('No URL provided');

        const response = await fetch(url, fetchOptions);
        if (!response.ok) throw new Error(response.statusText);

        const result = await response.json();
        const transformedResult = transform ? transform(result) : result;

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
    [url, fetchOptions, transform],
  );

  // Main fetch function
  const fetchData = useCallback(
    async (revalidate = false): Promise<void> => {
      if (!url) return;

      const now = Date.now();
      const cached = globalCache.get(url);

      // Check if we have fresh cached data
      if (!revalidate && cached && now - cached.timestamp < dedupingInterval) {
        if (cached.promise) {
          // Return existing promise if still pending
          await cached.promise;
          return;
        }
        setData(cached.data);
        setLoading(false);
        return;
      }

      // Handle request batching
      if (batchRequests) {
        const batchKey = `${url}_batch`;

        if (batchQueue.has(batchKey)) {
          // Add to existing batch
          return new Promise<void>((resolve, reject) => {
            batchQueue.get(batchKey)!.push({
              resolve: (data: T) => {
                setData(data);
                resolve();
              },
              reject,
            });
          });
        } else {
          // Create new batch
          batchQueue.set(batchKey, []);

          // Execute batch after a short delay
          setTimeout(() => {
            executeBatchedRequest(batchKey);
          }, 10);

          return new Promise<void>((resolve, reject) => {
            batchQueue.get(batchKey)!.push({
              resolve: (data: T) => {
                setData(data);
                resolve();
              },
              reject,
            });
          });
        }
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
          const transformedResult = transform ? transform(result) : result;

          // Cache the result
          globalCache.set(url, {
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
      globalCache.set(url, {
        data: cached?.data,
        timestamp: cached?.timestamp || now,
        promise: fetchPromise,
      });

      await fetchPromise;
    },
    [
      url,
      fetchOptions,
      dedupingInterval,
      batchRequests,
      executeBatchedRequest,
      transform,
      errorRetryCount,
      errorRetryInterval,
      timeout,
      keepPreviousData,
      globalStateSetter,
    ],
  );

  // Mutate function for manual data updates
  const mutate = useCallback(
    async (data?: T | Promise<T> | ((current: T | null) => T | Promise<T>)): Promise<T | null> => {
      if (!url) return null;

      if (typeof data === 'function') {
        const currentData = globalCache.get(url)?.data || null;
        const newData = await (data as Function)(currentData);
        setData(newData);
        globalCache.set(url, { data: newData, timestamp: Date.now() });
        return newData;
      } else if (data !== undefined) {
        const resolvedData = await Promise.resolve(data);
        setData(resolvedData);
        globalCache.set(url, { data: resolvedData, timestamp: Date.now() });
        return resolvedData;
      } else {
        await fetchData(true);
        return globalCache.get(url)?.data || null;
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
