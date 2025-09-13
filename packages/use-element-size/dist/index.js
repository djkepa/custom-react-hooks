"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useElementSize = void 0;
var react_1 = require("react");
function useElementSize() {
    var _a = (0, react_1.useState)(null), ref = _a[0], setRef = _a[1];
    var _b = (0, react_1.useState)({ width: 0, height: 0 }), size = _b[0], setSize = _b[1];
    var handleSize = (0, react_1.useCallback)(function () {
        if (ref) {
            setSize({
                width: ref.offsetWidth,
                height: ref.offsetHeight,
            });
        }
    }, [ref]);
    var useEnviromentEffect = typeof window !== 'undefined' ? react_1.useLayoutEffect : react_1.useEffect;
    useEnviromentEffect(function () {
        if (!ref)
            return;
        handleSize();
        var resizeObserver = new ResizeObserver(handleSize);
        resizeObserver.observe(ref);
        return function () { return resizeObserver.disconnect(); };
    }, [ref, handleSize]);
    return [setRef, size];
}
exports.useElementSize = useElementSize;
