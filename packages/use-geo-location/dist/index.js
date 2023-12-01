"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var CustomGeoLocationError = (function (_super) {
    __extends(CustomGeoLocationError, _super);
    function CustomGeoLocationError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.name = 'CustomGeoLocationError';
        _this.code = code;
        return _this;
    }
    return CustomGeoLocationError;
}(Error));
function useGeoLocation(options, watch) {
    if (watch === void 0) { watch = false; }
    var _a = (0, react_1.useState)({
        loading: true,
        coordinates: null,
        error: null,
        isWatching: watch,
    }), geoLocationState = _a[0], setGeoLocationState = _a[1];
    var onSuccess = (0, react_1.useCallback)(function (position) {
        setGeoLocationState(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, coordinates: position.coords, error: null })); });
    }, [setGeoLocationState]);
    var onError = (0, react_1.useCallback)(function (error) {
        setGeoLocationState(function (prevState) { return (__assign(__assign({}, prevState), { loading: false, coordinates: null, error: new CustomGeoLocationError(error.message, error.code) })); });
    }, [setGeoLocationState]);
    (0, react_1.useEffect)(function () {
        if (!navigator.geolocation) {
            setGeoLocationState({
                loading: false,
                coordinates: null,
                error: new CustomGeoLocationError('Geolocation is not supported by this browser.', 0),
                isWatching: false,
            });
            return;
        }
        var watcher = null;
        if (watch) {
            watcher = navigator.geolocation.watchPosition(onSuccess, onError, options);
        }
        else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        }
        return function () {
            if (watcher !== null) {
                navigator.geolocation.clearWatch(watcher);
            }
        };
    }, [watch, options, onSuccess, onError]);
    return geoLocationState;
}
exports.default = useGeoLocation;
