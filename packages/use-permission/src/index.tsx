import { useState, useEffect } from 'react';

type PermissionName =
  | 'geolocation'
  | 'notifications'
  | 'push'
  | 'microphone'
  | 'camera'
  | 'speaker'
  | 'device-info'
  | 'background-sync'
  | 'bluetooth'
  | 'persistent-storage'
  | 'ambient-light-sensor'
  | 'accelerometer'
  | 'gyroscope'
  | 'magnetometer'
  | 'clipboard-read'
  | 'clipboard-write'
  | 'payment-handler';

interface PermissionState {
  state: PermissionStatus['state'] | 'prompt';
  isLoading: boolean;
  error: string | null;
}

/**
 * `usePermission` is a hook for querying permission status for various browser APIs.
 * It supports querying permissions like geolocation, notifications, camera, microphone, etc.
 *
 * @param permissionName - The name of the permission to query.
 * @return - An object containing the permission state, loading status, and error information.
 */

const usePermission = (permissionName: PermissionName): PermissionState => {
  const [permission, setPermission] = useState<PermissionState>({
    state: 'prompt',
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.permissions) {
      setPermission({
        state: 'denied',
        isLoading: false,
        error: 'Permissions API is not supported',
      });
      return;
    }

    const queryPermission = async () => {
      setPermission((prev) => ({ ...prev, isLoading: true }));

      try {
        const permissionStatus = await navigator.permissions.query({ name: permissionName as any });
        setPermission({ state: permissionStatus.state, isLoading: false, error: null });

        permissionStatus.onchange = () => {
          setPermission({ state: permissionStatus.state, isLoading: false, error: null });
        };
      } catch (error) {
        setPermission({
          state: 'denied',
          isLoading: false,
          error:
            error instanceof Error
              ? `Error querying ${permissionName} permission: ${error.message}`
              : 'Unknown error',
        });
      }
    };

    queryPermission();
  }, [permissionName]);

  return permission;
};

export default usePermission;
