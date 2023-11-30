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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useForm(initialValues, validate) {
    var _this = this;
    var _a = (0, react_1.useState)(initialValues), values = _a[0], setValues = _a[1];
    var createInitialErrorsState = function () {
        return Object.keys(initialValues).reduce(function (acc, key) {
            acc[key] = undefined;
            return acc;
        }, {});
    };
    var _b = (0, react_1.useState)(createInitialErrorsState), errors = _b[0], setErrors = _b[1];
    var createInitialTouchedState = function () {
        return Object.keys(initialValues).reduce(function (acc, key) {
            acc[key] = false;
            return acc;
        }, {});
    };
    var _c = (0, react_1.useState)(createInitialTouchedState), touched = _c[0], setTouched = _c[1];
    var _d = (0, react_1.useState)(false), isSubmitting = _d[0], setIsSubmitting = _d[1];
    var _e = (0, react_1.useState)('idle'), submissionStatus = _e[0], setSubmissionStatus = _e[1];
    var handleChange = (0, react_1.useCallback)(function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setValues(function (v) {
            var _a;
            return (__assign(__assign({}, v), (_a = {}, _a[name] = value, _a)));
        });
    }, []);
    var handleBlur = (0, react_1.useCallback)(function (e) {
        var name = e.target.name;
        setTouched(function (t) {
            var _a;
            return (__assign(__assign({}, t), (_a = {}, _a[name] = true, _a)));
        });
        var validationErrors = validate(values);
        setErrors(validationErrors);
    }, [values, validate]);
    var handleSubmit = (0, react_1.useCallback)(function (e, callback) { return __awaiter(_this, void 0, void 0, function () {
        var validationErrors, isValid, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsSubmitting(true);
                    setSubmissionStatus('idle');
                    validationErrors = validate(values);
                    setErrors(validationErrors);
                    setTouched(function (t) { return Object.keys(values).reduce(function (acc, key) {
                        var _a;
                        return (__assign(__assign({}, acc), (_a = {}, _a[key] = true, _a)));
                    }, t); });
                    isValid = !Object.values(validationErrors).some(function (error) { return error; });
                    if (!isValid) return [3, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4, callback(values)];
                case 2:
                    _a.sent();
                    setSubmissionStatus('success');
                    return [3, 4];
                case 3:
                    error_1 = _a.sent();
                    setSubmissionStatus('error');
                    return [3, 4];
                case 4: return [3, 6];
                case 5:
                    setSubmissionStatus('error');
                    _a.label = 6;
                case 6:
                    setIsSubmitting(false);
                    return [2];
            }
        });
    }); }, [values, validate]);
    var resetForm = (0, react_1.useCallback)(function () {
        setValues(initialValues);
        setErrors(createInitialErrorsState());
        setTouched(createInitialTouchedState());
        setIsSubmitting(false);
        setSubmissionStatus('idle');
    }, [initialValues]);
    (0, react_1.useEffect)(function () {
        setErrors(validate(values));
    }, [values, validate]);
    return { values: values, errors: errors, touched: touched, handleChange: handleChange, handleBlur: handleBlur, handleSubmit: handleSubmit, resetForm: resetForm, isSubmitting: isSubmitting, submissionStatus: submissionStatus };
}
exports.default = useForm;
