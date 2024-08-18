import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../src/index';

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
      result.current[0]();
      jest.advanceTimersByTime(delay - 100);
    });

    act(() => {
      expect(callback).not.toHaveBeenCalled();
      jest.advanceTimersByTime(100);
    });

    act(() => {
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  it('cancels the debounced call', () => {
    const callback = jest.fn();
    const delay = 500;
    const { result } = renderHook(() => useDebounce(callback, delay));

    act(() => {
      const debouncedFunction = result.current[0];
      debouncedFunction();
      const cancelDebounce = result.current[1];
      cancelDebounce();
    });

    act(() => {
      expect(callback).not.toHaveBeenCalled();
      jest.runAllTimers();
    });
  });
});
