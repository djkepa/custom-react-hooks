type PermissionName = 'geolocation' | 'notifications' | 'push' | 'microphone' | 'camera' | 'speaker' | 'device-info' | 'background-sync' | 'bluetooth' | 'persistent-storage' | 'ambient-light-sensor' | 'accelerometer' | 'gyroscope' | 'magnetometer' | 'clipboard-read' | 'clipboard-write' | 'payment-handler';
interface PermissionState {
    state: PermissionStatus['state'] | 'prompt';
    isLoading: boolean;
    error: string | null;
}
declare const usePermission: (permissionName: PermissionName) => PermissionState;
export default usePermission;
//# sourceMappingURL=index.d.ts.map