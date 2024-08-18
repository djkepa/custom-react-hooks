import { renderHook, act } from '@testing-library/react';
import { useThrottle } from '../src/index';

jest.useFakeTimers();

describe('useThrottle Hook', () => {
  it('should initialize correctly', () => {
    const { result } = renderHook(() => useThrottle('test', 1000));
    expect(result.current).toBeUndefined();
  });

  it('should update the value after the specified limit', () => {
    const { result } = renderHook(() => useThrottle('test', 1000));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('test');
  });

  it('should set the value immediately if immediate flag is true', () => {
    const { result } = renderHook(() => useThrottle('test', 1000, true));
    expect(result.current).toBe('test');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
