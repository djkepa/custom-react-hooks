import { renderHook, act } from '@testing-library/react';
import { useHistoryState } from '../src/index';

describe('useHistoryState', () => {
  it('should initialize with initial state', () => {
    const { result } = renderHook(() => useHistoryState('initial'));

    expect(result.current.state).toBe('initial');
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.history).toEqual(['initial']);
    expect(result.current.currentIndex).toBe(0);
  });

  it('should update state and add to history', () => {
    const { result } = renderHook(() => useHistoryState(0));

    act(() => {
      result.current.setState(1);
    });

    expect(result.current.state).toBe(1);
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(false);
    expect(result.current.history).toEqual([0, 1]);
    expect(result.current.currentIndex).toBe(1);
  });

  it('should support functional updates', () => {
    const { result } = renderHook(() => useHistoryState(5));

    act(() => {
      result.current.setState((prev) => prev + 1);
    });

    expect(result.current.state).toBe(6);
    expect(result.current.history).toEqual([5, 6]);
  });

  it('should undo state changes', () => {
    const { result } = renderHook(() => useHistoryState(0));

    act(() => {
      result.current.setState(1);
      result.current.setState(2);
    });

    expect(result.current.state).toBe(2);
    expect(result.current.currentIndex).toBe(2);

    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toBe(1);
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.canUndo).toBe(true);
    expect(result.current.canRedo).toBe(true);

    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toBe(0);
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);
  });

  it('should redo state changes', () => {
    const { result } = renderHook(() => useHistoryState(0));

    act(() => {
      result.current.setState(1);
      result.current.setState(2);
    });

    // After setting states: history = [0, 1, 2], currentIndex = 2
    expect(result.current.state).toBe(2);
    expect(result.current.currentIndex).toBe(2);

    act(() => {
      result.current.undo();
    });

    // After first undo: currentIndex = 1, state = 1
    expect(result.current.state).toBe(1);
    expect(result.current.currentIndex).toBe(1);

    act(() => {
      result.current.undo();
    });

    // After second undo: currentIndex = 0, state = 0
    expect(result.current.state).toBe(0);
    expect(result.current.currentIndex).toBe(0);

    act(() => {
      result.current.redo();
    });

    expect(result.current.state).toBe(1);
    expect(result.current.currentIndex).toBe(1);

    act(() => {
      result.current.redo();
    });

    expect(result.current.state).toBe(2);
    expect(result.current.currentIndex).toBe(2);
    expect(result.current.canRedo).toBe(false);
  });

  it('should clear future history when setting new state after undo', () => {
    const { result } = renderHook(() => useHistoryState(0));

    act(() => {
      result.current.setState(1);
      result.current.setState(2);
    });

    // Initial state: history = [0, 1, 2], currentIndex = 2
    expect(result.current.history).toEqual([0, 1, 2]);
    expect(result.current.currentIndex).toBe(2);

    act(() => {
      result.current.undo(); // Go back to 1
    });

    // After undo: history = [0, 1, 2], currentIndex = 1, state = 1
    expect(result.current.state).toBe(1);
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.history).toEqual([0, 1, 2]);

    act(() => {
      result.current.setState(3); // Should clear the "2" from future
    });

    expect(result.current.state).toBe(3);
    expect(result.current.history).toEqual([0, 1, 3]);
    expect(result.current.canRedo).toBe(false);
  });

  it('should respect maxHistorySize', () => {
    const { result } = renderHook(() => useHistoryState(0, { maxHistorySize: 4 }));

    act(() => {
      result.current.setState(1);
      result.current.setState(2);
      result.current.setState(3);
      result.current.setState(4); // Should remove the first item (0)
    });

    expect(result.current.history).toEqual([1, 2, 3, 4]);
    expect(result.current.history.length).toBe(4);
    expect(result.current.currentIndex).toBe(3);
  });

  it('should clear history', () => {
    const { result } = renderHook(() => useHistoryState(0));

    act(() => {
      result.current.setState(1);
      result.current.setState(2);
    });

    // After setting states: history = [0, 1, 2], currentIndex = 2
    expect(result.current.history.length).toBe(3);
    expect(result.current.currentIndex).toBe(2);
    expect(result.current.state).toBe(2);

    act(() => {
      result.current.undo();
    });

    // After undo: history = [0, 1, 2], currentIndex = 1, state = 1
    expect(result.current.history.length).toBe(3);
    expect(result.current.currentIndex).toBe(1);
    expect(result.current.state).toBe(1);

    act(() => {
      result.current.clear();
    });

    expect(result.current.history).toEqual([1]); // Current state becomes the only history item
    expect(result.current.currentIndex).toBe(0);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it('should not add duplicate states to history', () => {
    const { result } = renderHook(() => useHistoryState(0));

    act(() => {
      result.current.setState(1);
      result.current.setState(1); // Same value, should not be added
    });

    expect(result.current.history).toEqual([0, 1]);
    expect(result.current.currentIndex).toBe(1);
  });

  it('should work with objects', () => {
    const initialObj = { count: 0, name: 'test' };
    const { result } = renderHook(() => useHistoryState(initialObj));

    const newObj = { count: 1, name: 'updated' };

    act(() => {
      result.current.setState(newObj);
    });

    expect(result.current.state).toEqual(newObj);
    expect(result.current.history).toEqual([initialObj, newObj]);

    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toEqual(initialObj);
  });

  it('should handle undo/redo when at boundaries', () => {
    const { result } = renderHook(() => useHistoryState(0));

    // Try to undo when already at the beginning
    act(() => {
      result.current.undo();
    });

    expect(result.current.state).toBe(0);
    expect(result.current.currentIndex).toBe(0);

    act(() => {
      result.current.setState(1);
    });

    // Try to redo when already at the end
    act(() => {
      result.current.redo();
    });

    expect(result.current.state).toBe(1);
    expect(result.current.currentIndex).toBe(1);
  });
});
