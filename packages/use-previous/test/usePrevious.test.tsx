import { renderHook } from '@testing-library/react';
import { usePrevious } from '../src/index';

describe('usePrevious', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious('initial'));

    expect(result.current).toBeUndefined();
  });

  it('should return previous value after rerender', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial');

    rerender({ value: 'final' });
    expect(result.current).toBe('updated');
  });

  it('should work with different data types', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 0 as any },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 1 as any });
    expect(result.current).toBe(0);

    rerender({ value: true as any });
    expect(result.current).toBe(1);

    rerender({ value: { key: 'value' } as any });
    expect(result.current).toBe(true);
  });

  it('should work with objects and arrays', () => {
    const obj1 = { id: 1, name: 'first' };
    const obj2 = { id: 2, name: 'second' };

    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: obj1 },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: obj2 });
    expect(result.current).toBe(obj1);
    expect(result.current).toEqual({ id: 1, name: 'first' });
  });

  it('should handle null and undefined values', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: null },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: undefined as any });
    expect(result.current).toBe(null);

    rerender({ value: 'value' as any });
    expect(result.current).toBeUndefined();
  });
});
