declare function useTimeout(callback: () => void, delay: number | null): {
    isActive: boolean;
    reset: () => void;
    clear: () => void;
};
export { useTimeout };
//# sourceMappingURL=index.d.ts.map