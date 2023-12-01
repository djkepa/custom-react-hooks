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
declare const useMediaDevices: () => UseMediaDevicesState;
export default useMediaDevices;
//# sourceMappingURL=index.d.ts.map