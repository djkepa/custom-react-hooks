"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useVirtual = void 0;
var react_1 = require("react");
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
    var itemHeight = options.itemHeight, containerHeight = options.containerHeight, _a = options.overscan, overscan = _a === void 0 ? 5 : _a, _b = options.scrollingDelay, scrollingDelay = _b === void 0 ? 150 : _b, _c = options.getItemKey, getItemKey = _c === void 0 ? function (index) { return index; } : _c;
    var _d = (0, react_1.useState)(0), scrollTop = _d[0], setScrollTop = _d[1];
    var _e = (0, react_1.useState)(false), isScrolling = _e[0], setIsScrolling = _e[1];
    var scrollingTimeoutRef = (0, react_1.useRef)(null);
    // Calculate item positions
    var itemSizeCache = (0, react_1.useRef)(new Map());
    var itemOffsetCache = (0, react_1.useRef)(new Map());
    var getItemSize = (0, react_1.useCallback)(function (index) {
        if (itemSizeCache.current.has(index)) {
            return itemSizeCache.current.get(index);
        }
        var size = typeof itemHeight === 'function' ? itemHeight(index) : itemHeight;
        itemSizeCache.current.set(index, size);
        return size;
    }, [itemHeight]);
    var getItemOffset = (0, react_1.useCallback)(function (index) {
        if (itemOffsetCache.current.has(index)) {
            return itemOffsetCache.current.get(index);
        }
        var offset = 0;
        for (var i = 0; i < index; i++) {
            offset += getItemSize(i);
        }
        itemOffsetCache.current.set(index, offset);
        return offset;
    }, [getItemSize]);
    // Calculate total size
    var totalSize = (0, react_1.useMemo)(function () {
        var total = 0;
        for (var i = 0; i < count; i++) {
            total += getItemSize(i);
        }
        return total;
    }, [count, getItemSize]);
    // Find visible range
    var visibleRange = (0, react_1.useMemo)(function () {
        if (count === 0) {
            return { start: 0, end: 0 };
        }
        var viewportStart = scrollTop;
        var viewportEnd = scrollTop + containerHeight;
        var start = 0;
        var end = count - 1;
        // Binary search for start index
        var low = 0;
        var high = count - 1;
        while (low <= high) {
            var mid = Math.floor((low + high) / 2);
            var offset = getItemOffset(mid);
            var size = getItemSize(mid);
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
            var mid = Math.floor((low + high) / 2);
            var offset = getItemOffset(mid);
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
    var virtualItems = (0, react_1.useMemo)(function () {
        var items = [];
        for (var i = visibleRange.start; i <= visibleRange.end; i++) {
            var start = getItemOffset(i);
            var size = getItemSize(i);
            var end = start + size;
            var key = getItemKey(i);
            items.push({
                index: i,
                start: start,
                end: end,
                size: size,
                key: key,
            });
        }
        return items;
    }, [visibleRange, getItemOffset, getItemSize, getItemKey]);
    // Scroll event handler
    var handleScroll = (0, react_1.useCallback)(function () {
        var element = parentRef.current;
        if (!element)
            return;
        var newScrollTop = element.scrollTop;
        setScrollTop(newScrollTop);
        // Set scrolling state
        setIsScrolling(true);
        // Clear existing timeout
        if (scrollingTimeoutRef.current) {
            clearTimeout(scrollingTimeoutRef.current);
        }
        // Set timeout to reset scrolling state
        scrollingTimeoutRef.current = setTimeout(function () {
            setIsScrolling(false);
        }, scrollingDelay);
    }, [scrollingDelay]);
    // Scroll to specific index
    var scrollToIndex = (0, react_1.useCallback)(function (index, align) {
        if (align === void 0) { align = 'start'; }
        var element = parentRef.current;
        if (!element || index < 0 || index >= count)
            return;
        var itemOffset = getItemOffset(index);
        var itemSize = getItemSize(index);
        var scrollTop;
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
    var scrollToOffset = (0, react_1.useCallback)(function (offset) {
        var element = parentRef.current;
        if (!element)
            return;
        element.scrollTop = Math.max(0, Math.min(offset, totalSize - containerHeight));
    }, [totalSize, containerHeight]);
    // Set up scroll listener
    (0, react_1.useEffect)(function () {
        var element = parentRef.current;
        if (!element)
            return;
        element.addEventListener('scroll', handleScroll, { passive: true });
        // Initial scroll position
        handleScroll();
        return function () {
            element.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
    // Clear cache when count changes
    (0, react_1.useEffect)(function () {
        itemSizeCache.current.clear();
        itemOffsetCache.current.clear();
    }, [count, itemHeight]);
    // Cleanup timeout on unmount
    (0, react_1.useEffect)(function () {
        return function () {
            if (scrollingTimeoutRef.current) {
                clearTimeout(scrollingTimeoutRef.current);
            }
        };
    }, []);
    return {
        virtualItems: virtualItems,
        totalSize: totalSize,
        scrollToIndex: scrollToIndex,
        scrollToOffset: scrollToOffset,
        isScrolling: isScrolling,
    };
}
exports.useVirtual = useVirtual;
