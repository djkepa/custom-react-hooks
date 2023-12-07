import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

/**
 * `useUpdateEffect` is similar to useEffect but it skips the effect on the initial render.
 * This hook is useful for running effects only in response to subsequent updates.
 *
 * @param effect - The effect function to run when dependencies update.
 * @param deps - The dependency list for the effect. The effect will only re-run if these dependencies change.
 */

export function useUpdateEffect(effect: EffectCallback, deps: DependencyList = []): void {
  const useFirstMountState = (): boolean => {
    const isFirst = useRef(true);

    if (isFirst.current) {
      isFirst.current = false;
      return true;
    }

    return isFirst.current;
  };

  const isFirstMount = useFirstMountState();

  useEffect(() => {
    if (!isFirstMount) {
      return effect();
    }
  }, deps);
}

export default useUpdateEffect;
