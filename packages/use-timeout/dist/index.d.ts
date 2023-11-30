declare function useTimeout(callback: () => void, delay: number | null): {
    isActive: boolean;
    reset: () => void;
    clear: () => void;
};
export default useTimeout;
//# sourceMappingURL=index.d.ts.map