import { useState, useEffect } from 'react';
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
function useNetwork() {
    const getConnection = () => {
        if (typeof window === 'undefined')
            return undefined;
        const nav = navigator;
        return nav.connection || nav.mozConnection || nav.webkitConnection;
    };
    const getNetworkState = () => {
        const online = typeof window !== 'undefined' ? navigator.onLine : true;
        const connection = getConnection();
        return {
            online,
            downlink: connection === null || connection === void 0 ? void 0 : connection.downlink,
            downlinkMax: connection === null || connection === void 0 ? void 0 : connection.downlinkMax,
            effectiveType: connection === null || connection === void 0 ? void 0 : connection.effectiveType,
            rtt: connection === null || connection === void 0 ? void 0 : connection.rtt,
            saveData: connection === null || connection === void 0 ? void 0 : connection.saveData,
            type: connection === null || connection === void 0 ? void 0 : connection.type,
        };
    };
    const [state, setState] = useState(getNetworkState);
    useEffect(() => {
        if (typeof window === 'undefined')
            return;
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
//# sourceMappingURL=index.js.map