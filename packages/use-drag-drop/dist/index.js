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
var useDragDrop = function (dragData, onDrop) {
    var _a = (0, react_1.useState)({
        isDragging: false,
        isOver: false,
        dragData: null,
        dropData: null,
    }), state = _a[0], setState = _a[1];
    var handleDragStart = (0, react_1.useCallback)(function (e) {
        setState(function (s) { return (__assign(__assign({}, s), { isDragging: true, dragData: dragData })); });
        e.dataTransfer.setData('application/reactflow', JSON.stringify(dragData));
        e.dataTransfer.effectAllowed = 'move';
    }, [dragData]);
    var handleDragEnd = (0, react_1.useCallback)(function () {
        setState(function (s) { return (__assign(__assign({}, s), { isDragging: false })); });
    }, []);
    var handleDragOver = (0, react_1.useCallback)(function (e) {
        e.preventDefault();
        setState(function (s) { return (__assign(__assign({}, s), { isOver: true })); });
    }, []);
    var handleDrop = (0, react_1.useCallback)(function (e) {
        e.preventDefault();
        var data = JSON.parse(e.dataTransfer.getData('application/reactflow'));
        setState(function (s) { return (__assign(__assign({}, s), { isOver: false, dropData: data })); });
        onDrop(data);
    }, [onDrop]);
    var handleDragLeave = (0, react_1.useCallback)(function () {
        setState(function (s) { return (__assign(__assign({}, s), { isOver: false })); });
    }, []);
    return {
        state: state,
        bindDrag: {
            draggable: true,
            onDragStart: handleDragStart,
            onDragEnd: handleDragEnd,
        },
        bindDrop: {
            onDragOver: handleDragOver,
            onDrop: handleDrop,
            onDragLeave: handleDragLeave,
        },
    };
};
exports.default = useDragDrop;
