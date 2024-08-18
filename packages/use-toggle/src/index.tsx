import { useState, useCallback } from 'react';

/**
 * `useToggle` is a hook for managing boolean state, typically for toggling UI components.
 * It provides a simple API to toggle a value between true and false, with optional callback support.
 *
 * @param initialValue - The initial boolean value.
 * @param onToggle - (Optional) A callback function that receives the new value after each toggle.
 * @return - An object containing the current value and functions to toggle the value and set it explicitly.
 */

function useToggle(initialValue: boolean = false, onToggle?: (newValue: boolean) => void) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => {
      const newValue = !v;
      if (onToggle) {
        onToggle(newValue);
      }
      return newValue;
    });
  }, [onToggle]);

  const setTrue = useCallback(() => {
    setValue(true);
    if (onToggle) {
      onToggle(true);
    }
  }, [onToggle]);

  const setFalse = useCallback(() => {
    setValue(false);
    if (onToggle) {
      onToggle(false);
    }
  }, [onToggle]);

  return { value, toggle, setTrue, setFalse };
}

export { useToggle };
