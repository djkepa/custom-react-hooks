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
exports.useClipboard = void 0;
var react_1 = require("react");
var isClipboardAvailable = function () {
    return typeof navigator !== 'undefined' && typeof navigator.clipboard !== 'undefined';
};
function useClipboard(options) {
    var _this = this;
    if (options === void 0) { options = {}; }
    var _a = options.readOnMount, readOnMount = _a === void 0 ? true : _a, _b = options.pollingInterval, pollingInterval = _b === void 0 ? 0 : _b, onClipboardChange = options.onClipboardChange;
    var _c = (0, react_1.useState)({ success: false, error: null }), state = _c[0], setState = _c[1];
    var _d = (0, react_1.useState)(''), clipboardContent = _d[0], setClipboardContent = _d[1];
    var _e = (0, react_1.useState)(false), isReading = _e[0], setIsReading = _e[1];
    var intervalRef = (0, react_1.useRef)(null);
    var lastContentRef = (0, react_1.useRef)('');
    var readClipboardContent = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var text, content, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isClipboardAvailable()) {
                        return [2, ''];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    setIsReading(true);
                    return [4, navigator.clipboard.readText()];
                case 2:
                    text = _a.sent();
                    content = text || '';
                    if (content !== lastContentRef.current) {
                        setClipboardContent(content);
                        lastContentRef.current = content;
                        onClipboardChange === null || onClipboardChange === void 0 ? void 0 : onClipboardChange(content);
                    }
                    return [2, content];
                case 3:
                    error_1 = _a.sent();
                    return [2, ''];
                case 4:
                    setIsReading(false);
                    return [7];
                case 5: return [2];
            }
        });
    }); }, [onClipboardChange]);
    var copyToClipboard = (0, react_1.useCallback)(function (text) { return __awaiter(_this, void 0, void 0, function () {
        var error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isClipboardAvailable()) {
                        setState({ success: false, error: 'Clipboard is not available' });
                        return [2];
                    }
                    if (!text.trim()) {
                        setState({ success: false, error: 'Cannot copy empty or whitespace text' });
                        return [2];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, navigator.clipboard.writeText(text)];
                case 2:
                    _a.sent();
                    setState({ success: true, error: null });
                    setClipboardContent(text);
                    lastContentRef.current = text;
                    onClipboardChange === null || onClipboardChange === void 0 ? void 0 : onClipboardChange(text);
                    return [3, 4];
                case 3:
                    error_2 = _a.sent();
                    setState({ success: false, error: 'Failed to copy' });
                    return [3, 4];
                case 4: return [2];
            }
        });
    }); }, [onClipboardChange]);
    var pasteFromClipboard = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var text, content, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!isClipboardAvailable()) {
                        setState({ success: false, error: 'Clipboard is not available' });
                        return [2, ''];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, navigator.clipboard.readText()];
                case 2:
                    text = _a.sent();
                    content = text || '';
                    setState({ success: true, error: null });
                    if (content !== lastContentRef.current) {
                        setClipboardContent(content);
                        lastContentRef.current = content;
                        onClipboardChange === null || onClipboardChange === void 0 ? void 0 : onClipboardChange(content);
                    }
                    return [2, content];
                case 3:
                    error_3 = _a.sent();
                    setState({ success: false, error: 'Failed to paste' });
                    return [2, ''];
                case 4: return [2];
            }
        });
    }); }, [onClipboardChange]);
    (0, react_1.useEffect)(function () {
        if (readOnMount) {
            readClipboardContent();
        }
        if (pollingInterval > 0) {
            intervalRef.current = setInterval(function () {
                readClipboardContent();
            }, pollingInterval);
        }
        return function () {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [readOnMount, pollingInterval, readClipboardContent]);
    var refreshClipboard = (0, react_1.useCallback)(function () {
        return readClipboardContent();
    }, [readClipboardContent]);
    var clearClipboard = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, copyToClipboard(' ')];
                case 1:
                    _a.sent();
                    setClipboardContent('');
                    lastContentRef.current = '';
                    return [2];
            }
        });
    }); }, [copyToClipboard]);
    return {
        copyToClipboard: copyToClipboard,
        pasteFromClipboard: pasteFromClipboard,
        state: state,
        clipboardContent: clipboardContent,
        isReading: isReading,
        refreshClipboard: refreshClipboard,
        clearClipboard: clearClipboard,
        hasContent: clipboardContent.trim().length > 0,
    };
}
exports.useClipboard = useClipboard;
