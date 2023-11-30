"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useUpdateEffect(effect, deps, options) {
    if (deps === void 0) { deps = []; }
    if (options === void 0) { options = {}; }
    var _a = options.skipInitialEffect, skipInitialEffect = _a === void 0 ? true : _a, delay = options.delay, condition = options.condition;
    var isInitialMount = (0, react_1.useRef)(skipInitialEffect);
    var effectTimeout = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        if (condition && !condition()) {
            return;
        }
        if (delay !== undefined) {
            effectTimeout.current = setTimeout(function () {
                return effect();
            }, delay);
            return function () {
                if (effectTimeout.current) {
                    clearTimeout(effectTimeout.current);
                }
            };
        }
        else {
            return effect();
        }
    }, deps);
    (0, react_1.useEffect)(function () {
        return function () {
            if (effectTimeout.current) {
                clearTimeout(effectTimeout.current);
            }
        };
    }, []);
    return;
}
exports.default = useUpdateEffect;
