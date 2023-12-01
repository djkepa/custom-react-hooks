import { useEffect, useRef, DependencyList } from 'react';

export type UseUpdateEffectOptions = {
  skipInitialEffect?: boolean;
  delay?: number;
  condition?: () => boolean;
};

/**
 * `useUpdateEffect` is similar to useEffect but it skips the effect on the initial render.
 * This hook is useful for running effects only in response to subsequent updates.
 *
 * @param effect - The effect function to run.
 * @param deps - The dependency list for the effect.
 * @param options - Options object including `skipInitialEffect`, `delay`, and `condition` for the effect.
 */

function useUpdateEffect(
  effect: () => void | (() => void),
  deps: DependencyList = [],
  options: UseUpdateEffectOptions = {},
) {
  const { skipInitialEffect = true, delay, condition } = options;
  const isInitialMount = useRef(skipInitialEffect);
  const effectTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const callback = () => {
      if (condition && !condition()) {
        return;
      }

      return effect();
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (delay !== undefined) {
      effectTimeout.current = setTimeout(callback, delay);
    } else {
      callback();
    }

    return () => {
      if (effectTimeout.current) {
        clearTimeout(effectTimeout.current);
      }
    };
  }, [delay, condition, ...deps]);

  return;
}

export default useUpdateEffect;
