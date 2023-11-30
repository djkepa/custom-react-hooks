import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * useFetch is an advanced React hook for making API calls with features like timeout, caching, and global state updates.
 * It returns the API response data, loading status, any error encountered, and a fetchData function to manually trigger the request.
 *
 * @param url - The URL to fetch data from.
 * @param options - Configuration options for the fetch request, including manual trigger and timeout.
 * @param cache - Optional cache object to store and retrieve responses.
 * @param globalStateSetter - Optional global state setter function from a global state management system.
 * @return - An object containing `data`, `loading`, `error`, and `fetchData`.
 */
function useFetch<T = unknown>(
  url: string,
  options: RequestInit & { manual?: boolean, timeout?: number } = {},
  cache: Map<string, T> | null = null,
  globalStateSetter?: (data: T | null) => void
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(cache?.get(url) || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setData(cache?.get(url) || null); // Set data from cache if available
    setError(null);

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    try {
      const controller = new AbortController();
      const signal = controller.signal;
      if (options.timeout) {
        timeoutIdRef.current = setTimeout(() => controller.abort(), options.timeout);
      }

      const response = await fetch(url, { ...options, signal });
      if (!response.ok) throw new Error(response.statusText);
      const jsonData = await response.json();

      cache?.set(url, jsonData); // Update the cache with the new data
      setData(jsonData);
      if (globalStateSetter) {
        globalStateSetter(jsonData); // Update global state with new data
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    }
  }, [url, options, cache, globalStateSetter]);

  useEffect(() => {
    if (options.manual || cache?.has(url)) return; // Skip if manual or data is cached

    fetchData();

    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [fetchData, options.manual, cache, url]);

  return { data, loading, error, fetchData };
}

export default useFetch;
