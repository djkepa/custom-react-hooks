import { useState, useEffect, useCallback, RefObject } from 'react';

export interface MouseOptions {
  offsetX: number;
  offsetY: number;
  avoidEdges: boolean;
  tooltipWidth?: number;
  tooltipHeight?: number;
  relativeToWindow?: boolean;
}

export interface UseMouseState {
  x: number;
  y: number;
  position: 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft';
}

/**
 * `useMouse` is a hook that tracks the mouse position relative to a specified element.
 * It provides options for offset, edge avoidance, and custom dimensions for precise positioning.
 *
 * @param ref - A React ref to the element to track mouse position relative to.
 * @param options - Configuration options including offsets and edge avoidance.
 * @return - An object containing the mouse's x and y coordinates.
 */

function useMouse<T extends HTMLElement>(
  ref: RefObject<T>,
  options: MouseOptions = { offsetX: 10, offsetY: 10, avoidEdges: false, relativeToWindow: false },
): UseMouseState {
  const [mousePosition, setMousePosition] = useState<UseMouseState>({
    x: 0,
    y: 0,
    position: 'bottomRight',
  });

  const updateMousePosition = useCallback(
    (ev: MouseEvent) => {
      const {
        offsetX,
        offsetY,
        avoidEdges,
        tooltipWidth = 100,
        tooltipHeight = 50,
        relativeToWindow,
      } = options;

      let newX = ev.clientX + offsetX;
      let newY = ev.clientY + offsetY;
      let newPosition: UseMouseState['position'] = 'bottomRight';

      if (avoidEdges) {
        if (relativeToWindow) {
          if (newX + tooltipWidth > window.innerWidth) {
            newX = ev.clientX - tooltipWidth - offsetX;
            newPosition = 'bottomLeft';
          }
          if (newY + tooltipHeight > window.innerHeight) {
            newY = ev.clientY - tooltipHeight - offsetY;
            newPosition = newPosition === 'bottomLeft' ? 'topLeft' : 'topRight';
          }
        } else {
          const rect = ref.current?.getBoundingClientRect();
          if (rect) {
            if (newX + tooltipWidth > rect.right) {
              newX = ev.clientX - tooltipWidth - offsetX;
              newPosition = 'bottomLeft';
            }
            if (newY + tooltipHeight > rect.bottom) {
              newY = ev.clientY - tooltipHeight - offsetY;
              newPosition = newPosition === 'bottomLeft' ? 'topLeft' : 'topRight';
            }
          }
        }
      }

      setMousePosition({ x: newX, y: newY, position: newPosition });
    },
    [options, ref],
  );

  useEffect(() => {
    const handleMouseMove = (ev: MouseEvent) => {
      if (options.relativeToWindow || (ref.current && ref.current.contains(ev.target as Node))) {
        updateMousePosition(ev);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [updateMousePosition, options.relativeToWindow, ref]);

  return mousePosition;
}

export { useMouse };
