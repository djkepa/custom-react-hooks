import { renderHook, act, waitFor } from '@testing-library/react';
import { useWindowSize } from '../src/index';

const triggerResize = (width: number, height: number) => {
  window.innerWidth = width;
  window.innerHeight = height;
  window.dispatchEvent(new Event('resize'));
};

describe('useWindowSize', () => {
  it('initializes with the current window size', () => {
    window.innerWidth = 1024;
    window.innerHeight = 768;

    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it('updates size on window resize', async () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      triggerResize(500, 500);
    });

    await waitFor(() => {
      expect(result.current).toEqual({ width: 500, height: 500 });
    });
  });

  it('debounces the resize event', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useWindowSize(500));

    act(() => {
      triggerResize(600, 600);
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual({ width: 600, height: 600 });

    jest.useRealTimers();
  });
});
