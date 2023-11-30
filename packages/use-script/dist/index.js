"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
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
function useScript(src, _a) {
    if (_a === void 0) { _a = {}; }
    var onLoad = _a.onLoad, onError = _a.onError, _b = _a.removeOnUnmount, removeOnUnmount = _b === void 0 ? false : _b, attributes = __rest(_a, ["onLoad", "onError", "removeOnUnmount"]);
    var sources = Array.isArray(src) ? src : [src];
    var _c = (0, react_1.useState)(sources.map(function (s) { return ({ src: s, status: 'loading' }); })), scripts = _c[0], setScripts = _c[1];
    (0, react_1.useEffect)(function () {
        sources.forEach(function (source, index) {
            var script = document.querySelector("script[src=\"".concat(source, "\"]"));
            var updateStatus = function (newStatus) {
                setScripts(function (prevScripts) {
                    var newScripts = __spreadArray([], prevScripts, true);
                    newScripts[index] = { src: source, status: newStatus };
                    return newScripts;
                });
            };
            if (!script) {
                script = document.createElement('script');
                script.src = source;
                Object.entries(attributes).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    script.setAttribute(key, value);
                });
                document.body.appendChild(script);
                script.addEventListener('load', function () {
                    updateStatus('ready');
                    if (onLoad)
                        onLoad();
                });
                script.addEventListener('error', function () {
                    updateStatus('error');
                    if (onError)
                        onError();
                });
            }
            else if (script.hasAttribute('data-loaded')) {
                updateStatus('ready');
            }
        });
        return function () {
            if (removeOnUnmount) {
                scripts.forEach(function (_a) {
                    var _b;
                    var src = _a.src;
                    var script = document.querySelector("script[src=\"".concat(src, "\"]"));
                    (_b = script === null || script === void 0 ? void 0 : script.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(script);
                });
            }
        };
    }, [src, onLoad, onError, removeOnUnmount, attributes]);
    return scripts;
}
exports.default = useScript;
