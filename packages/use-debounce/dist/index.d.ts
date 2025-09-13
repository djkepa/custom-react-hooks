declare function useDebounce<T extends (...args: any[]) => any>(callback: T, delay?: number, options?: {
    maxWait?: number;
    leading?: boolean;
    trailing?: boolean;
}): [T, () => void];
export { useDebounce };
//# sourceMappingURL=index.d.ts.map