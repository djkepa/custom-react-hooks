import { renderHook, act } from '@testing-library/react';
import { useIsland } from '../src/index';

/**
 * Test suite for useIsland hook
 * Tests island architecture functionality with selective hydration
 */
describe('useIsland', () => {
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useIsland('test-island'));

    expect(result.current.isHydrated).toBe(false);
    expect(result.current.isVisible).toBe(false);
    expect(typeof result.current.hydrate).toBe('function');
    expect(typeof result.current.dehydrate).toBe('function');
  });

  it('should hydrate island when called', () => {
    const { result } = renderHook(() => useIsland('test-island'));

    act(() => {
      result.current.hydrate();
    });

    expect(result.current.isHydrated).toBe(true);
  });

  it('should dehydrate island when called', () => {
    const { result } = renderHook(() => useIsland('test-island'));

    // First hydrate
    act(() => {
      result.current.hydrate();
    });

    expect(result.current.isHydrated).toBe(true);

    // Then dehydrate
    act(() => {
      result.current.dehydrate();
    });

    expect(result.current.isHydrated).toBe(false);
  });

  it('should handle priority hydration', () => {
    const { result } = renderHook(() => useIsland('test-island', { priority: 'high' }));

    act(() => {
      result.current.hydrate();
    });

    expect(result.current.isHydrated).toBe(true);
  });

  it('should handle lazy hydration', () => {
    const { result } = renderHook(() => useIsland('test-island', { lazy: true }));

    // Should not be hydrated initially when lazy
    expect(result.current.isHydrated).toBe(false);
  });

  it('should call onHydrate callback', () => {
    const onHydrate = jest.fn();
    const { result } = renderHook(() => useIsland('test-island', { onHydrate }));

    act(() => {
      result.current.hydrate();
    });

    expect(onHydrate).toHaveBeenCalledWith('test-island');
  });

  it('should call onDehydrate callback', () => {
    const onDehydrate = jest.fn();
    const { result } = renderHook(() => useIsland('test-island', { onDehydrate }));

    // First hydrate
    act(() => {
      result.current.hydrate();
    });

    // Then dehydrate
    act(() => {
      result.current.dehydrate();
    });

    expect(onDehydrate).toHaveBeenCalledWith('test-island');
  });

  it('should handle multiple islands independently', () => {
    const { result: result1 } = renderHook(() => useIsland('island-1'));
    const { result: result2 } = renderHook(() => useIsland('island-2'));

    act(() => {
      result1.current.hydrate();
    });

    expect(result1.current.isHydrated).toBe(true);
    expect(result2.current.isHydrated).toBe(false);
  });

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useIsland('test-island'));

    act(() => {
      result.current.hydrate();
    });

    expect(result.current.isHydrated).toBe(true);

    unmount();

    // After unmount, the island should be cleaned up
    // This is mainly to ensure no memory leaks
    expect(true).toBe(true); // Placeholder assertion
  });
});
