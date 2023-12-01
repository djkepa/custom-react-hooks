import { useEffect, RefObject } from 'react';

type ValidEvent = MouseEvent | TouchEvent;

/**
 * `useClickOutside` detects clicks outside of specified element(s). Useful for closing modal, dropdown, etc.
 *
 * @param refs - Ref(s) to the element(s) to detect outside clicks from. Can be a single ref or an array of refs.
 * @param callback - Function to execute when an outside click is detected.
 * @param events - Array of event types to listen for. Defaults to ['mousedown', 'touchstart'].
 * @param enableDetection - Boolean to enable or disable click detection.
 * @param ignoreRefs - Refs to elements that should not trigger the callback when clicked.
 */

function useClickOutside<T extends HTMLElement>(
  refs: RefObject<T>[] | RefObject<T>,
  callback: (event: ValidEvent) => void,
  events: string[] = ['mousedown', 'touchstart'],
  enableDetection: boolean = true,
  ignoreRefs: RefObject<HTMLElement>[] = [],
): void {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!enableDetection) return;

      const target = event.target as Node;

      const isIgnored = ignoreRefs.some((ref) => ref.current?.contains(target));
      if (isIgnored) return;

      const isOutside = Array.isArray(refs)
        ? refs.every((ref) => !ref.current?.contains(target))
        : !refs.current?.contains(target);

      if (isOutside) {
        callback(event as ValidEvent);
      }
    };

    events.forEach((event) => {
      document.addEventListener(event, listener);
    });

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, listener);
      });
    };
  }, [refs, callback, events, enableDetection, ignoreRefs]);
}

export default useClickOutside;
