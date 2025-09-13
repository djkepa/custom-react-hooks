/// <reference types="react" />
export type EventHandler<E extends Event = Event> = (event: E) => void;
declare function useEventListener<T extends HTMLElement = HTMLDivElement, E extends Event = Event>(eventName: string | string[], handler: EventHandler<E>, element?: React.RefObject<T>, options?: boolean | AddEventListenerOptions, condition?: boolean): void;
export { useEventListener };
//# sourceMappingURL=index.d.ts.map