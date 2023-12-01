import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * `useIdle` is a hook that determines if the user is idle based on lack of specific activities (e.g., mouse movement, key presses).
 * It's useful for scenarios like auto-logging out users after a period of inactivity.
 *
 * @param idleTime - The duration in milliseconds after which the user is considered idle.
 * @return - A boolean state indicating if the user is idle.
 */

function useIdle(idleTime: number) {
  const [isIdle, setIsIdle] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleActivity = useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, idleTime);
  }, [idleTime]);

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'scroll'];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((event) => window.removeEventListener(event, handleActivity));
    };
  }, [handleActivity]);

  return isIdle;
}

export default useIdle;
