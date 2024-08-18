import { useState, useEffect, useCallback } from 'react';

export type Status = 'idle' | 'pending' | 'success' | 'error';
export type AsyncFunction<T> = () => Promise<T>;

export interface UseAsyncReturn<T> {
  execute: () => void;
  status: Status;
  value: T | null;
  error: Error | null;
}

/**
 * `useAsync` is a hook that abstracts asynchronous operations, primarily for API calls or any async function.
 * It provides a consistent and easy-to-use API to manage the loading state, success state, and error state of the asynchronous operation.
 *
 * @param asyncFunction - The asynchronous function to execute. This function should return a promise.
 * @param immediate - If true, the async function will be executed immediately on component mount. Defaults to true.
 * @return - An object containing the following:
 *   - `execute`: A function to manually trigger the asynchronous operation.
 *   - `status`: The current status of the operation ('idle', 'pending', 'success', 'error').
 *   - `value`: The value returned by the async operation, if successful.
 *   - `error`: Any error encountered during the operation.
 */

function useAsync<T>(
  asyncFunction: AsyncFunction<T>,
  immediate: boolean = true,
): UseAsyncReturn<T> {
  const [status, setStatus] = useState<Status>('idle');
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction()
      .then((response) => {
        setValue(response);
        setStatus('success');
      })
      .catch((error) => {
        setError(error);
        setStatus('error');
      });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate && typeof window !== 'undefined') {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

export { useAsync };
