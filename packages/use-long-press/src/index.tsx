import { useCallback, useEffect, useRef } from 'react';

export interface LongPressOptions {
  threshold?: number;
  onStart?: () => void;
  onFinish?: () => void;
  onCancel?: () => void;
}

/**
 * `useLongPress` is a hook for detecting long press events on an element.
 * It can trigger a callback after a specified threshold of time and provides onStart, onFinish, and onCancel events.
 *
 * @param callback - The function to execute when a long press is detected.
 * @param options - (Optional) Configuration options including threshold time and additional event handlers.
 * @return - Binding functions for mouse and touch events to attach to the element.
 */

function useLongPress(callback: () => void, options: LongPressOptions = {}) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const isLongPressTriggered = useRef(false);

  const start = useCallback(() => {
    onStart?.();
    isLongPressTriggered.current = false;
    timer.current = setTimeout(() => {
      callback();
      onFinish?.();
      isLongPressTriggered.current = true;
    }, threshold);
  }, [callback, threshold, onStart, onFinish]);

  const clear = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = undefined;
  }, []);

  const cancel = useCallback(() => {
    clear();
    if (!isLongPressTriggered.current) {
      onCancel?.();
    }
  }, [clear, onCancel]);

  const onMouseDown = useCallback(() => {
    start();
  }, [start]);

  const onMouseUp = useCallback(() => {
    if (timer.current) {
      cancel();
    }
  }, [cancel]);

  const onMouseLeave = useCallback(() => {
    cancel();
  }, [cancel]);

  const onTouchStart = useCallback(() => {
    start();
  }, [start]);

  const onTouchEnd = useCallback(() => {
    if (timer.current) {
      cancel();
    }
  }, [cancel]);

  useEffect(() => {
    return () => {
      clear();
    };
  }, [clear]);

  return {
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
  };
}

export default useLongPress;
