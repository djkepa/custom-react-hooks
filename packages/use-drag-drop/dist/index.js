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
var useDragDrop = function (onDrop) {
    var _a = (0, react_1.useState)({
        isDragging: false,
        isOver: false,
        draggedItemId: null,
        overDropId: null,
    }), state = _a[0], setState = _a[1];
    var handleDragStart = (0, react_1.useCallback)(function (e, dragId) {
        e.dataTransfer.setData('text/plain', dragId);
        e.dataTransfer.effectAllowed = 'move';
        setState({ isDragging: true, isOver: false, draggedItemId: dragId, overDropId: null });
    }, []);
    var handleDragOver = (0, react_1.useCallback)(function (e, dropId) {
        e.preventDefault();
        if (state.overDropId !== dropId) {
            setState(function (s) { return (__assign(__assign({}, s), { isOver: true, overDropId: dropId })); });
        }
    }, [state.overDropId]);
    var handleDragEnter = (0, react_1.useCallback)(function (e, dropId) {
        e.preventDefault();
        setState(function (s) { return (__assign(__assign({}, s), { isOver: true, overDropId: dropId })); });
    }, []);
    var handleDragLeave = (0, react_1.useCallback)(function (e, dropId) {
        e.preventDefault();
        if (state.overDropId === dropId) {
            setState(function (s) { return (__assign(__assign({}, s), { isOver: false, overDropId: null })); });
        }
    }, [state.overDropId]);
    var handleDrop = (0, react_1.useCallback)(function (e, dropId) {
        e.preventDefault();
        var dragId = e.dataTransfer.getData('text/plain');
        setState({ isDragging: false, isOver: false, draggedItemId: dragId, overDropId: dropId });
        onDrop(dragId, dropId);
    }, [onDrop]);
    return {
        state: state,
        bindDrag: function (dragId) { return ({
            draggable: true,
            onDragStart: function (e) { return handleDragStart(e, dragId); },
        }); },
        bindDrop: function (dropId) { return ({
            onDragOver: function (e) { return handleDragOver(e, dropId); },
            onDragEnter: function (e) { return handleDragEnter(e, dropId); },
            onDragLeave: function (e) { return handleDragLeave(e, dropId); },
            onDrop: function (e) { return handleDrop(e, dropId); },
        }); },
    };
};
exports.default = useDragDrop;
