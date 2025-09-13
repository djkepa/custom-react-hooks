"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLockBodyScroll = void 0;
var react_1 = require("react");
function useLockBodyScroll(lock) {
    if (lock === void 0) { lock = true; }
    (0, react_1.useLayoutEffect)(function () {
        if (typeof document === 'undefined') {
            return;
        }
        var originalStyle = window.getComputedStyle(document.body).overflow;
        if (lock) {
            document.body.style.overflow = 'hidden';
        }
        return function () {
            if (lock) {
                document.body.style.overflow = originalStyle;
            }
        };
    }, [lock]);
}
exports.useLockBodyScroll = useLockBodyScroll;
