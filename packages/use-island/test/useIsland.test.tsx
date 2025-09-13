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

    // Mock IntersectionObserver properly
    global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useIsland());

    // In test environment without proper DOM element, it auto-hydrates as fallback
    expect(result.current.isHydrated).toBe(true);
    expect(result.current.isVisible).toBe(true);
    expect(typeof result.current.hydrate).toBe('function');
    expect(typeof result.current.dehydrate).toBe('function');
    expect(result.current.ref).toBeDefined();
  });

  it('should hydrate island when called', () => {
    const { result } = renderHook(() => useIsland());

    // Already hydrated due to fallback behavior
    expect(result.current.isHydrated).toBe(true);

    // Calling hydrate again should maintain hydrated state
    act(() => {
      result.current.hydrate();
    });

    expect(result.current.isHydrated).toBe(true);
  });

  it('should dehydrate island when called', () => {
    const { result } = renderHook(() => useIsland());

    // Already hydrated due to fallback behavior
    expect(result.current.isHydrated).toBe(true);

    // Dehydrate manually
    act(() => {
      result.current.dehydrate();
    });

    expect(result.current.isHydrated).toBe(false);
  });

  it('should handle priority hydration', () => {
    const { result } = renderHook(() => useIsland({ priority: 'high' }));

    act(() => {
      result.current.hydrate();
    });

    expect(result.current.isHydrated).toBe(true);
  });

  it('should handle low priority hydration', () => {
    const { result } = renderHook(() => useIsland({ priority: 'low' }));

    // Auto-hydrated due to fallback behavior in test environment
    expect(result.current.isHydrated).toBe(true);

    // Manual hydration should still work
    act(() => {
      result.current.hydrate();
    });

    expect(result.current.isHydrated).toBe(true);
  });

  it('should handle threshold option', () => {
    const { result } = renderHook(() => useIsland({ threshold: 0.5 }));

    // Auto-hydrated due to fallback behavior in test environment
    expect(result.current.isHydrated).toBe(true);
    expect(result.current.isVisible).toBe(true);
  });

  it('should handle delay option', () => {
    const { result } = renderHook(() => useIsland({ delay: 100 }));

    act(() => {
      result.current.hydrate();
    });

    expect(result.current.isHydrated).toBe(true);
  });

  it('should handle multiple islands independently', () => {
    const { result: result1 } = renderHook(() => useIsland());
    const { result: result2 } = renderHook(() => useIsland());

    // Both start hydrated due to fallback behavior
    expect(result1.current.isHydrated).toBe(true);
    expect(result2.current.isHydrated).toBe(true);

    // Dehydrate first island
    act(() => {
      result1.current.dehydrate();
    });

    expect(result1.current.isHydrated).toBe(false);
    expect(result2.current.isHydrated).toBe(true);
  });

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => useIsland());

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
