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
var react_1 = require("react");
function useStatus() {
    var navigatorWithNetworkInfo = navigator;
    var _a = (0, react_1.useState)(function () {
        return __assign({ online: navigator.onLine }, (navigatorWithNetworkInfo.connection ? {
            downlink: navigatorWithNetworkInfo.connection.downlink,
            effectiveType: navigatorWithNetworkInfo.connection.effectiveType,
            rtt: navigatorWithNetworkInfo.connection.rtt
        } : {}));
    }), status = _a[0], setStatus = _a[1];
    var updateStatus = function () {
        setStatus(__assign({ online: navigator.onLine }, (navigatorWithNetworkInfo.connection ? {
            downlink: navigatorWithNetworkInfo.connection.downlink,
            effectiveType: navigatorWithNetworkInfo.connection.effectiveType,
            rtt: navigatorWithNetworkInfo.connection.rtt
        } : {})));
    };
    (0, react_1.useEffect)(function () {
        var _a;
        window.addEventListener('online', updateStatus);
        window.addEventListener('offline', updateStatus);
        (_a = navigatorWithNetworkInfo.connection) === null || _a === void 0 ? void 0 : _a.addEventListener('change', updateStatus);
        return function () {
            var _a;
            window.removeEventListener('online', updateStatus);
            window.removeEventListener('offline', updateStatus);
            (_a = navigatorWithNetworkInfo.connection) === null || _a === void 0 ? void 0 : _a.removeEventListener('change', updateStatus);
        };
    }, []);
    return status;
}
exports.default = useStatus;
