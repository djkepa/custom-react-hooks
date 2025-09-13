import { useState, useEffect } from 'react';

export interface NetworkInformation extends EventTarget {
  readonly downlink?: number;
  readonly downlinkMax?: number;
  readonly effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  readonly rtt?: number;
  readonly saveData?: boolean;
  readonly type?:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown';
  onchange?: ((this: NetworkInformation, ev: Event) => any) | null;
}

export interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation;
  mozConnection?: NetworkInformation;
  webkitConnection?: NetworkInformation;
}

export interface UseNetworkState {
  online: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  rtt?: number;
  saveData?: boolean;
  type?: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
}

/**
 * `useNetwork` is a hook for monitoring network status and connection information.
 * It provides real-time information about the user's network connection including
 * online/offline status, connection speed, and connection type.
 *
 * @return - An object containing network status and connection information:
 *   - `online`: Boolean indicating if the user is online
 *   - `downlink`: Effective bandwidth estimate in megabits per second
 *   - `downlinkMax`: Maximum downlink speed in megabits per second
 *   - `effectiveType`: Effective connection type ('slow-2g', '2g', '3g', '4g')
 *   - `rtt`: Estimated effective round-trip time in milliseconds
 *   - `saveData`: Boolean indicating if the user has requested a reduced data usage mode
 *   - `type`: Connection type ('bluetooth', 'cellular', 'ethernet', 'none', 'wifi', etc.)
 */

function useNetwork(): UseNetworkState {
  const getConnection = (): NetworkInformation | undefined => {
    if (typeof window === 'undefined') return undefined;

    const nav = navigator as NavigatorWithConnection;
    return nav.connection || nav.mozConnection || nav.webkitConnection;
  };

  const getNetworkState = (): UseNetworkState => {
    const online = typeof window !== 'undefined' ? navigator.onLine : true;
    const connection = getConnection();

    return {
      online,
      downlink: connection?.downlink,
      downlinkMax: connection?.downlinkMax,
      effectiveType: connection?.effectiveType,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
      type: connection?.type,
    };
  };

  const [state, setState] = useState<UseNetworkState>(getNetworkState);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateNetworkState = () => {
      setState(getNetworkState());
    };

    // Listen for online/offline events
    window.addEventListener('online', updateNetworkState);
    window.addEventListener('offline', updateNetworkState);

    // Listen for connection changes
    const connection = getConnection();
    if (connection) {
      connection.addEventListener('change', updateNetworkState);
    }

    // Initial state update
    updateNetworkState();

    return () => {
      window.removeEventListener('online', updateNetworkState);
      window.removeEventListener('offline', updateNetworkState);

      if (connection) {
        connection.removeEventListener('change', updateNetworkState);
      }
    };
  }, []);

  return state;
}

export { useNetwork };

