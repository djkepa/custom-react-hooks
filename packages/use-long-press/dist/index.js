"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLongPress = void 0;
var react_1 = require("react");
function useLongPress(callback, options) {
    if (options === void 0) { options = {}; }
    var _a = options.threshold, threshold = _a === void 0 ? 400 : _a, onStart = options.onStart, onFinish = options.onFinish, onCancel = options.onCancel;
    var timer = (0, react_1.useRef)();
    var isLongPressTriggered = (0, react_1.useRef)(false);
    var start = (0, react_1.useCallback)(function () {
        onStart === null || onStart === void 0 ? void 0 : onStart();
        isLongPressTriggered.current = false;
        timer.current = setTimeout(function () {
            callback();
            onFinish === null || onFinish === void 0 ? void 0 : onFinish();
            isLongPressTriggered.current = true;
        }, threshold);
    }, [callback, threshold, onStart, onFinish]);
    var clear = (0, react_1.useCallback)(function () {
        clearTimeout(timer.current);
        timer.current = undefined;
    }, []);
    var cancel = (0, react_1.useCallback)(function () {
        clear();
        if (!isLongPressTriggered.current) {
            onCancel === null || onCancel === void 0 ? void 0 : onCancel();
        }
    }, [clear, onCancel]);
    var onMouseDown = (0, react_1.useCallback)(function () {
        start();
    }, [start]);
    var onMouseUp = (0, react_1.useCallback)(function () {
        if (timer.current) {
            cancel();
        }
    }, [cancel]);
    var onMouseLeave = (0, react_1.useCallback)(function () {
        cancel();
    }, [cancel]);
    var onTouchStart = (0, react_1.useCallback)(function () {
        start();
    }, [start]);
    var onTouchEnd = (0, react_1.useCallback)(function () {
        if (timer.current) {
            cancel();
        }
    }, [cancel]);
    (0, react_1.useEffect)(function () {
        return function () {
            clear();
        };
    }, [clear]);
    return {
        onMouseDown: onMouseDown,
        onMouseUp: onMouseUp,
        onMouseLeave: onMouseLeave,
        onTouchStart: onTouchStart,
        onTouchEnd: onTouchEnd,
    };
}
exports.useLongPress = useLongPress;
