import { useState, useEffect, useRef } from 'react';

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
