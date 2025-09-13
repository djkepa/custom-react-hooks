"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClickOutside = void 0;
var react_1 = require("react");
function useClickOutside(refs, callback, events, enableDetection, ignoreRefs) {
    if (events === void 0) { events = ['mousedown', 'touchstart']; }
    if (enableDetection === void 0) { enableDetection = true; }
    if (ignoreRefs === void 0) { ignoreRefs = []; }
    (0, react_1.useEffect)(function () {
        var listener = function (event) {
            var _a;
            if (!enableDetection)
                return;
            var target = event.target;
            var isIgnored = ignoreRefs.some(function (ref) { var _a; return (_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(target); });
            if (isIgnored)
                return;
            var isOutside = Array.isArray(refs)
                ? refs.every(function (ref) { var _a; return !((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(target)); })
                : !((_a = refs.current) === null || _a === void 0 ? void 0 : _a.contains(target));
            if (isOutside) {
                callback(event);
            }
        };
        events.forEach(function (event) {
            document.addEventListener(event, listener);
        });
        return function () {
            events.forEach(function (event) {
                document.removeEventListener(event, listener);
            });
        };
    }, [refs, callback, events, enableDetection, ignoreRefs]);
}
exports.useClickOutside = useClickOutside;
