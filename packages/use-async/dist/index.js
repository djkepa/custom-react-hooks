"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useAsync(asyncFunction, immediate) {
    if (immediate === void 0) { immediate = true; }
    var _a = (0, react_1.useState)('idle'), status = _a[0], setStatus = _a[1];
    var _b = (0, react_1.useState)(null), value = _b[0], setValue = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var execute = (0, react_1.useCallback)(function () {
        setStatus('pending');
        setValue(null);
        setError(null);
        return asyncFunction()
            .then(function (response) {
            setValue(response);
            setStatus('success');
        })
            .catch(function (error) {
            setError(error);
            setStatus('error');
        });
    }, [asyncFunction]);
    (0, react_1.useEffect)(function () {
        if (immediate && typeof window !== 'undefined') {
            execute();
        }
    }, [execute, immediate]);
    return { execute: execute, status: status, value: value, error: error };
}
exports.default = useAsync;
