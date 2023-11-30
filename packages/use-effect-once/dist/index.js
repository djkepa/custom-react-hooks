"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useEffectOnce(effect) {
    (0, react_1.useEffect)(function () {
        var cleanupFunction = effect();
        return function () {
            if (typeof cleanupFunction === 'function') {
                cleanupFunction();
            }
        };
    }, []);
}
exports.default = useEffectOnce;
