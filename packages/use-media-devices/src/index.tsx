import { useState, useEffect } from 'react';

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

/**
 * `useMediaDevices` is a hook for accessing and listing media input and output devices like cameras, microphones, and speakers.
 * It provides a list of available devices, loading status, and any errors encountered.
 *
 * @return - An object containing the array of media devices, loading status, and error information.
 */

const useMediaDevices = (requestPermission: boolean = false): UseMediaDevicesState => {
  const [state, setState] = useState<UseMediaDevicesState>({
    devices: [],
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || typeof navigator.mediaDevices === 'undefined') {
      setState((s) => ({ ...s, error: 'Media devices are not available' }));
      return;
    }

    const handleDeviceChange = async () => {
      try {
        if (requestPermission) {
          await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        setState({
          devices: devices.map((device) => ({
            id: device.deviceId,
            kind: device.kind,
            label: device.label || 'Unknown Device',
          })),
          isLoading: false,
          error: null,
        });
      } catch (error) {
        setState((s) => ({ ...s, isLoading: false, error: 'Unable to enumerate devices' }));
      }
    };

    setState((s) => ({ ...s, isLoading: true }));
    handleDeviceChange();

    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', handleDeviceChange);
    };
  }, [requestPermission]);

  return state;
};

export { useMediaDevices };
