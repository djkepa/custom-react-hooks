export interface ClipboardState {
    success: boolean;
    error: string | null;
}
export interface UseClipboardOptions {
    readOnMount?: boolean;
    pollingInterval?: number;
    onClipboardChange?: (content: string) => void;
}
declare function useClipboard(options?: UseClipboardOptions): {
    copyToClipboard: (text: string) => Promise<void>;
    pasteFromClipboard: () => Promise<string>;
    state: ClipboardState;
    clipboardContent: string;
    isReading: boolean;
    refreshClipboard: () => Promise<string>;
    clearClipboard: () => Promise<void>;
    hasContent: boolean;
};
export { useClipboard };
//# sourceMappingURL=index.d.ts.map