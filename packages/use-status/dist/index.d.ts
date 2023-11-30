interface NetworkStatus {
    online: boolean;
    downlink?: number;
    effectiveType?: string;
    rtt?: number;
}
declare function useStatus(): NetworkStatus;
export default useStatus;
//# sourceMappingURL=index.d.ts.map