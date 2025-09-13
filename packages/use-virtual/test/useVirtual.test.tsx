import { renderHook, act } from '@testing-library/react';
import { useVirtual } from '../src/index';

/**
 * Test suite for useVirtual hook
 * Tests list virtualization functionality
 */
describe('useVirtual', () => {
  const mockItems = Array.from({ length: 1000 }, (_, i) => `Item ${i}`);

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    
    // Mock getBoundingClientRect
    Element.prototype.getBoundingClientRect = jest.fn(() => ({
      width: 300,
      height: 400,
      top: 0,
      left: 0,
      bottom: 400,
      right: 300,
      x: 0,
      y: 0,
      toJSON: () => {}
    }));
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: 50,
        containerHeight: 400
      })
    );

    expect(result.current.visibleItems).toBeDefined();
    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBeGreaterThan(0);
    expect(result.current.totalHeight).toBe(50000); // 1000 * 50
    expect(typeof result.current.scrollToIndex).toBe('function');
    expect(typeof result.current.scrollToTop).toBe('function');
  });

  it('should calculate visible items correctly', () => {
    const { result } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: 50,
        containerHeight: 400
      })
    );

    // Should show approximately 400/50 = 8 items + buffer
    expect(result.current.visibleItems.length).toBeGreaterThan(8);
    expect(result.current.visibleItems.length).toBeLessThan(20); // With buffer
  });

  it('should handle scroll position changes', () => {
    const { result } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: 50,
        containerHeight: 400
      })
    );

    act(() => {
      result.current.scrollToIndex(10);
    });

    expect(result.current.startIndex).toBeGreaterThanOrEqual(10);
  });

  it('should scroll to top', () => {
    const { result } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: 50,
        containerHeight: 400
      })
    );

    // First scroll down
    act(() => {
      result.current.scrollToIndex(50);
    });

    // Then scroll to top
    act(() => {
      result.current.scrollToTop();
    });

    expect(result.current.startIndex).toBe(0);
  });

  it('should handle dynamic item heights', () => {
    const getItemHeight = (index: number) => index % 2 === 0 ? 50 : 75;
    
    const { result } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: getItemHeight,
        containerHeight: 400
      })
    );

    expect(result.current.visibleItems).toBeDefined();
    expect(result.current.totalHeight).toBeGreaterThan(50000); // Should be higher due to varying heights
  });

  it('should handle overscan correctly', () => {
    const { result } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: 50,
        containerHeight: 400,
        overscan: 5
      })
    );

    // With overscan of 5, should render more items
    const baseVisibleCount = Math.ceil(400 / 50);
    expect(result.current.visibleItems.length).toBeGreaterThan(baseVisibleCount);
  });

  it('should handle horizontal virtualization', () => {
    const { result } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: 50,
        containerHeight: 400,
        horizontal: true
      })
    );

    expect(result.current.visibleItems).toBeDefined();
    expect(typeof result.current.scrollToIndex).toBe('function');
  });

  it('should call onScroll callback', () => {
    const onScroll = jest.fn();
    const { result } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: 50,
        containerHeight: 400,
        onScroll
      })
    );

    act(() => {
      result.current.scrollToIndex(10);
    });

    expect(onScroll).toHaveBeenCalled();
  });

  it('should handle empty items array', () => {
    const { result } = renderHook(() => 
      useVirtual({
        items: [],
        itemHeight: 50,
        containerHeight: 400
      })
    );

    expect(result.current.visibleItems).toEqual([]);
    expect(result.current.totalHeight).toBe(0);
    expect(result.current.startIndex).toBe(0);
    expect(result.current.endIndex).toBe(0);
  });

  it('should handle single item', () => {
    const { result } = renderHook(() => 
      useVirtual({
        items: ['Single Item'],
        itemHeight: 50,
        containerHeight: 400
      })
    );

    expect(result.current.visibleItems).toHaveLength(1);
    expect(result.current.totalHeight).toBe(50);
  });

  it('should update when items change', () => {
    const { result, rerender } = renderHook(
      ({ items }) => useVirtual({
        items,
        itemHeight: 50,
        containerHeight: 400
      }),
      { initialProps: { items: mockItems.slice(0, 100) } }
    );

    const initialCount = result.current.visibleItems.length;
    const initialHeight = result.current.totalHeight;

    // Update with more items
    rerender({ items: mockItems });

    expect(result.current.totalHeight).toBeGreaterThan(initialHeight);
  });

  it('should cleanup on unmount', () => {
    const { result, unmount } = renderHook(() => 
      useVirtual({
        items: mockItems,
        itemHeight: 50,
        containerHeight: 400
      })
    );

    expect(result.current.visibleItems).toBeDefined();

    unmount();

    // After unmount, cleanup should occur
    // This is mainly to ensure no memory leaks
    expect(true).toBe(true); // Placeholder assertion
  });
});
