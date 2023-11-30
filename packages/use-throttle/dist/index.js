"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useThrottle(value, limit, immediate) {
    if (immediate === void 0) { immediate = false; }
    var _a = (0, react_1.useState)(value), throttledValue = _a[0], setThrottledValue = _a[1];
    var lastExecuted = (0, react_1.useRef)(immediate ? null : Date.now());
    var lastValue = (0, react_1.useRef)(value);
    (0, react_1.useEffect)(function () {
        if (immediate && lastExecuted.current === null) {
            setThrottledValue(value);
            lastExecuted.current = Date.now();
            return;
        }
        var handler = setTimeout(function () {
            if (Date.now() - (lastExecuted.current || 0) >= limit) {
                setThrottledValue(lastValue.current);
                lastExecuted.current = Date.now();
            }
        }, limit - (Date.now() - (lastExecuted.current || 0)));
        lastValue.current = value;
        return function () {
            clearTimeout(handler);
        };
    }, [value, limit, immediate]);
    return throttledValue;
}
exports.default = useThrottle;
