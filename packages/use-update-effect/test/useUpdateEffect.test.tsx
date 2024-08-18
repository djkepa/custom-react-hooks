import { renderHook } from '@testing-library/react';
import { useUpdateEffect } from '../src/index';

jest.useFakeTimers();

describe('useUpdateEffect Hook', () => {
  it('should skip the initial effect', () => {
    const effect = jest.fn();
    renderHook(() => useUpdateEffect(effect));

    expect(effect).not.toHaveBeenCalled();
  });

  it('should run the effect on update', () => {
    const effect = jest.fn();
    const { rerender } = renderHook(({ value }) => useUpdateEffect(effect, [value]), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });
    expect(effect).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
