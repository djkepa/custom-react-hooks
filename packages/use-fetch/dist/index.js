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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFetch = void 0;
var react_1 = require("react");
var globalCache = new Map();
var batchQueue = new Map();
function useFetch(url, options, cache, globalStateSetter) {
    var _this = this;
    if (options === void 0) { options = {}; }
    if (cache === void 0) { cache = null; }
    var _a = options.revalidateOnFocus, revalidateOnFocus = _a === void 0 ? true : _a, _b = options.revalidateOnReconnect, revalidateOnReconnect = _b === void 0 ? true : _b, _c = options.refreshInterval, refreshInterval = _c === void 0 ? 0 : _c, _d = options.dedupingInterval, dedupingInterval = _d === void 0 ? 2000 : _d, _e = options.errorRetryCount, errorRetryCount = _e === void 0 ? 3 : _e, _f = options.errorRetryInterval, errorRetryInterval = _f === void 0 ? 5000 : _f, fallbackData = options.fallbackData, _g = options.keepPreviousData, keepPreviousData = _g === void 0 ? false : _g, _h = options.compression, compression = _h === void 0 ? false : _h, _j = options.batchRequests, batchRequests = _j === void 0 ? false : _j, transform = options.transform, _k = options.manual, manual = _k === void 0 ? false : _k, timeout = options.timeout, fetchOptions = __rest(options, ["revalidateOnFocus", "revalidateOnReconnect", "refreshInterval", "dedupingInterval", "errorRetryCount", "errorRetryInterval", "fallbackData", "keepPreviousData", "compression", "batchRequests", "transform", "manual", "timeout"]);
    var _l = (0, react_1.useState)(fallbackData || null), data = _l[0], setData = _l[1];
    var _m = (0, react_1.useState)(!!url && !manual), loading = _m[0], setLoading = _m[1];
    var _o = (0, react_1.useState)(null), error = _o[0], setError = _o[1];
    var _p = (0, react_1.useState)(false), isValidating = _p[0], setIsValidating = _p[1];
    var retryCountRef = (0, react_1.useRef)(0);
    var intervalRef = (0, react_1.useRef)(null);
    var abortControllerRef = (0, react_1.useRef)(null);
    var executeBatchedRequest = (0, react_1.useCallback)(function (batchKey) { return __awaiter(_this, void 0, void 0, function () {
        var queue, response, result, transformedResult_1, err_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queue = batchQueue.get(batchKey) || [];
                    batchQueue.delete(batchKey);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    if (!url)
                        throw new Error('No URL provided');
                    return [4, fetch(url, fetchOptions)];
                case 2:
                    response = _a.sent();
                    if (!response.ok)
                        throw new Error(response.statusText);
                    return [4, response.json()];
                case 3:
                    result = _a.sent();
                    transformedResult_1 = transform ? transform(result) : result;
                    queue.forEach(function (_a) {
                        var resolve = _a.resolve;
                        return resolve(transformedResult_1);
                    });
                    return [2, transformedResult_1];
                case 4:
                    err_1 = _a.sent();
                    error_1 = err_1 instanceof Error ? err_1 : new Error('Fetch failed');
                    queue.forEach(function (_a) {
                        var reject = _a.reject;
                        return reject(error_1);
                    });
                    throw error_1;
                case 5: return [2];
            }
        });
    }); }, [url, fetchOptions, transform]);
    var fetchData = (0, react_1.useCallback)(function (revalidate) {
        if (revalidate === void 0) { revalidate = false; }
        return __awaiter(_this, void 0, void 0, function () {
            var now, cached, batchKey_1, fetchPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!url)
                            return [2];
                        now = Date.now();
                        cached = globalCache.get(url);
                        if (!(!revalidate && cached && now - cached.timestamp < dedupingInterval)) return [3, 3];
                        if (!cached.promise) return [3, 2];
                        return [4, cached.promise];
                    case 1:
                        _a.sent();
                        return [2];
                    case 2:
                        setData(cached.data);
                        setLoading(false);
                        return [2];
                    case 3:
                        if (batchRequests) {
                            batchKey_1 = "".concat(url, "_batch");
                            if (batchQueue.has(batchKey_1)) {
                                return [2, new Promise(function (resolve, reject) {
                                        batchQueue.get(batchKey_1).push({
                                            resolve: function (data) {
                                                setData(data);
                                                resolve();
                                            },
                                            reject: reject,
                                        });
                                    })];
                            }
                            else {
                                batchQueue.set(batchKey_1, []);
                                setTimeout(function () {
                                    executeBatchedRequest(batchKey_1);
                                }, 10);
                                return [2, new Promise(function (resolve, reject) {
                                        batchQueue.get(batchKey_1).push({
                                            resolve: function (data) {
                                                setData(data);
                                                resolve();
                                            },
                                            reject: reject,
                                        });
                                    })];
                            }
                        }
                        if (abortControllerRef.current) {
                            abortControllerRef.current.abort();
                        }
                        abortControllerRef.current = new AbortController();
                        setIsValidating(true);
                        setError(null);
                        if (!keepPreviousData) {
                            setLoading(true);
                        }
                        fetchPromise = (function () { return __awaiter(_this, void 0, void 0, function () {
                            var response, result, transformedResult, err_2, error_2;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 3, 4, 5]);
                                        if (timeout) {
                                            setTimeout(function () {
                                                var _a;
                                                (_a = abortControllerRef.current) === null || _a === void 0 ? void 0 : _a.abort();
                                            }, timeout);
                                        }
                                        return [4, fetch(url, __assign(__assign({}, fetchOptions), { signal: (_a = abortControllerRef.current) === null || _a === void 0 ? void 0 : _a.signal }))];
                                    case 1:
                                        response = _b.sent();
                                        if (!response.ok)
                                            throw new Error(response.statusText);
                                        return [4, response.json()];
                                    case 2:
                                        result = _b.sent();
                                        transformedResult = transform ? transform(result) : result;
                                        globalCache.set(url, {
                                            data: transformedResult,
                                            timestamp: now,
                                        });
                                        setData(transformedResult);
                                        setError(null);
                                        retryCountRef.current = 0;
                                        globalStateSetter === null || globalStateSetter === void 0 ? void 0 : globalStateSetter(transformedResult);
                                        return [2, transformedResult];
                                    case 3:
                                        err_2 = _b.sent();
                                        error_2 = err_2 instanceof Error ? err_2 : new Error('Fetch failed');
                                        if (retryCountRef.current < errorRetryCount) {
                                            retryCountRef.current++;
                                            setTimeout(function () {
                                                fetchData(true);
                                            }, errorRetryInterval);
                                            throw error_2;
                                        }
                                        setError(error_2);
                                        throw error_2;
                                    case 4:
                                        setLoading(false);
                                        setIsValidating(false);
                                        return [7];
                                    case 5: return [2];
                                }
                            });
                        }); })();
                        globalCache.set(url, {
                            data: cached === null || cached === void 0 ? void 0 : cached.data,
                            timestamp: (cached === null || cached === void 0 ? void 0 : cached.timestamp) || now,
                            promise: fetchPromise,
                        });
                        return [4, fetchPromise];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    }, [
        url,
        fetchOptions,
        dedupingInterval,
        batchRequests,
        executeBatchedRequest,
        transform,
        errorRetryCount,
        errorRetryInterval,
        timeout,
        keepPreviousData,
        globalStateSetter,
    ]);
    var mutate = (0, react_1.useCallback)(function (data) { return __awaiter(_this, void 0, void 0, function () {
        var currentData, newData, resolvedData;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!url)
                        return [2, null];
                    if (!(typeof data === 'function')) return [3, 2];
                    currentData = ((_a = globalCache.get(url)) === null || _a === void 0 ? void 0 : _a.data) || null;
                    return [4, data(currentData)];
                case 1:
                    newData = _c.sent();
                    setData(newData);
                    globalCache.set(url, { data: newData, timestamp: Date.now() });
                    return [2, newData];
                case 2:
                    if (!(data !== undefined)) return [3, 4];
                    return [4, Promise.resolve(data)];
                case 3:
                    resolvedData = _c.sent();
                    setData(resolvedData);
                    globalCache.set(url, { data: resolvedData, timestamp: Date.now() });
                    return [2, resolvedData];
                case 4: return [4, fetchData(true)];
                case 5:
                    _c.sent();
                    return [2, ((_b = globalCache.get(url)) === null || _b === void 0 ? void 0 : _b.data) || null];
            }
        });
    }); }, [url, fetchData]);
    var revalidate = (0, react_1.useCallback)(function () { return fetchData(true); }, [fetchData]);
    (0, react_1.useEffect)(function () {
        if (url && !manual) {
            fetchData();
        }
    }, [url, manual, fetchData]);
    (0, react_1.useEffect)(function () {
        if (refreshInterval > 0 && url && !manual) {
            intervalRef.current = setInterval(function () {
                fetchData(true);
            }, refreshInterval);
            return function () {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        }
    }, [refreshInterval, url, manual, fetchData]);
    (0, react_1.useEffect)(function () {
        if (!revalidateOnFocus)
            return;
        var handleFocus = function () {
            if (url && !manual) {
                fetchData(true);
            }
        };
        window.addEventListener('focus', handleFocus);
        return function () { return window.removeEventListener('focus', handleFocus); };
    }, [revalidateOnFocus, url, manual, fetchData]);
    (0, react_1.useEffect)(function () {
        if (!revalidateOnReconnect)
            return;
        var handleOnline = function () {
            if (url && !manual) {
                fetchData(true);
            }
        };
        window.addEventListener('online', handleOnline);
        return function () { return window.removeEventListener('online', handleOnline); };
    }, [revalidateOnReconnect, url, manual, fetchData]);
    (0, react_1.useEffect)(function () {
        return function () {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
    return {
        data: data,
        loading: loading,
        error: error,
        isValidating: isValidating,
        fetchData: function () { return fetchData(false); },
        mutate: mutate,
        revalidate: revalidate,
    };
}
exports.useFetch = useFetch;
