"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePrevious = void 0;
var react_1 = require("react");
/**
 * `usePrevious` is a hook that stores the previous value of a state or prop.
 * It's useful for comparing current and previous values in effects or for
 * implementing animations and transitions based on value changes.
 *
 * @param value - The current value to track
 * @return - The previous value (undefined on first render)
 */
function usePrevious(value) {
    var ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        ref.current = value;
    }, [value]);
    return ref.current;
}
exports.usePrevious = usePrevious;
