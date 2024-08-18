"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrientation = void 0;
var react_1 = require("react");
function useOrientation(elementRef, trackWindow) {
    if (trackWindow === void 0) { trackWindow = false; }
    var getOrientation = function () {
        var orientationData = {
            angle: 0,
            type: undefined,
            aspectRatio: undefined,
            elementOrientation: undefined,
        };
        if (trackWindow && typeof window !== 'undefined' && window.screen.orientation) {
            var _a = window.screen.orientation, angle = _a.angle, type = _a.type;
            orientationData.angle = angle;
            orientationData.type = type;
        }
        if (!trackWindow && (elementRef === null || elementRef === void 0 ? void 0 : elementRef.current)) {
            var _b = elementRef.current, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
            orientationData.aspectRatio = offsetWidth / offsetHeight;
            orientationData.elementOrientation = offsetWidth > offsetHeight ? 'landscape' : 'portrait';
        }
        return orientationData;
    };
    var _a = (0, react_1.useState)(getOrientation), orientation = _a[0], setOrientation = _a[1];
    var handleOrientationChange = (0, react_1.useCallback)(function () {
        setOrientation(getOrientation());
    }, [elementRef, trackWindow]);
    (0, react_1.useEffect)(function () {
        handleOrientationChange();
        window.addEventListener('resize', handleOrientationChange);
        if (trackWindow) {
            window.addEventListener('orientationchange', handleOrientationChange);
        }
        return function () {
            window.removeEventListener('resize', handleOrientationChange);
            if (trackWindow) {
                window.removeEventListener('orientationchange', handleOrientationChange);
            }
        };
    }, [handleOrientationChange, trackWindow]);
    return orientation;
}
exports.useOrientation = useOrientation;
