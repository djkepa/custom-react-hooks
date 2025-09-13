import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
/**
 * `useVirtual` is a hook for virtualizing large lists to improve performance.
 * It only renders visible items plus a small buffer, significantly reducing
 * DOM nodes and improving scroll performance for large datasets.
 *
 * @param count - Total number of items in the list
 * @param parentRef - Ref to the scrollable container element
 * @param options - Configuration options for virtualization
 * @return - An object containing virtual items and control functions
 */
function useVirtual(count, parentRef, options) {
    const { itemHeight, containerHeight, overscan = 5, scrollingDelay = 150, getItemKey = (index) => index, } = options;
    const [scrollTop, setScrollTop] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollingTimeoutRef = useRef(null);
    // Calculate item positions
    const itemSizeCache = useRef(new Map());
    const itemOffsetCache = useRef(new Map());
    const getItemSize = useCallback((index) => {
        if (itemSizeCache.current.has(index)) {
            return itemSizeCache.current.get(index);
        }
        const size = typeof itemHeight === 'function' ? itemHeight(index) : itemHeight;
        itemSizeCache.current.set(index, size);
        return size;
    }, [itemHeight]);
    const getItemOffset = useCallback((index) => {
        if (itemOffsetCache.current.has(index)) {
            return itemOffsetCache.current.get(index);
        }
        let offset = 0;
        for (let i = 0; i < index; i++) {
            offset += getItemSize(i);
        }
        itemOffsetCache.current.set(index, offset);
        return offset;
    }, [getItemSize]);
    // Calculate total size
    const totalSize = useMemo(() => {
        let total = 0;
        for (let i = 0; i < count; i++) {
            total += getItemSize(i);
        }
        return total;
    }, [count, getItemSize]);
    // Find visible range
    const visibleRange = useMemo(() => {
        if (count === 0) {
            return { start: 0, end: 0 };
        }
        const viewportStart = scrollTop;
        const viewportEnd = scrollTop + containerHeight;
        let start = 0;
        let end = count - 1;
        // Binary search for start index
        let low = 0;
        let high = count - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const offset = getItemOffset(mid);
            const size = getItemSize(mid);
            if (offset + size <= viewportStart) {
                low = mid + 1;
            }
            else if (offset >= viewportStart) {
                high = mid - 1;
            }
            else {
                start = mid;
                break;
            }
        }
        start = Math.max(0, low - 1);
        // Binary search for end index
        low = start;
        high = count - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const offset = getItemOffset(mid);
            if (offset <= viewportEnd) {
                low = mid + 1;
            }
            else {
                high = mid - 1;
            }
        }
        end = Math.min(count - 1, high);
        return {
            start: Math.max(0, start - overscan),
            end: Math.min(count - 1, end + overscan),
        };
    }, [scrollTop, containerHeight, count, overscan, getItemOffset, getItemSize]);
    // Generate virtual items
    const virtualItems = useMemo(() => {
        const items = [];
        for (let i = visibleRange.start; i <= visibleRange.end; i++) {
            const start = getItemOffset(i);
            const size = getItemSize(i);
            const end = start + size;
            const key = getItemKey(i);
            items.push({
                index: i,
                start,
                end,
                size,
                key,
            });
        }
        return items;
    }, [visibleRange, getItemOffset, getItemSize, getItemKey]);
    // Scroll event handler
    const handleScroll = useCallback(() => {
        const element = parentRef.current;
        if (!element)
            return;
        const newScrollTop = element.scrollTop;
        setScrollTop(newScrollTop);
        // Set scrolling state
        setIsScrolling(true);
        // Clear existing timeout
        if (scrollingTimeoutRef.current) {
            clearTimeout(scrollingTimeoutRef.current);
        }
        // Set timeout to reset scrolling state
        scrollingTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
        }, scrollingDelay);
    }, [scrollingDelay]);
    // Scroll to specific index
    const scrollToIndex = useCallback((index, align = 'start') => {
        const element = parentRef.current;
        if (!element || index < 0 || index >= count)
            return;
        const itemOffset = getItemOffset(index);
        const itemSize = getItemSize(index);
        let scrollTop;
        switch (align) {
            case 'start':
                scrollTop = itemOffset;
                break;
            case 'end':
                scrollTop = itemOffset + itemSize - containerHeight;
                break;
            case 'center':
                scrollTop = itemOffset + itemSize / 2 - containerHeight / 2;
                break;
            default:
                scrollTop = itemOffset;
        }
        element.scrollTop = Math.max(0, Math.min(scrollTop, totalSize - containerHeight));
    }, [count, containerHeight, totalSize, getItemOffset, getItemSize]);
    // Scroll to specific offset
    const scrollToOffset = useCallback((offset) => {
        const element = parentRef.current;
        if (!element)
            return;
        element.scrollTop = Math.max(0, Math.min(offset, totalSize - containerHeight));
    }, [totalSize, containerHeight]);
    // Set up scroll listener
    useEffect(() => {
        const element = parentRef.current;
        if (!element)
            return;
        element.addEventListener('scroll', handleScroll, { passive: true });
        // Initial scroll position
        handleScroll();
        return () => {
            element.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    // Clear cache when count changes
    useEffect(() => {
        itemSizeCache.current.clear();
        itemOffsetCache.current.clear();
    }, [count, itemHeight]);
    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (scrollingTimeoutRef.current) {
                clearTimeout(scrollingTimeoutRef.current);
            }
        };
    }, []);
    return {
        virtualItems,
        totalSize,
        scrollToIndex,
        scrollToOffset,
        isScrolling,
    };
}
export { useVirtual };
//# sourceMappingURL=index.js.map