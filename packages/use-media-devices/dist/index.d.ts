export interface MediaDevice {
    id: string;
    kind: string;
    label: string;
}
export interface UseMediaDevicesState {
    devices: MediaDevice[];
    isLoading: boolean;
    error: string | null;
}
declare const useMediaDevices: (requestPermission?: boolean) => UseMediaDevicesState;
export { useMediaDevices };
//# sourceMappingURL=index.d.ts.map