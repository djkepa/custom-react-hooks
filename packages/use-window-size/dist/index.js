"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWindowSize = void 0;
var react_1 = require("react");
function useWindowSize(debounceDelay) {
    if (debounceDelay === void 0) { debounceDelay = 100; }
    var getSize = function () { return ({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    }); };
    var _a = (0, react_1.useState)(getSize), windowSize = _a[0], setWindowSize = _a[1];
    var debounce = function (fn, ms) {
        var timer = null;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            clearTimeout(timer);
            timer = setTimeout(function () {
                timer = null;
                fn();
            }, ms);
        };
    };
    var handleResize = (0, react_1.useCallback)(function () {
        var handleResizeDebounced = debounce(function () {
            setWindowSize(getSize());
        }, debounceDelay);
        handleResizeDebounced();
    }, [debounceDelay]);
    (0, react_1.useEffect)(function () {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            return function () { return window.removeEventListener('resize', handleResize); };
        }
    }, [handleResize]);
    return windowSize;
}
exports.useWindowSize = useWindowSize;
