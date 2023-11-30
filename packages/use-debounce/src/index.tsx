import { useState, useCallback } from 'react';

/**
 * `useDebounce` creates a debounced version of a function. Useful for delaying a function call, like for input field validation or API calls in response to user input.
 *
 * @param callback - The function to debounce.
 * @param delay - The number of milliseconds to delay the function call.
 * @param options - Optional settings including `maxWait`, `leading`, and `trailing` execution.
 * @return - An array containing the debounced function and a `cancel` function to cancel the debounce.
 */

function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  options: {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
  } = {}
): [T, () => void] {
  const { maxWait, leading, trailing } = { trailing: true, ...options };
  const [lastCallTime, setLastCallTime] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<any | null>(null);
  const [maxTimerId, setMaxTimerId] = useState<any | null>(null);

  const debouncedFunction = useCallback(
    (...args: any[]) => {
      const now = Date.now();
      const isLeading = leading && lastCallTime === null;

      if (maxWait && !maxTimerId && trailing) {
        const maxWaitHandler = () => {
          setMaxTimerId(null);
          setLastCallTime(now);
          callback(...args);
        };
        setMaxTimerId(setTimeout(maxWaitHandler, maxWait));
      }

      if (isLeading) {
        setLastCallTime(now);
        callback(...args);
      } else if (trailing) {
        clearTimeout(timerId as number);
        const handler = () => {
          if (!isLeading || maxWait) setLastCallTime(now);
          setTimerId(null);
          callback(...args);
        };
        setTimerId(setTimeout(handler, delay));
      }
    },
    [callback, delay, leading, trailing, maxWait, lastCallTime, timerId, maxTimerId]
  );

  const cancel = useCallback(() => {
    clearTimeout(timerId);
    clearTimeout(maxTimerId);
    setTimerId(null);
    setMaxTimerId(null);
    setLastCallTime(null);
  }, [timerId, maxTimerId]);

  return [debouncedFunction as T, cancel];
}

export default useDebounce;
