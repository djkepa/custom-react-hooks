import { renderHook, act } from '@testing-library/react';
import useToggle from '../src/index';

describe('useToggle', () => {
  it('initializes with the correct value', () => {
    const { result } = renderHook(() => useToggle(false));
    expect(result.current.value).toBe(false);
  });

  it('toggles the value', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(true);
    act(() => {
      result.current.toggle();
    });
    expect(result.current.value).toBe(false);
  });

  it('sets value to true', () => {
    const { result } = renderHook(() => useToggle(false));
    act(() => {
      result.current.setTrue();
    });
    expect(result.current.value).toBe(true);
  });

  it('sets value to false', () => {
    const { result } = renderHook(() => useToggle(true));
    act(() => {
      result.current.setFalse();
    });
    expect(result.current.value).toBe(false);
  });

  it('calls the provided callback function', () => {
    const onToggle = jest.fn();
    const { result } = renderHook(() => useToggle(false, onToggle));
    act(() => {
      result.current.toggle();
    });
    expect(onToggle).toHaveBeenCalledWith(true);
  });
});
