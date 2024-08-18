export interface ClipboardState {
    success: boolean;
    error: string | null;
}
declare function useClipboard(): {
    copyToClipboard: (text: string) => Promise<void>;
    pasteFromClipboard: () => Promise<string | undefined>;
    state: ClipboardState;
};
export { useClipboard };
//# sourceMappingURL=index.d.ts.map