declare function useIdle(idleTime: number): boolean;
declare global {
    interface Window {
        idleTimeout: ReturnType<typeof setTimeout>;
    }
}
export default useIdle;
//# sourceMappingURL=index.d.ts.map