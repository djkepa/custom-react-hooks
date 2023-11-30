interface MediaDevice {
    id: string;
    kind: string;
    label: string;
}
interface UseMediaDevicesState {
    devices: MediaDevice[];
    isLoading: boolean;
    error: string | null;
}
declare const useMediaDevices: () => UseMediaDevicesState;
export default useMediaDevices;
//# sourceMappingURL=index.d.ts.map