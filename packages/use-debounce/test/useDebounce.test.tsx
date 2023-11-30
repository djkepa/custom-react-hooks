import { renderHook, act } from '@testing-library/react';
import useDebounce from '../src/index';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('debounces a function call', () => {
    const callback = jest.fn();
    const delay = 500;
    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      result.current[0](); // Trigger debounced function
      jest.advanceTimersByTime(delay - 100); // Advance timers but not enough to trigger the callback
    });

    act(() => {
      expect(callback).not.toHaveBeenCalled(); // Callback should not have been called yet
      jest.advanceTimersByTime(100); // Advance the remaining time
    });

    act(() => {
      expect(callback).toHaveBeenCalledTimes(1); // Now the callback should have been called
    });
  });

  it('cancels the debounced call', () => {
    const callback = jest.fn();
    const delay = 500;
    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      const debouncedFunction = result.current[0];
      debouncedFunction(); // Trigger debounced function
      const cancelDebounce = result.current[1];
      cancelDebounce(); // Cancel the debounced call immediately
    });

    act(() => {
      expect(callback).not.toHaveBeenCalled(); // Callback should not have been called after cancellation
      jest.runAllTimers(); // Ensure all timers are cleared
    });
  });
});
