"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useOrientation() {
    var getOrientation = function () {
        if (typeof window === 'undefined' || !window.screen.orientation) {
            return { angle: 0, type: undefined };
        }
        var _a = window.screen.orientation, angle = _a.angle, type = _a.type;
        return { angle: angle, type: type };
    };
    var _a = (0, react_1.useState)(getOrientation), orientation = _a[0], setOrientation = _a[1];
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined' || !window.screen.orientation) {
            return;
        }
        var handleOrientationChange = function () {
            setOrientation(getOrientation());
        };
        window.addEventListener('orientationchange', handleOrientationChange);
        return function () {
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, []);
    return orientation;
}
exports.default = useOrientation;
