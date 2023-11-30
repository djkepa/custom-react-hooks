"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useDocumentTitle(title, revertOnUnmount) {
    if (revertOnUnmount === void 0) { revertOnUnmount = true; }
    var defaultTitle = typeof document !== 'undefined' ? document.title : '';
    (0, react_1.useEffect)(function () {
        if (typeof document !== 'undefined') {
            document.title = title;
        }
        return function () {
            if (revertOnUnmount && typeof document !== 'undefined') {
                document.title = defaultTitle;
            }
        };
    }, [title, revertOnUnmount, defaultTitle]);
}
exports.default = useDocumentTitle;
