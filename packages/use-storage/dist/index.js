"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStorage = void 0;
var react_1 = require("react");
function useStorage(key, defaultValue, storageType) {
    if (storageType === void 0) { storageType = 'local'; }
    var isSSR = typeof window === 'undefined';
    var storage = isSSR ? null : storageType === 'local' ? localStorage : sessionStorage;
    var getStoredValue = function () {
        if (isSSR)
            return defaultValue;
        try {
            var item = storage === null || storage === void 0 ? void 0 : storage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        }
        catch (error) {
            console.warn("Error reading ".concat(storageType, "Storage key \u201C").concat(key, "\u201D:"), error);
            return defaultValue;
        }
    };
    var _a = (0, react_1.useState)(getStoredValue), storedValue = _a[0], setStoredValue = _a[1];
    (0, react_1.useEffect)(function () {
        if (isSSR)
            return;
        try {
            var valueToStore = JSON.stringify(storedValue);
            storage === null || storage === void 0 ? void 0 : storage.setItem(key, valueToStore);
        }
        catch (error) {
            console.warn("Error setting ".concat(storageType, "Storage key \u201C").concat(key, "\u201D:"), error);
        }
    }, [key, storedValue, storage]);
    var setValue = function (value) {
        var valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
    };
    return [storedValue, setValue];
}
exports.useStorage = useStorage;
