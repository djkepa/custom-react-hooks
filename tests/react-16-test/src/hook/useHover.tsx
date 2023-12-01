import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * `useHover` is a hook to detect if an element is being hovered over.
 * It returns a ref to attach to the element and a state indicating if it's hovered.
 *
 * @return - An object containing a ref to the element and a boolean state `isHovered`.
 */

function useHover<T extends HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T | null>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  return { ref, isHovered };
}

export default useHover;