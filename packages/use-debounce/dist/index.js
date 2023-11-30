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
function useDebounce(callback, delay, options) {
    if (options === void 0) { options = {}; }
    var _a = __assign({ trailing: true }, options), maxWait = _a.maxWait, leading = _a.leading, trailing = _a.trailing;
    var _b = (0, react_1.useState)(null), lastCallTime = _b[0], setLastCallTime = _b[1];
    var _c = (0, react_1.useState)(null), timerId = _c[0], setTimerId = _c[1];
    var _d = (0, react_1.useState)(null), maxTimerId = _d[0], setMaxTimerId = _d[1];
    var debouncedFunction = (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        var isLeading = leading && lastCallTime === null;
        if (maxWait && !maxTimerId && trailing) {
            var maxWaitHandler = function () {
                setMaxTimerId(null);
                setLastCallTime(now);
                callback.apply(void 0, args);
            };
            setMaxTimerId(setTimeout(maxWaitHandler, maxWait));
        }
        if (isLeading) {
            setLastCallTime(now);
            callback.apply(void 0, args);
        }
        else if (trailing) {
            clearTimeout(timerId);
            var handler = function () {
                if (!isLeading || maxWait)
                    setLastCallTime(now);
                setTimerId(null);
                callback.apply(void 0, args);
            };
            setTimerId(setTimeout(handler, delay));
        }
    }, [callback, delay, leading, trailing, maxWait, lastCallTime, timerId, maxTimerId]);
    var cancel = (0, react_1.useCallback)(function () {
        clearTimeout(timerId);
        clearTimeout(maxTimerId);
        setTimerId(null);
        setMaxTimerId(null);
        setLastCallTime(null);
    }, [timerId, maxTimerId]);
    return [debouncedFunction, cancel];
}
exports.default = useDebounce;
