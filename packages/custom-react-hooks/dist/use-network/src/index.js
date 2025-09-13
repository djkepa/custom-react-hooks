"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNetwork = void 0;
var react_1 = require("react");
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
    var getConnection = function () {
        if (typeof window === 'undefined')
            return undefined;
        var nav = navigator;
        return nav.connection || nav.mozConnection || nav.webkitConnection;
    };
    var getNetworkState = function () {
        var online = typeof window !== 'undefined' ? navigator.onLine : true;
        var connection = getConnection();
        return {
            online: online,
            downlink: connection === null || connection === void 0 ? void 0 : connection.downlink,
            downlinkMax: connection === null || connection === void 0 ? void 0 : connection.downlinkMax,
            effectiveType: connection === null || connection === void 0 ? void 0 : connection.effectiveType,
            rtt: connection === null || connection === void 0 ? void 0 : connection.rtt,
            saveData: connection === null || connection === void 0 ? void 0 : connection.saveData,
            type: connection === null || connection === void 0 ? void 0 : connection.type,
        };
    };
    var _a = (0, react_1.useState)(getNetworkState), state = _a[0], setState = _a[1];
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined')
            return;
        var updateNetworkState = function () {
            setState(getNetworkState());
        };
        // Listen for online/offline events
        window.addEventListener('online', updateNetworkState);
        window.addEventListener('offline', updateNetworkState);
        // Listen for connection changes
        var connection = getConnection();
        if (connection) {
            connection.addEventListener('change', updateNetworkState);
        }
        // Initial state update
        updateNetworkState();
        return function () {
            window.removeEventListener('online', updateNetworkState);
            window.removeEventListener('offline', updateNetworkState);
            if (connection) {
                connection.removeEventListener('change', updateNetworkState);
            }
        };
    }, []);
    return state;
}
exports.useNetwork = useNetwork;
