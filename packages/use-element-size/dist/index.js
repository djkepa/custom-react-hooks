"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useElementSize(ref) {
    var _a = (0, react_1.useState)({ width: undefined, height: undefined }), size = _a[0], setSize = _a[1];
    var updateSize = (0, react_1.useCallback)(function () {
        if (ref.current) {
            setSize({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight
            });
        }
    }, [ref]);
    (0, react_1.useLayoutEffect)(function () {
        if (!ref.current)
            return;
        updateSize();
        window.addEventListener('resize', updateSize);
        return function () { return window.removeEventListener('resize', updateSize); };
    }, [ref, updateSize]);
    (0, react_1.useEffect)(function () {
        if (typeof window !== 'undefined') {
            window.addEventListener('load', updateSize);
            return function () { return window.removeEventListener('load', updateSize); };
        }
    }, [updateSize]);
    return size;
}
exports.default = useElementSize;
