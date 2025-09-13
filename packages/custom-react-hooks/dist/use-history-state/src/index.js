"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHistoryState = void 0;
var react_1 = require("react");
/**
 * `useHistoryState` is a hook that extends useState with undo/redo functionality.
 * It maintains a history of state changes and provides functions to navigate
 * through the history, enabling undo and redo operations.
 *
 * @param initialState - The initial state value
 * @param options - Configuration options for the history state
 * @return - An object containing:
 *   - `state`: Current state value
 *   - `setState`: Function to update the state
 *   - `undo`: Function to undo the last state change
 *   - `redo`: Function to redo the next state change
 *   - `canUndo`: Boolean indicating if undo is possible
 *   - `canRedo`: Boolean indicating if redo is possible
 *   - `clear`: Function to clear the history
 *   - `history`: Array of all state values in history
 *   - `currentIndex`: Current position in the history
 */
function useHistoryState(initialState, options) {
    if (options === void 0) { options = {}; }
    var _a = options.maxHistorySize, maxHistorySize = _a === void 0 ? 50 : _a;
    var _b = (0, react_1.useState)([initialState]), history = _b[0], setHistory = _b[1];
    var _c = (0, react_1.useState)(0), currentIndex = _c[0], setCurrentIndex = _c[1];
    var isUpdatingRef = (0, react_1.useRef)(false);
    var state = history[currentIndex];
    var canUndo = currentIndex > 0;
    var canRedo = currentIndex < history.length - 1;
    var setState = (0, react_1.useCallback)(function (value) {
        if (isUpdatingRef.current)
            return;
        var newValue = typeof value === 'function' ? value(state) : value;
        // Don't add to history if the value hasn't changed
        if (Object.is(newValue, state))
            return;
        setHistory(function (prevHistory) {
            // Remove any future history if we're not at the end
            var newHistory = prevHistory.slice(0, currentIndex + 1);
            newHistory.push(newValue);
            // Limit history size
            if (newHistory.length > maxHistorySize) {
                var excess = newHistory.length - maxHistorySize;
                newHistory.splice(0, excess);
                setCurrentIndex(maxHistorySize - 1);
            }
            else {
                setCurrentIndex(newHistory.length - 1);
            }
            return newHistory;
        });
    }, [state, currentIndex, maxHistorySize]);
    var undo = (0, react_1.useCallback)(function () {
        if (canUndo) {
            isUpdatingRef.current = true;
            setCurrentIndex(function (prevIndex) { return prevIndex - 1; });
            isUpdatingRef.current = false;
        }
    }, [canUndo]);
    var redo = (0, react_1.useCallback)(function () {
        if (canRedo) {
            isUpdatingRef.current = true;
            setCurrentIndex(function (prevIndex) { return prevIndex + 1; });
            isUpdatingRef.current = false;
        }
    }, [canRedo]);
    var clear = (0, react_1.useCallback)(function () {
        var currentState = history[currentIndex];
        setHistory([currentState]);
        setCurrentIndex(0);
    }, [history, currentIndex]);
    return {
        state: state,
        setState: setState,
        undo: undo,
        redo: redo,
        canUndo: canUndo,
        canRedo: canRedo,
        clear: clear,
        history: history,
        currentIndex: currentIndex,
    };
}
exports.useHistoryState = useHistoryState;
