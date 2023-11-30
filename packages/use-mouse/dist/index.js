"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useMouse(ref, options) {
    if (options === void 0) { options = { offsetX: 10, offsetY: 10, avoidEdges: false }; }
    var _a = (0, react_1.useState)({ x: 0, y: 0 }), mousePosition = _a[0], setMousePosition = _a[1];
    var frameId = (0, react_1.useRef)(null);
    var updateMousePosition = (0, react_1.useCallback)(function (ev) {
        if (frameId.current !== null) {
            cancelAnimationFrame(frameId.current);
        }
        frameId.current = requestAnimationFrame(function () {
            var newX = ev.clientX + options.offsetX;
            var newY = ev.clientY + options.offsetY;
            if (options.avoidEdges) {
                var screenWidth = window.innerWidth;
                var screenHeight = window.innerHeight;
                var tooltipWidth = options.tooltipWidth || 100;
                var tooltipHeight = options.tooltipHeight || 50;
                if (newX + tooltipWidth > screenWidth) {
                    newX = ev.clientX - tooltipWidth;
                }
                if (newY + tooltipHeight > screenHeight) {
                    newY = ev.clientY - tooltipHeight;
                }
            }
            setMousePosition({ x: newX, y: newY });
        });
    }, [options]);
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined' || !ref.current) {
            return;
        }
        var handleMouseMove = function (ev) {
            if (ref.current && ref.current.contains(ev.target)) {
                updateMousePosition(ev);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return function () {
            window.removeEventListener('mousemove', handleMouseMove);
            if (frameId.current !== null) {
                cancelAnimationFrame(frameId.current);
            }
        };
    }, [ref, updateMousePosition]);
    return mousePosition;
}
exports.default = useMouse;
