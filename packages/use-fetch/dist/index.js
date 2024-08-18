"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
var react_1 = require("react");
function useFetch(url, options, cache, globalStateSetter) {
    var _this = this;
    if (options === void 0) { options = {}; }
    if (cache === void 0) { cache = null; }
    var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
    var _b = (0, react_1.useState)(false), loading = _b[0], setLoading = _b[1];
    var _c = (0, react_1.useState)(null), error = _c[0], setError = _c[1];
    var timeoutIdRef = (0, react_1.useRef)(null);
    var memoizedOptions = (0, react_1.useMemo)(function () { return options; }, [JSON.stringify(options)]);
    var fetchData = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var response, jsonData, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    setError(null);
                    if (cache && cache.has(url)) {
                        setData(cache.get(url) || null);
                        setLoading(false);
                        return [2];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    if (memoizedOptions.timeout) {
                        timeoutIdRef.current = setTimeout(function () {
                            setLoading(false);
                            setError(new Error('Timeout'));
                        }, memoizedOptions.timeout);
                    }
                    return [4, fetch(url, memoizedOptions)];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error(response.statusText);
                    return [4, response.json()];
                case 3:
                    jsonData = _a.sent();
                    setData(jsonData);
                    if (cache) {
                        cache.set(url, jsonData);
                    }
                    globalStateSetter === null || globalStateSetter === void 0 ? void 0 : globalStateSetter(jsonData);
                    return [3, 6];
                case 4:
                    err_1 = _a.sent();
                    if (err_1 instanceof Error) {
                        setError(err_1);
                    }
                    return [3, 6];
                case 5:
                    setLoading(false);
                    if (timeoutIdRef.current) {
                        clearTimeout(timeoutIdRef.current);
                    }
                    return [7];
                case 6: return [2];
            }
        });
    }); }, [url, memoizedOptions, cache, globalStateSetter]);
    (0, react_1.useEffect)(function () {
        if (options.manual || (cache && cache.has(url)))
            return;
        fetchData();
        return function () {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, [fetchData]);
    return { data: data, loading: loading, error: error, fetchData: fetchData };
}
exports.useFetch = useFetch;
