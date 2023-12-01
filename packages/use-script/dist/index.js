"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useScript(src, removeOnUnmount) {
    if (removeOnUnmount === void 0) { removeOnUnmount = false; }
    var isScriptExisting = document.querySelector("script[src=\"".concat(src, "\"]"));
    console.log('isScriptExisting', isScriptExisting);
    var _a = (0, react_1.useState)(isScriptExisting ? 'unknown' : 'loading'), status = _a[0], setStatus = _a[1];
    (0, react_1.useEffect)(function () {
        if (isScriptExisting) {
            return;
        }
        console.log('status', status);
        var script = document.createElement('script');
        script.src = src;
        var handleLoad = function () { return setStatus('ready'); };
        var handleError = function () { return setStatus('error'); };
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
exports.default = useScript;
