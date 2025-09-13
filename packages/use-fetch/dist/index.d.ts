export interface FetchOptions<T = any> extends RequestInit {
    manual?: boolean;
    timeout?: number;
    revalidateOnFocus?: boolean;
    revalidateOnReconnect?: boolean;
    refreshInterval?: number;
    dedupingInterval?: number;
    errorRetryCount?: number;
    errorRetryInterval?: number;
    fallbackData?: T;
    keepPreviousData?: boolean;
    compression?: boolean;
    batchRequests?: boolean;
    transform?: (data: any) => T;
}
declare function useFetch<T = unknown>(url: string | null, options?: FetchOptions<T>, cache?: Map<string, T> | null, globalStateSetter?: (data: T | null) => void): {
    data: T | null;
    loading: boolean;
    error: Error | null;
    isValidating: boolean;
    fetchData: () => Promise<void>;
    mutate: (data?: T | Promise<T> | ((current: T | null) => T | Promise<T>)) => Promise<T | null>;
    revalidate: () => Promise<void>;
};
export { useFetch };
//# sourceMappingURL=index.d.ts.map