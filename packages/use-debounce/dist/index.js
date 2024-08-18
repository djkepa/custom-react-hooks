"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDebounce = void 0;
var react_1 = require("react");
function useDebounce(callback, delay, options) {
    if (delay === void 0) { delay = 500; }
    if (options === void 0) { options = {}; }
    var maxWait = options.maxWait, _a = options.leading, leading = _a === void 0 ? false : _a, _b = options.trailing, trailing = _b === void 0 ? true : _b;
    var timerIdRef = (0, react_1.useRef)(null);
    var maxTimerIdRef = (0, react_1.useRef)(null);
    var lastCallTimeRef = (0, react_1.useRef)(null);
    var callbackRef = (0, react_1.useRef)(callback);
    (0, react_1.useEffect)(function () {
        callbackRef.current = callback;
    }, [callback]);
    (0, react_1.useEffect)(function () {
        return function () {
            if (timerIdRef.current)
                clearTimeout(timerIdRef.current);
            if (maxTimerIdRef.current)
                clearTimeout(maxTimerIdRef.current);
        };
    }, []);
    var debouncedFunction = (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        var isLeading = leading && lastCallTimeRef.current === null;
        var invokeCallback = function () {
            lastCallTimeRef.current = now;
            timerIdRef.current = null;
            maxTimerIdRef.current = null;
            callbackRef.current.apply(callbackRef, args);
        };
        if (isLeading) {
            invokeCallback();
            return;
        }
        if (timerIdRef.current)
            clearTimeout(timerIdRef.current);
        if (maxWait && !maxTimerIdRef.current && trailing) {
            maxTimerIdRef.current = setTimeout(invokeCallback, maxWait);
        }
        timerIdRef.current = setTimeout(invokeCallback, delay);
    }, [delay, leading, trailing, maxWait]);
    var cancel = (0, react_1.useCallback)(function () {
        if (timerIdRef.current)
            clearTimeout(timerIdRef.current);
        if (maxTimerIdRef.current)
            clearTimeout(maxTimerIdRef.current);
        timerIdRef.current = null;
        maxTimerIdRef.current = null;
        lastCallTimeRef.current = null;
    }, []);
    return [debouncedFunction, cancel];
}
exports.useDebounce = useDebounce;
