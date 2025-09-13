/**
 * `usePrevious` is a hook that stores the previous value of a state or prop.
 * It's useful for comparing current and previous values in effects or for
 * implementing animations and transitions based on value changes.
 *
 * @param value - The current value to track
 * @return - The previous value (undefined on first render)
 */
declare function usePrevious<T>(value: T): T | undefined;
export { usePrevious };
//# sourceMappingURL=index.d.ts.map