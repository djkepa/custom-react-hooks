import { renderHook, act, waitFor } from '@testing-library/react';
import useWindowSize from '../../../../packages/use-window-size/dist/index';

// Define a helper to trigger the window resize event
const triggerResize = (width: any, height: any) => {
  // Set the window size
  window.innerWidth = width;
  window.innerHeight = height;
  // Dispatch the event
  window.dispatchEvent(new Event('resize'));
};

describe('useWindowSize', () => {
  it('initializes with the current window size', () => {
    // Set the initial window size
    window.innerWidth = 1024;
    window.innerHeight = 768;

    const { result } = renderHook(() => useWindowSize());

    // Initial window size should be returned
    expect(result.current).toEqual({ width: 1024, height: 768 });
  });

  it('updates size on window resize', async () => {
    const { result } = renderHook(() => useWindowSize());

    // Trigger window resize
    act(() => {
      triggerResize(500, 500);
    });

    // Wait for the hook to update its state after the resize event
    await waitFor(() => {
      // Now we expect the size to be updated
      expect(result.current).toEqual({ width: 500, height: 500 });
    });
  });

  it('debounces the resize event', () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useWindowSize(500));

    // Trigger a resize event
    act(() => {
      triggerResize(600, 600);
      jest.advanceTimersByTime(500); // Advance the timers by the debounce delay
    });

    expect(result.current).toEqual({ width: 600, height: 600 });

    jest.useRealTimers();
  });
});
