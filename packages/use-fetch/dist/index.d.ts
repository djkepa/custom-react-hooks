interface FetchOptions extends RequestInit {
    manual?: boolean;
    timeout?: number;
}
declare function useFetch<T = unknown>(url: string, options?: FetchOptions, cache?: Map<string, T> | null, globalStateSetter?: (data: T | null) => void): {
    data: T | null;
    loading: boolean;
    error: Error | null;
    fetchData: () => Promise<void>;
};
export default useFetch;
//# sourceMappingURL=index.d.ts.map