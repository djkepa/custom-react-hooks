import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface FetchOptions extends RequestInit {
  manual?: boolean;
  timeout?: number;
}

function useFetch<T = unknown>(
  url: string,
  options: FetchOptions = {},
  cache: Map<string, T> | null = null,
  globalStateSetter?: (data: T | null) => void,
): {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (cache && cache.has(url)) {
      setData(cache.get(url) || null);
      setLoading(false);
      return;
    }

    try {
      if (memoizedOptions.timeout) {
        timeoutIdRef.current = setTimeout(() => {
          setLoading(false);
          setError(new Error('Timeout'));
        }, memoizedOptions.timeout);
      }

      const response = await fetch(url, memoizedOptions);
      if (!response.ok) throw new Error(response.statusText);

      const jsonData: T = await response.json();
      setData(jsonData);
      if (cache) {
        cache.set(url, jsonData);
      }
      globalStateSetter?.(jsonData);
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
  }, [url, memoizedOptions, cache, globalStateSetter]);

  useEffect(() => {
    if (options.manual || (cache && cache.has(url))) return;
    fetchData();
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [fetchData]);

  return { data, loading, error, fetchData };
}

export default useFetch;
