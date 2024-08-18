"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useKeyPress = void 0;
var react_1 = require("react");
function useKeyPress(targetKey, options) {
    if (options === void 0) { options = {}; }
    var _a = (0, react_1.useState)(false), keyPressed = _a[0], setKeyPressed = _a[1];
    var debounceTimeout = (0, react_1.useRef)(null);
    var _b = options.debounce, debounce = _b === void 0 ? 0 : _b, _c = options.targetElement, targetElement = _c === void 0 ? null : _c;
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
        var target = targetElement || window;
        target.addEventListener('keydown', handleKeyEvent);
        target.addEventListener('keyup', handleKeyEvent);
        return function () {
            target.removeEventListener('keydown', handleKeyEvent);
            target.removeEventListener('keyup', handleKeyEvent);
            if (debounceTimeout.current)
                clearTimeout(debounceTimeout.current);
        };
    }, [handleKeyEvent, targetElement]);
    return keyPressed;
}
exports.useKeyPress = useKeyPress;
