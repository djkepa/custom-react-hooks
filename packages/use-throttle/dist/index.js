"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThrottle = void 0;
var react_1 = require("react");
function useThrottle(value, limit, immediate) {
    if (immediate === void 0) { immediate = false; }
    var _a = (0, react_1.useState)(immediate ? value : undefined), throttledValue = _a[0], setThrottledValue = _a[1];
    var lastExecuted = (0, react_1.useRef)(Date.now());
    var lastValue = (0, react_1.useRef)(value);
    (0, react_1.useEffect)(function () {
        var handler = setTimeout(function () {
            if (Date.now() - lastExecuted.current >= limit) {
                setThrottledValue(lastValue.current);
                lastExecuted.current = Date.now();
            }
        }, limit - (Date.now() - lastExecuted.current));
        lastValue.current = value;
        return function () {
            clearTimeout(handler);
        };
    }, [value, limit]);
    return throttledValue;
}
exports.useThrottle = useThrottle;
