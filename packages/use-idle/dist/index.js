"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useIdle(idleTime) {
    var _a = (0, react_1.useState)(false), isIdle = _a[0], setIsIdle = _a[1];
    var idleTimerRef = (0, react_1.useRef)();
    var handleActivity = (0, react_1.useCallback)(function () {
        setIsIdle(false);
        if (idleTimerRef.current)
            clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(function () {
            setIsIdle(true);
        }, idleTime);
    }, [idleTime]);
    (0, react_1.useEffect)(function () {
        var events = ['mousemove', 'keydown', 'scroll'];
        events.forEach(function (event) { return window.addEventListener(event, handleActivity); });
        return function () {
            if (idleTimerRef.current)
                clearTimeout(idleTimerRef.current);
            events.forEach(function (event) { return window.removeEventListener(event, handleActivity); });
        };
    }, [handleActivity]);
    return isIdle;
}
exports.default = useIdle;
