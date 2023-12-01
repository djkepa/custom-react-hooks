"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useUpdateEffect(effect, deps, options) {
    if (deps === void 0) { deps = []; }
    if (options === void 0) { options = {}; }
    var _a = options.skipInitialEffect, skipInitialEffect = _a === void 0 ? true : _a, delay = options.delay, condition = options.condition;
    var isInitialMount = (0, react_1.useRef)(skipInitialEffect);
    var effectTimeout = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        var callback = function () {
            if (condition && !condition()) {
                return;
            }
            return effect();
        };
        if (isInitialMount.current) {
            isInitialMount.current = false;
        }
        else if (delay !== undefined) {
            effectTimeout.current = setTimeout(callback, delay);
        }
        else {
            callback();
        }
        return function () {
            if (effectTimeout.current) {
                clearTimeout(effectTimeout.current);
            }
        };
    }, __spreadArray([delay, condition], deps, true));
    return;
}
exports.default = useUpdateEffect;
