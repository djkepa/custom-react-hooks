export interface NetworkStatus {
    online: boolean;
    downlink?: number;
    effectiveType?: string;
    rtt?: number;
}
export interface NetworkInformation extends EventTarget {
    downlink?: number;
    effectiveType?: string;
    rtt?: number;
}
export interface NavigatorWithNetworkInformation extends Navigator {
    connection?: NetworkInformation;
}
declare function useStatus(): NetworkStatus;
export default useStatus;
//# sourceMappingURL=index.d.ts.map