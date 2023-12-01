import { useState, useEffect, useRef } from 'react';

/**
 * `useThrottle` is a hook for throttling the value of a variable.
 * It limits the rate at which a value can be updated, based on a specified limit.
 *
 * @param value - The value to be throttled.
 * @param limit - The time frame in milliseconds for the throttle.
 * @param immediate - If true, the first value will be set immediately without throttling.
 * @return - The throttled value.
 */

function useThrottle<T>(value: T, limit: number, immediate: boolean = false): T | undefined {
  const [throttledValue, setThrottledValue] = useState<T | undefined>(
    immediate ? value : undefined,
  );
  const lastExecuted = useRef<number>(Date.now());
  const lastValue = useRef<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastExecuted.current >= limit) {
        setThrottledValue(lastValue.current);
        lastExecuted.current = Date.now();
      }
    }, limit - (Date.now() - lastExecuted.current));

    lastValue.current = value;

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle;
