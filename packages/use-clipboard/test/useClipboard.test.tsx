import { renderHook, act } from '@testing-library/react';
import { useClipboard } from '../src/index';

describe('useClipboard', () => {
  it('can perform copy operation', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copyToClipboard('test text');
    });

    expect(result.current.state).toBeDefined();
  });

  it('can perform paste operation', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.pasteFromClipboard();
    });

    expect(result.current.state).toBeDefined();
  });
});
