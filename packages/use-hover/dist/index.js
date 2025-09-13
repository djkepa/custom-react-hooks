"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHover = void 0;
var react_1 = require("react");
function useHover() {
    var _a = (0, react_1.useState)(false), isHovered = _a[0], setIsHovered = _a[1];
    var ref = (0, react_1.useRef)(null);
    var handleMouseEnter = (0, react_1.useCallback)(function () {
        setIsHovered(true);
    }, []);
    var handleMouseLeave = (0, react_1.useCallback)(function () {
        setIsHovered(false);
    }, []);
    (0, react_1.useEffect)(function () {
        var element = ref.current;
        if (!element) {
            return;
        }
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        return function () {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [handleMouseEnter, handleMouseLeave]);
    return { ref: ref, isHovered: isHovered };
}
exports.useHover = useHover;
