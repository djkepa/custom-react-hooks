"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useTimeout(callback, delay) {
    var _a = (0, react_1.useState)(false), isActive = _a[0], setIsActive = _a[1];
    var savedCallback = (0, react_1.useRef)(callback);
    var timerId = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        savedCallback.current = callback;
    }, [callback]);
    var clear = (0, react_1.useCallback)(function () {
        if (timerId.current) {
            clearTimeout(timerId.current);
            timerId.current = null;
        }
        setIsActive(false);
    }, []);
    var reset = (0, react_1.useCallback)(function () {
        clear();
        if (delay !== null) {
            setIsActive(true);
            timerId.current = setTimeout(function () {
                savedCallback.current();
                setIsActive(false);
            }, delay);
        }
    }, [delay, clear]);
    (0, react_1.useEffect)(function () {
        reset();
    }, [delay, clear, reset]);
    return { isActive: isActive, reset: reset, clear: clear };
}
exports.default = useTimeout;
