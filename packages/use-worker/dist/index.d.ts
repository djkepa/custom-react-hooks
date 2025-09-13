export interface UseWorkerOptions {
    onMessage?: (data: any) => void;
    onError?: (error: ErrorEvent) => void;
    timeout?: number;
}
export interface UseWorkerReturn {
    postMessage: (message: any, transfer?: Transferable[]) => void;
    terminate: () => void;
    data: any;
    error: string | null;
    isLoading: boolean;
}
/**
 * `useWorker` is a hook for managing Web Workers in React applications.
 * It provides an easy way to offload heavy computations to background threads,
 * with automatic cleanup and message handling.
 *
 * @param workerScript - The worker script URL or function
 * @param options - Configuration options for the worker
 * @return - An object containing:
 *   - `postMessage`: Function to send messages to the worker
 *   - `terminate`: Function to terminate the worker
 *   - `data`: Latest data received from the worker
 *   - `error`: Error message if worker fails
 *   - `isLoading`: Boolean indicating if worker is processing
 */
declare function useWorker(workerScript: string | ((data: any) => any), options?: UseWorkerOptions): UseWorkerReturn;
export { useWorker };
//# sourceMappingURL=index.d.ts.map