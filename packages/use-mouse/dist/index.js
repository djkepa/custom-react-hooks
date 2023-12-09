"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useMouse(ref, options) {
    if (options === void 0) { options = { offsetX: 10, offsetY: 10, avoidEdges: false, relativeToWindow: false }; }
    var _a = (0, react_1.useState)({
        x: 0,
        y: 0,
        position: 'bottomRight',
    }), mousePosition = _a[0], setMousePosition = _a[1];
    var updateMousePosition = (0, react_1.useCallback)(function (ev) {
        var _a;
        var offsetX = options.offsetX, offsetY = options.offsetY, avoidEdges = options.avoidEdges, _b = options.tooltipWidth, tooltipWidth = _b === void 0 ? 100 : _b, _c = options.tooltipHeight, tooltipHeight = _c === void 0 ? 50 : _c, relativeToWindow = options.relativeToWindow;
        var newX = ev.clientX + offsetX;
        var newY = ev.clientY + offsetY;
        var newPosition = 'bottomRight';
        if (avoidEdges) {
            if (relativeToWindow) {
                if (newX + tooltipWidth > window.innerWidth) {
                    newX = ev.clientX - tooltipWidth - offsetX;
                    newPosition = 'bottomLeft';
                }
                if (newY + tooltipHeight > window.innerHeight) {
                    newY = ev.clientY - tooltipHeight - offsetY;
                    newPosition = newPosition === 'bottomLeft' ? 'topLeft' : 'topRight';
                }
            }
            else {
                var rect = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                if (rect) {
                    if (newX + tooltipWidth > rect.right) {
                        newX = ev.clientX - tooltipWidth - offsetX;
                        newPosition = 'bottomLeft';
                    }
                    if (newY + tooltipHeight > rect.bottom) {
                        newY = ev.clientY - tooltipHeight - offsetY;
                        newPosition = newPosition === 'bottomLeft' ? 'topLeft' : 'topRight';
                    }
                }
            }
        }
        setMousePosition({ x: newX, y: newY, position: newPosition });
    }, [options, ref]);
    (0, react_1.useEffect)(function () {
        var handleMouseMove = function (ev) {
            if (options.relativeToWindow || (ref.current && ref.current.contains(ev.target))) {
                updateMousePosition(ev);
            }
        };
        document.addEventListener('mousemove', handleMouseMove);
        return function () {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, [updateMousePosition, options.relativeToWindow, ref]);
    return mousePosition;
}
exports.default = useMouse;
