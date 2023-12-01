import { useState, useEffect } from 'react';

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

/**
 * `useStatus` is a hook for monitoring the network status of the user's device.
 * It provides online/offline status and additional network information like downlink speed and connection type.
 *
 * @return - An object containing the network status, including online state, downlink speed, effective type, and round-trip time.
 */

function useStatus() {
  const navigatorWithNetworkInfo = navigator as NavigatorWithNetworkInformation;

  const getNetworkStatus = (): NetworkStatus => ({
    online: navigator.onLine,
    ...(navigatorWithNetworkInfo.connection && {
      downlink: navigatorWithNetworkInfo.connection.downlink,
      effectiveType: navigatorWithNetworkInfo.connection.effectiveType,
      rtt: navigatorWithNetworkInfo.connection.rtt,
    }),
  });

  const [status, setStatus] = useState<NetworkStatus>(getNetworkStatus);

  const updateStatus = () => setStatus(getNetworkStatus);

  useEffect(() => {
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);

    const connection = navigatorWithNetworkInfo.connection;
    if (connection) {
      connection.addEventListener('change', updateStatus);
    }

    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
      if (connection) {
        connection.removeEventListener('change', updateStatus);
      }
    };
  }, []);

  return status;
}

export default useStatus;
