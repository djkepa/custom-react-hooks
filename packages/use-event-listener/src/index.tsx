import { useRef, useEffect } from 'react';

type EventHandler<E extends Event = Event> = (event: E) => void;

/**
 * `useEventListener` is a hook for adding event listeners to a DOM element.
 * It abstracts the process of adding and removing event listeners, handling cleanup automatically.
 *
 * @param eventName - The name or array of names of the event to listen for.
 * @param handler - The function to execute when the event is triggered.
 * @param element - (Optional) The ref object of the element to which the event listener will be added. Defaults to `window`.
 * @param options - (Optional) Options to pass to the event listener.
 * @param condition - (Optional) A boolean to conditionally add or remove the event listener.
 */

function useEventListener<T extends HTMLElement = HTMLDivElement, E extends Event = Event>(
  eventName: string | string[],
  handler: EventHandler<E>,
  element?: React.RefObject<T>,
  options?: boolean | AddEventListenerOptions,
  condition: boolean = true 
): void {
  const savedHandler = useRef<EventHandler<E>>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!condition) return; 

    const targetElement: T | Window = element?.current || window;
    if (!targetElement.addEventListener) return;

    const eventListener = (event: Event) => savedHandler.current && savedHandler.current(event as E);
    
    const events = Array.isArray(eventName) ? eventName : [eventName]; 
    events.forEach(e => targetElement.addEventListener(e, eventListener, options));

    return () => {
      events.forEach(e => targetElement.removeEventListener(e, eventListener, options));
    };
  }, [eventName, element, options, condition]);
}

export default useEventListener;
