"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOnScreen = void 0;
var react_1 = require("react");
function useOnScreen(options, once) {
    var _a = (0, react_1.useState)(false), isIntersecting = _a[0], setIntersecting = _a[1];
    var ref = (0, react_1.useRef)(null);
    var observer = (0, react_1.useMemo)(function () {
        return new IntersectionObserver(function (_a) {
            var entry = _a[0];
            setIntersecting(entry.isIntersecting);
            if (once && entry.isIntersecting && ref.current) {
                observer.unobserve(ref.current);
            }
        }, options);
    }, [options, once]);
    (0, react_1.useEffect)(function () {
        var currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return function () {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
            observer.disconnect();
        };
    }, [observer, ref]);
    return { ref: ref, isIntersecting: isIntersecting };
}
exports.useOnScreen = useOnScreen;
