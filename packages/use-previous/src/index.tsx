import { useRef, useEffect } from 'react';

/**
 * `usePrevious` is a hook that stores the previous value of a state or prop.
 * It's useful for comparing current and previous values in effects or for
 * implementing animations and transitions based on value changes.
 *
 * @param value - The current value to track
 * @return - The previous value (undefined on first render)
 */

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export { usePrevious };

