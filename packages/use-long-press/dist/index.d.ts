export interface LongPressOptions {
    threshold?: number;
    onStart?: () => void;
    onFinish?: () => void;
    onCancel?: () => void;
}
declare function useLongPress(callback: () => void, options?: LongPressOptions): {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onTouchEnd: () => void;
};
export { useLongPress };
//# sourceMappingURL=index.d.ts.map