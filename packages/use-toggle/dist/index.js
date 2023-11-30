"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useToggle(initialValue, onToggle) {
    if (initialValue === void 0) { initialValue = false; }
    var _a = (0, react_1.useState)(initialValue), value = _a[0], setValue = _a[1];
    var toggle = (0, react_1.useCallback)(function () {
        setValue(function (v) {
            var newValue = !v;
            if (onToggle) {
                onToggle(newValue);
            }
            return newValue;
        });
    }, [onToggle]);
    var setTrue = (0, react_1.useCallback)(function () {
        setValue(true);
        if (onToggle) {
            onToggle(true);
        }
    }, [onToggle]);
    var setFalse = (0, react_1.useCallback)(function () {
        setValue(false);
        if (onToggle) {
            onToggle(false);
        }
    }, [onToggle]);
    return { value: value, toggle: toggle, setTrue: setTrue, setFalse: setFalse };
}
exports.default = useToggle;
