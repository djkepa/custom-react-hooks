"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useElementSize(ref) {
    var _a = (0, react_1.useState)({ width: undefined, height: undefined }), size = _a[0], setSize = _a[1];
    var updateSize = (0, react_1.useCallback)(function () {
        if (ref.current) {
            var newWidth = ref.current.offsetWidth;
            var newHeight = ref.current.offsetHeight;
            if (newWidth !== size.width || newHeight !== size.height) {
                setSize({ width: newWidth, height: newHeight });
            }
        }
    }, [ref, size.width, size.height]);
    (0, react_1.useLayoutEffect)(function () {
        updateSize();
        window.addEventListener('resize', updateSize);
        return function () { return window.removeEventListener('resize', updateSize); };
    }, [updateSize]);
    return size;
}
exports.default = useElementSize;
