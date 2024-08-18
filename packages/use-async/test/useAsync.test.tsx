import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsync } from '../src';

describe('useAsync', () => {
  const successFunction = jest.fn().mockResolvedValue('success');
  const errorFunction = jest.fn().mockRejectedValue(new Error('error'));

  it('should start with initial state', () => {
    const { result } = renderHook(() => useAsync(successFunction, false));

    expect(result.current.status).toBe('idle');
    expect(result.current.value).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should be in pending state when async function is called', async () => {
    let resolveFunction;
    const promise = new Promise((resolve) => {
      resolveFunction = resolve;
    });

    const asyncFunction = jest.fn().mockImplementation(() => promise);
    const { result } = renderHook(() => useAsync(asyncFunction, true));

    expect(result.current.status).toBe('pending');

    await act(async () => {
      resolveFunction('success');
    });

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });
  });

  it('should handle successful async operation', async () => {
    const { result } = renderHook(() => useAsync(successFunction, true));

    await waitFor(() => {
      expect(result.current.status).toBe('success');
      expect(result.current.value).toBe('success');
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle failed async operation', async () => {
    const { result } = renderHook(() => useAsync(errorFunction, true));

    await waitFor(() => {
      expect(result.current.status).toBe('error');
      expect(result.current.value).toBeNull();
      expect(result.current.error).toBeDefined();
    });
  });

  it('should not execute async function immediately when immediate is false', async () => {
    let resolveFunction;
    const delayedSuccessFunction = jest.fn().mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveFunction = resolve;
        }),
    );
    const { result } = renderHook(() => useAsync(delayedSuccessFunction, false));

    expect(result.current.status).toBe('idle');

    await act(async () => {
      result.current.execute();
    });

    expect(result.current.status).toBe('pending');

    act(() => {
      resolveFunction('success');
    });

    await waitFor(() => {
      expect(result.current.status).toBe('success');
    });
  });
});
