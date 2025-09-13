"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useScript = void 0;
var react_1 = require("react");
var cachedScriptStatuses = {};
function useScript(src, removeOnUnmount) {
    if (removeOnUnmount === void 0) { removeOnUnmount = false; }
    var isScriptExisting = document.querySelector("script[src=\"".concat(src, "\"]"));
    var cachedStatus = cachedScriptStatuses[src];
    var _a = (0, react_1.useState)(cachedStatus || (isScriptExisting ? 'ready' : 'loading')), status = _a[0], setStatus = _a[1];
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined' || isScriptExisting) {
            return;
        }
        var script = document.createElement('script');
        script.src = src;
        script.async = true;
        var handleLoad = function () {
            setStatus('ready');
            cachedScriptStatuses[src] = 'ready';
        };
        var handleError = function () {
            setStatus('error');
            cachedScriptStatuses[src] = 'error';
        };
        script.addEventListener('load', handleLoad);
        script.addEventListener('error', handleError);
        document.body.appendChild(script);
        return function () {
            script.removeEventListener('load', handleLoad);
            script.removeEventListener('error', handleError);
            if (removeOnUnmount) {
                document.body.removeChild(script);
            }
        };
    }, [src, removeOnUnmount]);
    return status;
}
exports.useScript = useScript;
