declare function useFetch<T = unknown>(url: string, options?: RequestInit & {
    manual?: boolean;
    timeout?: any;
}, cache?: Map<string, T> | null, globalStateSetter?: (data: T | null) => void): {
    data: T | null;
    loading: boolean;
    error: Error | null;
    fetchData: () => Promise<void>;
};
export default useFetch;
//# sourceMappingURL=index.d.ts.map