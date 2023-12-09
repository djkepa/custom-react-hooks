"use strict";
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
function useImageLoad(_a, imgRef) {
    var thumbnailSrc = _a.thumbnailSrc, fullSrc = _a.fullSrc, _b = _a.lazyLoad, lazyLoad = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)({
        src: lazyLoad ? '' : thumbnailSrc,
        isLoading: !lazyLoad,
        isLoaded: false,
        hasError: false,
    }), state = _c[0], setState = _c[1];
    var loadImage = (0, react_1.useCallback)(function (imageSrc) {
        if (!imgRef.current)
            return;
        setState(function (prevState) { return (__assign(__assign({}, prevState), { isLoading: true })); });
        var img = new Image();
        img.src = imageSrc;
        img.onload = function () {
            setState({
                src: imageSrc,
                isLoading: false,
                isLoaded: true,
                hasError: false,
            });
            if (imageSrc === thumbnailSrc && fullSrc) {
                loadImage(fullSrc);
            }
        };
        img.onerror = function () {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { isLoading: false, hasError: true })); });
        };
    }, [thumbnailSrc, fullSrc, imgRef]);
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined')
            return;
        if (!lazyLoad) {
            loadImage(thumbnailSrc);
        }
        else if (imgRef.current) {
            var observer_1 = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        loadImage(thumbnailSrc);
                        observer_1.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            observer_1.observe(imgRef.current);
            return function () { return observer_1.disconnect(); };
        }
    }, [thumbnailSrc, lazyLoad, loadImage, imgRef]);
    return state;
}
exports.default = useImageLoad;
