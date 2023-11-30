
import { useState, useEffect, useCallback } from 'react';

/**
 * `useIdle` is a hook that determines if the user is idle based on lack of specific activities (e.g., mouse movement, key presses).
 * It's useful for scenarios like auto-logging out users after a period of inactivity.
 *
 * @param idleTime - The duration in milliseconds after which the user is considered idle.
 * @return - A boolean state indicating if the user is idle.
 */

function useIdle(idleTime: number) {
  const [isIdle, setIsIdle] = useState(false);

  const handleActivity = useCallback(() => {
    setIsIdle(false);
    clearTimeout(window.idleTimeout);

    window.idleTimeout = setTimeout(() => {
      setIsIdle(true);
    }, idleTime);
  }, [idleTime]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Initial reset of the timer
    handleActivity();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearTimeout(window.idleTimeout);
    };
  }, [handleActivity]);

  return isIdle;
}

declare global {
  interface Window {
    idleTimeout: ReturnType<typeof setTimeout>;
  }
}

export default useIdle;