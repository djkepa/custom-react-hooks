import { useState, useEffect, useCallback, useLayoutEffect } from 'react';

export interface Size {
  width: number | undefined;
  height: number | undefined;
}

/**
 * `useElementSize` is a hook to measure the size of a DOM element.
 * It tracks the width and height of the element and updates them on window resize or element changes.
 *
 * @param ref - The React ref object attached to the element to measure.
 * @return - An object containing the `width` and `height` of the element.
 */

function useElementSize<T extends HTMLElement>(ref: React.RefObject<T>): Size {
  const [size, setSize] = useState<Size>({ width: undefined, height: undefined });

  const updateSize = useCallback(() => {
    if (ref.current) {
      const newWidth = ref.current.offsetWidth;
      const newHeight = ref.current.offsetHeight;

      // Only update state if the size has changed
      if (newWidth !== size.width || newHeight !== size.height) {
        setSize({ width: newWidth, height: newHeight });
      }
    }
  }, [ref, size.width, size.height]);

  useLayoutEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [updateSize]);

  return size;
}

export default useElementSize;
