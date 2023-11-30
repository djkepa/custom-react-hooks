"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useIdle(idleTime) {
    var _a = (0, react_1.useState)(false), isIdle = _a[0], setIsIdle = _a[1];
    var handleActivity = (0, react_1.useCallback)(function () {
        setIsIdle(false);
        clearTimeout(window.idleTimeout);
        window.idleTimeout = setTimeout(function () {
            setIsIdle(true);
        }, idleTime);
    }, [idleTime]);
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined') {
            return;
        }
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);
        window.addEventListener('scroll', handleActivity);
        handleActivity();
        return function () {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            window.removeEventListener('scroll', handleActivity);
            clearTimeout(window.idleTimeout);
        };
    }, [handleActivity]);
    return isIdle;
}
exports.default = useIdle;
