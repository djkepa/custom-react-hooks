/// <reference types="react" />
export interface UseVirtualOptions {
    itemHeight: number | ((index: number) => number);
    containerHeight: number;
    overscan?: number;
    scrollingDelay?: number;
    getItemKey?: (index: number) => string | number;
}
export interface VirtualItem {
    index: number;
    start: number;
    end: number;
    size: number;
    key: string | number;
}
export interface UseVirtualReturn {
    virtualItems: VirtualItem[];
    totalSize: number;
    scrollToIndex: (index: number, align?: 'start' | 'center' | 'end') => void;
    scrollToOffset: (offset: number) => void;
    isScrolling: boolean;
}
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
declare function useVirtual(count: number, parentRef: React.RefObject<HTMLElement>, options: UseVirtualOptions): UseVirtualReturn;
export { useVirtual };
