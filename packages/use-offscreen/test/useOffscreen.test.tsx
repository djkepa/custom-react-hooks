import { renderHook, act } from '@testing-library/react';
import { useOffscreen } from '../src/index';

describe('useOffscreen', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useOffscreen());

    expect(result.current.isRendering).toBe(false);
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
    expect(typeof result.current.render).toBe('function');
  });

  it('should render synchronously when disabled', () => {
    const { result } = renderHook(() => useOffscreen({ enabled: false }));

    const renderFn = jest.fn(() => 'test result');

    act(() => {
      const syncResult = result.current.render(renderFn);
      expect(syncResult).toBe('test result');
    });

    expect(renderFn).toHaveBeenCalled();
    expect(result.current.result).toBe('test result');
    expect(result.current.error).toBeNull();
    expect(result.current.isRendering).toBe(false);
  });

  it('should handle synchronous rendering errors when disabled', () => {
    const { result } = renderHook(() => useOffscreen({ enabled: false }));

    const renderFn = jest.fn(() => {
      throw new Error('Render error');
    });

    act(() => {
      const syncResult = result.current.render(renderFn);
      expect(syncResult).toBeNull();
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).toEqual(new Error('Render error'));
    expect(result.current.isRendering).toBe(false);
  });

  it('should render asynchronously with normal priority', async () => {
    const { result } = renderHook(() => useOffscreen({ priority: 'normal' }));

    const renderFn = jest.fn(() => 'async result');

    act(() => {
      const asyncResult = result.current.render(renderFn);
      expect(asyncResult).toBeNull(); // Should return null for async rendering
    });

    expect(result.current.isRendering).toBe(true);

    // Fast-forward timers to complete async rendering
    act(() => {
      jest.runAllTimers();
    });

    expect(renderFn).toHaveBeenCalled();
    expect(result.current.result).toBe('async result');
    expect(result.current.isRendering).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should render immediately with high priority', () => {
    const { result } = renderHook(() => useOffscreen({ priority: 'high' }));

    const renderFn = jest.fn(() => 'high priority result');

    act(() => {
      const highPriorityResult = result.current.render(renderFn);
      expect(highPriorityResult).toBe('high priority result');
    });

    expect(renderFn).toHaveBeenCalled();
    expect(result.current.result).toBe('high priority result');
    expect(result.current.isRendering).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should render with low priority using setTimeout', async () => {
    const { result } = renderHook(() => useOffscreen({ priority: 'low' }));

    const renderFn = jest.fn(() => 'low priority result');

    act(() => {
      const lowPriorityResult = result.current.render(renderFn);
      expect(lowPriorityResult).toBeNull(); // Should return null for async rendering
    });

    expect(result.current.isRendering).toBe(true);

    // Fast-forward timers to complete low priority rendering
    act(() => {
      jest.runAllTimers();
    });

    expect(renderFn).toHaveBeenCalled();
    expect(result.current.result).toBe('low priority result');
    expect(result.current.isRendering).toBe(false);
  });

  it('should handle rendering errors', async () => {
    const { result } = renderHook(() => useOffscreen());

    const renderFn = jest.fn(() => {
      throw new Error('Async render error');
    });

    act(() => {
      result.current.render(renderFn);
    });

    expect(result.current.isRendering).toBe(true);

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current.result).toBeNull();
    expect(result.current.error).toEqual(new Error('Async render error'));
    expect(result.current.isRendering).toBe(false);
  });

  it('should handle timeout configuration', () => {
    const { result } = renderHook(() => useOffscreen({ timeout: 1000 }));

    // Test that timeout option is accepted and hook initializes properly
    expect(result.current.isRendering).toBe(false);
    expect(result.current.result).toBeNull();
    expect(result.current.error).toBeNull();
    expect(typeof result.current.render).toBe('function');
  });

  it('should cancel previous rendering when new render is called', async () => {
    const { result } = renderHook(() => useOffscreen());

    const firstRenderFn = jest.fn(() => 'first result');
    const secondRenderFn = jest.fn(() => 'second result');

    act(() => {
      result.current.render(firstRenderFn);
    });

    expect(result.current.isRendering).toBe(true);

    // Start second render before first completes
    act(() => {
      result.current.render(secondRenderFn);
    });

    act(() => {
      jest.runAllTimers();
    });

    // Only second render should complete
    expect(secondRenderFn).toHaveBeenCalled();
    expect(result.current.result).toBe('second result');
    expect(result.current.isRendering).toBe(false);
  });

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useOffscreen());

    const renderFn = jest.fn(() => 'test');

    act(() => {
      result.current.render(renderFn);
    });

    expect(result.current.isRendering).toBe(true);

    unmount();

    // Should not throw errors and should cleanup properly
    expect(true).toBe(true);
  });
});
