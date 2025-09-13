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
    batchRequests?: boolean;
    batchDelay?: number;
    transform?: (data: any) => T;
}
declare class CacheManager {
    private cache;
    private batchQueue;
    get(key: string): {
        data: any;
        timestamp: number;
        promise?: Promise<any> | undefined;
    } | undefined;
    set(key: string, value: {
        data: any;
        timestamp: number;
        promise?: Promise<any>;
    }): void;
    getBatch(key: string): {
        resolve: Function;
        reject: Function;
    }[] | undefined;
    setBatch(key: string, value: Array<{
        resolve: Function;
        reject: Function;
    }>): void;
    deleteBatch(key: string): void;
    clear(): void;
}
declare const cacheManager: CacheManager;
export { cacheManager };
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