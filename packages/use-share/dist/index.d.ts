export interface ShareData {
    title?: string;
    text?: string;
    url?: string;
    files?: File[];
}
export interface UseShareOptions {
    onSuccess?: () => void;
    onError?: (error: Error) => void;
    fallbackCopy?: boolean;
}
export interface UseShareReturn {
    share: (data: ShareData) => Promise<void>;
    isSupported: boolean;
    isSharing: boolean;
    error: string | null;
}
/**
 * `useShare` is a hook for Web Share API with fallback support.
 * It provides native sharing capabilities on supported devices and browsers,
 * with automatic fallback to clipboard copying when native sharing is not available.
 *
 * @param options - Configuration options for sharing behavior
 * @return - An object containing:
 *   - `share`: Function to trigger sharing
 *   - `isSupported`: Boolean indicating if Web Share API is supported
 *   - `isSharing`: Boolean indicating if sharing is in progress
 *   - `error`: Error message if sharing fails
 */
declare function useShare(options?: UseShareOptions): UseShareReturn;
export { useShare };
//# sourceMappingURL=index.d.ts.map