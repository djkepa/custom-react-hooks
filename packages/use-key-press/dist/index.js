"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useKeyPress(targetKey, options) {
    if (options === void 0) { options = {}; }
    var _a = (0, react_1.useState)(false), keyPressed = _a[0], setKeyPressed = _a[1];
    var debounceTimeout = (0, react_1.useRef)(null);
    var _b = options.debounce, debounce = _b === void 0 ? 0 : _b, _c = options.global, global = _c === void 0 ? true : _c;
    var handleKeyEvent = (0, react_1.useCallback)(function (event) {
        var keyboardEvent = event;
        if (keyboardEvent.key === targetKey) {
            if (debounceTimeout.current)
                clearTimeout(debounceTimeout.current);
            debounceTimeout.current = window.setTimeout(function () {
                setKeyPressed(keyboardEvent.type === 'keydown');
            }, debounce);
        }
    }, [targetKey, debounce]);
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined') {
            return;
        }
        var target = global ? window : document.getElementById('yourComponentId');
        target === null || target === void 0 ? void 0 : target.addEventListener('keydown', handleKeyEvent);
        target === null || target === void 0 ? void 0 : target.addEventListener('keyup', handleKeyEvent);
        return function () {
            target === null || target === void 0 ? void 0 : target.removeEventListener('keydown', handleKeyEvent);
            target === null || target === void 0 ? void 0 : target.removeEventListener('keyup', handleKeyEvent);
        };
    }, [handleKeyEvent, global]);
    return keyPressed;
}
exports.default = useKeyPress;
