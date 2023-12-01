import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * `useTimeout` is a hook for managing timeouts in React components.
 * It allows for setting, resetting, and clearing a timeout, and tracks whether the timeout is active.
 *
 * @param callback - The function to execute after the timeout.
 * @param delay - The delay in milliseconds before the timeout should occur, or null to disable the timeout.
 * @return - An object containing the timeout state and functions to reset and clear the timeout.
 */

function useTimeout(callback: () => void, delay: number | null) {
  const [isActive, setIsActive] = useState(false);
  const savedCallback = useRef<() => void>(callback);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    setIsActive(false);
  }, []);

  const reset = useCallback(() => {
    clear();
    if (delay !== null) {
      setIsActive(true);
      timerId.current = setTimeout(() => {
        savedCallback.current();
        setIsActive(false);
      }, delay);
    }
  }, [delay, clear]);

  useEffect(() => {
    reset(); // Reset the timer when delay or clear changes
  }, [delay, clear, reset]);

  return { isActive, reset, clear };
}

export default useTimeout;
