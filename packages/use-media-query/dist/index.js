"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var getMatches = function (mediaQuery) {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
        return false;
    }
    return window.matchMedia(mediaQuery).matches;
};
function useMediaQuery(query) {
    var _a = (0, react_1.useState)(getMatches(query)), matches = _a[0], setMatches = _a[1];
    var handleChange = (0, react_1.useCallback)(function (event) {
        setMatches(event.matches);
    }, []);
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
            return;
        }
        var mediaQueryList = window.matchMedia(query);
        mediaQueryList.addEventListener('change', handleChange);
        return function () {
            mediaQueryList.removeEventListener('change', handleChange);
        };
    }, [query, handleChange]);
    return matches;
}
exports.default = useMediaQuery;
