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
function useImageLoad(_a) {
    var thumbnailSrc = _a.thumbnailSrc, fullSrc = _a.fullSrc, _b = _a.lazyLoad, lazyLoad = _b === void 0 ? false : _b;
    var _c = (0, react_1.useState)({
        src: lazyLoad ? '' : thumbnailSrc,
        isLoading: !lazyLoad,
        isLoaded: false,
        hasError: false,
    }), state = _c[0], setState = _c[1];
    var loadImage = (0, react_1.useCallback)(function (imageSrc) {
        var img = new Image();
        img.src = imageSrc;
        img.onload = function () {
            if (state.src === thumbnailSrc) {
                setState({ src: fullSrc, isLoading: false, isLoaded: true, hasError: false });
            }
        };
        img.onerror = function () {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { isLoading: false, hasError: true })); });
        };
    }, [thumbnailSrc, fullSrc, state.src]);
    (0, react_1.useEffect)(function () {
        if (typeof window === 'undefined' || !lazyLoad) {
            loadImage(thumbnailSrc);
        }
        else {
            var imgElement_1 = document.createElement('img');
            var observer_1 = new IntersectionObserver(function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        loadImage(thumbnailSrc);
                        observer.unobserve(imgElement_1);
                    }
                });
            });
            imgElement_1.src = thumbnailSrc;
            observer_1.observe(imgElement_1);
            return function () {
                observer_1.disconnect();
                imgElement_1 = undefined;
            };
        }
    }, [thumbnailSrc, lazyLoad, loadImage]);
    return state;
}
exports.default = useImageLoad;
