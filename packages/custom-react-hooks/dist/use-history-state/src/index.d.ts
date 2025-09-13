export interface UseHistoryStateOptions {
    maxHistorySize?: number;
}
export interface UseHistoryStateReturn<T> {
    state: T;
    setState: (value: T | ((prevState: T) => T)) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    clear: () => void;
    history: T[];
    currentIndex: number;
}
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
declare function useHistoryState<T>(initialState: T, options?: UseHistoryStateOptions): UseHistoryStateReturn<T>;
export { useHistoryState };
