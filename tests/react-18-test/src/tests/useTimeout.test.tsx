import { renderHook, act } from '@testing-library/react';
import useTimeout from '../../../../packages/use-timeout/src/index';

jest.useFakeTimers();

describe('useTimeout Hook', () => {
  it('should call the callback after specified delay', () => {
    const callback = jest.fn();
    renderHook(() => useTimeout(callback, 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(callback).toHaveBeenCalled();
  });

  it('should clear the timeout', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => {
      result.current.clear();
      jest.advanceTimersByTime(1000);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should reset the timeout', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useTimeout(callback, 1000));

    act(() => {
      jest.advanceTimersByTime(500); // Halfway through the timeout
    });

    act(() => {
      result.current.reset(); // Reset the timeout
    });

    act(() => {
      jest.advanceTimersByTime(1000); // Advance by the full delay after reset
    });

    expect(callback).toHaveBeenCalled();
  });

  // Clean up
  afterEach(() => {
    jest.clearAllTimers();
  });
});
