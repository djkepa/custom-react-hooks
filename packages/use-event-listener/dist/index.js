"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useEventListener(eventName, handler, element, options, condition) {
    if (condition === void 0) { condition = true; }
    var savedHandler = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        savedHandler.current = handler;
    }, [handler]);
    (0, react_1.useEffect)(function () {
        if (!condition)
            return;
        var targetElement = (element === null || element === void 0 ? void 0 : element.current) || window;
        if (!targetElement.addEventListener)
            return;
        var eventListener = function (event) { return savedHandler.current && savedHandler.current(event); };
        var events = Array.isArray(eventName) ? eventName : [eventName];
        events.forEach(function (e) { return targetElement.addEventListener(e, eventListener, options); });
        return function () {
            events.forEach(function (e) { return targetElement.removeEventListener(e, eventListener, options); });
        };
    }, [eventName, element, options, condition]);
}
exports.default = useEventListener;
