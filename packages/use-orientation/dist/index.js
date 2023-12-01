"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useOrientation(elementRef) {
    var getOrientation = function () {
        var orientationData = {
            angle: 0,
            type: undefined,
            aspectRatio: undefined,
            elementOrientation: undefined,
        };
        if (typeof window !== 'undefined' && window.screen.orientation) {
            var _a = window.screen.orientation, angle = _a.angle, type = _a.type;
            orientationData.angle = angle;
            orientationData.type = type;
        }
        if (elementRef === null || elementRef === void 0 ? void 0 : elementRef.current) {
            var _b = elementRef.current, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
            orientationData.aspectRatio = offsetWidth / offsetHeight;
            orientationData.elementOrientation = offsetWidth > offsetHeight ? 'landscape' : 'portrait';
        }
        return orientationData;
    };
    var _a = (0, react_1.useState)(getOrientation), orientation = _a[0], setOrientation = _a[1];
    var handleOrientationChange = (0, react_1.useCallback)(function () {
        setOrientation(getOrientation());
    }, [elementRef]);
    (0, react_1.useEffect)(function () {
        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange);
        return function () {
            window.removeEventListener('orientationchange', handleOrientationChange);
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, [handleOrientationChange]);
    return orientation;
}
exports.default = useOrientation;
