export type Status = 'idle' | 'pending' | 'success' | 'error';
export type AsyncFunction<T> = () => Promise<T>;
export interface UseAsyncReturn<T> {
    execute: () => void;
    status: Status;
    value: T | null;
    error: Error | null;
}
declare function useAsync<T>(asyncFunction: AsyncFunction<T>, immediate?: boolean): UseAsyncReturn<T>;
export { useAsync };
//# sourceMappingURL=index.d.ts.map