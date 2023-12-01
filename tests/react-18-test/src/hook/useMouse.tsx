import { useState, useEffect, useCallback, useRef } from 'react';

export interface MouseOptions {
  offsetX: number;
  offsetY: number;
  avoidEdges: boolean;
  tooltipWidth?: number;
  tooltipHeight?: number;
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
  ref: React.RefObject<T>,
  options: MouseOptions = { offsetX: 10, offsetY: 10, avoidEdges: false },
) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const frameId = useRef<number | null>(null);

  const updateMousePosition = useCallback(
    (ev: MouseEvent) => {
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }

      frameId.current = requestAnimationFrame(() => {
        let newX = ev.clientX + options.offsetX;
        let newY = ev.clientY + options.offsetY;

        if (options.avoidEdges) {
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;
          const tooltipWidth = options.tooltipWidth || 100;
          const tooltipHeight = options.tooltipHeight || 50;

          if (newX + tooltipWidth > screenWidth) {
            newX = ev.clientX - tooltipWidth;
          }

          if (newY + tooltipHeight > screenHeight) {
            newY = ev.clientY - tooltipHeight;
          }
        }

        setMousePosition({ x: newX, y: newY });
      });
    },
    [options],
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) {
      return;
    }

    const handleMouseMove = (ev: MouseEvent) => {
      if (ref.current && ref.current.contains(ev.target as Node)) {
        updateMousePosition(ev);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [ref, updateMousePosition]);

  return mousePosition;
}

export default useMouse;
