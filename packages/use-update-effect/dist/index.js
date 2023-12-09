"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUpdateEffect = void 0;
var react_1 = require("react");
function useUpdateEffect(effect, deps) {
    if (deps === void 0) { deps = []; }
    var useFirstMountState = function () {
        var isFirst = (0, react_1.useRef)(true);
        if (isFirst.current) {
            isFirst.current = false;
            return true;
        }
        return isFirst.current;
    };
    var isFirstMount = useFirstMountState();
    (0, react_1.useEffect)(function () {
        if (!isFirstMount) {
            return effect();
        }
    }, deps);
}
exports.useUpdateEffect = useUpdateEffect;
exports.default = useUpdateEffect;
