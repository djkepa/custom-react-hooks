"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStatus = void 0;
var react_1 = require("react");
function useStatus() {
    var navigatorWithNetworkInfo = navigator;
    var getNetworkStatus = function () { return (__assign({ online: navigator.onLine }, (navigatorWithNetworkInfo.connection && {
        downlink: navigatorWithNetworkInfo.connection.downlink,
        effectiveType: navigatorWithNetworkInfo.connection.effectiveType,
        rtt: navigatorWithNetworkInfo.connection.rtt,
    }))); };
    var _a = (0, react_1.useState)(getNetworkStatus), status = _a[0], setStatus = _a[1];
    var updateStatus = function () { return setStatus(getNetworkStatus); };
    (0, react_1.useEffect)(function () {
        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);
        var connection = navigatorWithNetworkInfo.connection;
        if (connection) {
            connection.addEventListener('change', updateStatus);
        }
        return function () {
            window.removeEventListener('online', updateStatus);
            window.removeEventListener('offline', updateStatus);
            if (connection) {
                connection.removeEventListener('change', updateStatus);
            }
        };
    }, []);
    return status;
}
exports.useStatus = useStatus;
