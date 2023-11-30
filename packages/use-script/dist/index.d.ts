type ScriptStatus = 'idle' | 'loading' | 'ready' | 'error';
type ScriptLoadState = {
    src: string;
    status: ScriptStatus;
};
declare function useScript(src: string | string[], { onLoad, onError, removeOnUnmount, ...attributes }?: {
    onLoad?: () => void;
    onError?: () => void;
    removeOnUnmount?: boolean;
    [key: string]: any;
}): ScriptLoadState[];
export default useScript;
//# sourceMappingURL=index.d.ts.map