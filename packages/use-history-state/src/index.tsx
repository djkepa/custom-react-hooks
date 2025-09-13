import { useReducer, useCallback, useRef } from 'react';

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

interface HistoryState<T> {
  history: T[];
  currentIndex: number;
}

type HistoryAction<T> =
  | { type: 'SET_STATE'; payload: T; maxHistorySize: number }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'CLEAR'; payload: T };

function historyReducer<T>(state: HistoryState<T>, action: HistoryAction<T>): HistoryState<T> {
  switch (action.type) {
    case 'SET_STATE': {
      const currentState = state.history[state.currentIndex];

      // Don't add to history if the value hasn't changed
      if (Object.is(action.payload, currentState)) {
        return state;
      }

      const newHistory = state.history.slice(0, state.currentIndex + 1);
      newHistory.push(action.payload);

      // Limit history size
      if (newHistory.length > action.maxHistorySize) {
        const excess = newHistory.length - action.maxHistorySize;
        newHistory.splice(0, excess);
        return {
          history: newHistory,
          currentIndex: action.maxHistorySize - 1,
        };
      }

      return {
        history: newHistory,
        currentIndex: newHistory.length - 1,
      };
    }
    case 'UNDO': {
      return {
        ...state,
        currentIndex: Math.max(0, state.currentIndex - 1),
      };
    }
    case 'REDO': {
      return {
        ...state,
        currentIndex: Math.min(state.history.length - 1, state.currentIndex + 1),
      };
    }
    case 'CLEAR': {
      return {
        history: [action.payload],
        currentIndex: 0,
      };
    }
    default:
      return state;
  }
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

function useHistoryState<T>(
  initialState: T,
  options: UseHistoryStateOptions = {},
): UseHistoryStateReturn<T> {
  const { maxHistorySize = 50 } = options;

  const [{ history, currentIndex }, dispatch] = useReducer(historyReducer<T>, {
    history: [initialState],
    currentIndex: 0,
  });

  const state = history[currentIndex];
  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  const setState = useCallback(
    (value: T | ((prevState: T) => T)) => {
      const newValue = typeof value === 'function' ? (value as (prevState: T) => T)(state) : value;

      dispatch({ type: 'SET_STATE', payload: newValue, maxHistorySize });
    },
    [state, maxHistorySize],
  );

  const undo = useCallback(() => {
    if (canUndo) {
      dispatch({ type: 'UNDO' });
    }
  }, [canUndo]);

  const redo = useCallback(() => {
    if (canRedo) {
      dispatch({ type: 'REDO' });
    }
  }, [canRedo]);

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR', payload: state });
  }, [state]);

  return {
    state,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
    history,
    currentIndex,
  };
}

export { useHistoryState };
