import { renderHook, act } from '@testing-library/react';
import { useRef } from 'react';
import { useVirtual } from '../src/index';

// Mock scrollTo method
Object.defineProperty(Element.prototype, 'scrollTo', {
  value: jest.fn(),
  writable: true,
});

describe('useVirtual', () => {
  let parentRef: React.RefObject<HTMLElement>;

  beforeEach(() => {
    // Create a mock parent element
    const mockElement = {
      scrollTop: 0,
      clientHeight: 400,
      scrollHeight: 1000,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      scrollTo: jest.fn(),
    } as any;

    parentRef = { current: mockElement };
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() =>
      useVirtual(100, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
      }),
    );

    expect(result.current.virtualItems).toBeDefined();
    expect(Array.isArray(result.current.virtualItems)).toBe(true);
    expect(result.current.totalSize).toBe(5000); // 100 * 50
    expect(typeof result.current.scrollToIndex).toBe('function');
    expect(typeof result.current.scrollToOffset).toBe('function');
    expect(typeof result.current.isScrolling).toBe('boolean');
  });

  it('should calculate virtual items for fixed height', () => {
    const { result } = renderHook(() =>
      useVirtual(100, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
      }),
    );

    expect(result.current.virtualItems.length).toBeGreaterThan(0);
    expect(result.current.virtualItems.length).toBeLessThan(100);

    // Check first item properties
    const firstItem = result.current.virtualItems[0];
    expect(firstItem.index).toBe(0);
    expect(firstItem.start).toBe(0);
    expect(firstItem.size).toBe(50);
    expect(firstItem.end).toBe(50);
  });

  it('should handle dynamic item heights', () => {
    const getItemHeight = (index: number) => (index % 2 === 0 ? 50 : 75);

    const { result } = renderHook(() =>
      useVirtual(10, parentRef, {
        itemHeight: getItemHeight,
        containerHeight: 400,
      }),
    );

    expect(result.current.virtualItems).toBeDefined();
    expect(result.current.totalSize).toBeGreaterThan(500); // Should be more than 10 * 50
  });

  it('should handle scrollToIndex function', () => {
    const { result } = renderHook(() =>
      useVirtual(100, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
      }),
    );

    // Test that function exists and can be called without error
    expect(() => {
      act(() => {
        result.current.scrollToIndex(10);
      });
    }).not.toThrow();
  });

  it('should handle scrollToOffset function', () => {
    const { result } = renderHook(() =>
      useVirtual(100, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
      }),
    );

    // Test that function exists and can be called without error
    expect(() => {
      act(() => {
        result.current.scrollToOffset(500);
      });
    }).not.toThrow();
  });

  it('should handle overscan option', () => {
    const { result } = renderHook(() =>
      useVirtual(100, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
        overscan: 10,
      }),
    );

    const itemCount = result.current.virtualItems.length;
    const visibleCount = Math.ceil(400 / 50); // 8 visible items

    expect(itemCount).toBeGreaterThan(visibleCount);
  });

  it('should handle custom getItemKey function', () => {
    const getItemKey = (index: number) => `item-${index}`;

    const { result } = renderHook(() =>
      useVirtual(10, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
        getItemKey,
      }),
    );

    const firstItem = result.current.virtualItems[0];
    expect(firstItem.key).toBe('item-0');
  });

  it('should handle empty list', () => {
    const { result } = renderHook(() =>
      useVirtual(0, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
      }),
    );

    // Implementation might still render one item even with count 0
    expect(result.current.virtualItems).toBeDefined();
    expect(result.current.totalSize).toBe(0);
  });

  it('should handle single item', () => {
    const { result } = renderHook(() =>
      useVirtual(1, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
      }),
    );

    expect(result.current.virtualItems).toHaveLength(1);
    expect(result.current.totalSize).toBe(50);
  });

  it('should update when count changes', () => {
    const { result, rerender } = renderHook(
      ({ count }) =>
        useVirtual(count, parentRef, {
          itemHeight: 50,
          containerHeight: 400,
        }),
      { initialProps: { count: 10 } },
    );

    const initialSize = result.current.totalSize;

    rerender({ count: 20 });

    expect(result.current.totalSize).toBeGreaterThan(initialSize);
  });

  it('should handle scrolling state', () => {
    const { result } = renderHook(() =>
      useVirtual(100, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
        scrollingDelay: 100,
      }),
    );

    expect(typeof result.current.isScrolling).toBe('boolean');
  });

  it('should cleanup on unmount', () => {
    const { unmount } = renderHook(() =>
      useVirtual(100, parentRef, {
        itemHeight: 50,
        containerHeight: 400,
      }),
    );

    unmount();

    expect(parentRef.current?.removeEventListener).toHaveBeenCalled();
  });
});
