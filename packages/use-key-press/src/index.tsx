import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * `useKeyPress` is a hook that tracks if a specified key is being pressed.
 * It's useful for handling keyboard shortcuts or navigation.
 *
 * @param targetKey - The key to monitor.
 * @param options - (Optional) Additional options including debounce timing and global scope setting.
 * @return - A boolean state indicating if the target key is currently pressed.
 */

function useKeyPress(
  targetKey: string,
  options: { debounce?: number; targetElement?: EventTarget | null } = {},
) {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  const debounceTimeout = useRef<number | null>(null);
  const { debounce = 0, targetElement = null } = options;

  const handleKeyEvent = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        debounceTimeout.current = window.setTimeout(() => {
          setKeyPressed(event.type === 'keydown');
        }, debounce);
      }
    },
    [targetKey, debounce],
  );

  useEffect(() => {
    const target: EventTarget = targetElement || window;

    target.addEventListener('keydown', handleKeyEvent);
    target.addEventListener('keyup', handleKeyEvent);

    return () => {
      target.removeEventListener('keydown', handleKeyEvent);
      target.removeEventListener('keyup', handleKeyEvent);
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [handleKeyEvent, targetElement]);

  return keyPressed;
}

export default useKeyPress;
