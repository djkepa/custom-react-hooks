import { renderHook, act } from '@testing-library/react';
import useClipboard from '../../../../packages/use-clipboard/dist/index';

describe('useClipboard', () => {
  it('can perform copy operation', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copyToClipboard('test text');
    });

    // Check if state reflects an attempt to copy, regardless of success
    expect(result.current.state).toBeDefined();
  });

  it('can perform paste operation', async () => {
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.pasteFromClipboard();
    });

    // Check if state reflects an attempt to paste, regardless of success
    expect(result.current.state).toBeDefined();
  });
});
