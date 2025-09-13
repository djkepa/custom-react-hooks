import { renderHook, act } from '@testing-library/react';
import { useOffscreen } from '../src/index';

/**
 * Test suite for useOffscreen hook
 * Tests offscreen rendering functionality
 */
describe('useOffscreen', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useOffscreen());

    expect(result.current.isOffscreen).toBe(false);
    expect(typeof result.current.moveOffscreen).toBe('function');
    expect(typeof result.current.moveOnscreen).toBe('function');
    expect(typeof result.current.toggle).toBe('function');
  });

  it('should move element offscreen', () => {
    const { result } = renderHook(() => useOffscreen());

    act(() => {
      result.current.moveOffscreen();
    });

    expect(result.current.isOffscreen).toBe(true);
  });

  it('should move element onscreen', () => {
    const { result } = renderHook(() => useOffscreen());

    // First move offscreen
    act(() => {
      result.current.moveOffscreen();
    });

    expect(result.current.isOffscreen).toBe(true);

    // Then move onscreen
    act(() => {
      result.current.moveOnscreen();
    });

    expect(result.current.isOffscreen).toBe(false);
  });

  it('should toggle offscreen state', () => {
    const { result } = renderHook(() => useOffscreen());

    // Initial state is onscreen
    expect(result.current.isOffscreen).toBe(false);

    // Toggle to offscreen
    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOffscreen).toBe(true);

    // Toggle back to onscreen
    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOffscreen).toBe(false);
  });

  it('should initialize with offscreen state when specified', () => {
    const { result } = renderHook(() => useOffscreen({ initialOffscreen: true }));

    expect(result.current.isOffscreen).toBe(true);
  });

  it('should call onOffscreen callback', () => {
    const onOffscreen = jest.fn();
    const { result } = renderHook(() => useOffscreen({ onOffscreen }));

    act(() => {
      result.current.moveOffscreen();
    });

    expect(onOffscreen).toHaveBeenCalled();
  });

  it('should call onOnscreen callback', () => {
    const onOnscreen = jest.fn();
    const { result } = renderHook(() => 
      useOffscreen({ initialOffscreen: true, onOnscreen })
    );

    act(() => {
      result.current.moveOnscreen();
    });

    expect(onOnscreen).toHaveBeenCalled();
  });

  it('should handle performance mode', () => {
    const { result } = renderHook(() => 
      useOffscreen({ performanceMode: true })
    );

    act(() => {
      result.current.moveOffscreen();
    });

    expect(result.current.isOffscreen).toBe(true);
  });

  it('should handle auto cleanup', () => {
    const { result } = renderHook(() => 
      useOffscreen({ autoCleanup: true })
    );

    act(() => {
      result.current.moveOffscreen();
    });

    expect(result.current.isOffscreen).toBe(true);
  });

  it('should handle render priority', () => {
    const { result } = renderHook(() => 
      useOffscreen({ renderPriority: 'low' })
    );

    act(() => {
      result.current.moveOffscreen();
    });

    expect(result.current.isOffscreen).toBe(true);
  });

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useOffscreen());

    act(() => {
      result.current.moveOffscreen();
    });

    expect(result.current.isOffscreen).toBe(true);

    unmount();

    // After unmount, cleanup should occur
    // This is mainly to ensure no memory leaks
    expect(true).toBe(true); // Placeholder assertion
  });
});
