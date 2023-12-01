import { useEffect } from 'react';

/**
 * `useEffectOnce` is a custom hook that runs a side-effect only once after the initial render.
 * It's similar to useEffect, but it guarantees that the effect runs only once.
 *
 * @param effect - The effect function to run. Can optionally return a cleanup function.
 */

function useEffectOnce(effect: () => void | (() => void | undefined)) {
  useEffect(() => {
    const cleanupFunction = effect();

    return () => {
      if (typeof cleanupFunction === 'function') {
        cleanupFunction();
      }
    };
  }, []);
}

export default useEffectOnce;
