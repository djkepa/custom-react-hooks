import { renderHook, act, waitFor } from '@testing-library/react';
import { useClipboard } from '../src/index';

// Mock the clipboard API
const mockClipboard = {
  writeText: jest.fn(),
  readText: jest.fn(),
};

// Mock navigator.clipboard
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true,
  configurable: true,
});

describe('useClipboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockClipboard.writeText.mockResolvedValue(undefined);
    mockClipboard.readText.mockResolvedValue('');
  });

  describe('Basic functionality', () => {
    it('should initialize with empty clipboard content', async () => {
      mockClipboard.readText.mockResolvedValue('');

      const { result } = renderHook(() => useClipboard());

      await waitFor(() => {
        expect(result.current.clipboardContent).toBe('');
        expect(result.current.hasContent).toBe(false);
        expect(result.current.isReading).toBe(false);
      });
    });

    it('should read clipboard content on mount', async () => {
      mockClipboard.readText.mockResolvedValue('initial content');

      const { result } = renderHook(() => useClipboard());

      await waitFor(() => {
        expect(result.current.clipboardContent).toBe('initial content');
        expect(result.current.hasContent).toBe(true);
      });
    });

    it('should not read clipboard on mount when readOnMount is false', async () => {
      mockClipboard.readText.mockResolvedValue('initial content');

      const { result } = renderHook(() => useClipboard({ readOnMount: false }));

      expect(result.current.clipboardContent).toBe('');
      expect(mockClipboard.readText).not.toHaveBeenCalled();
    });
  });

  describe('Copy functionality', () => {
    it('should copy text to clipboard and update state', async () => {
      const { result } = renderHook(() => useClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text');
      });

      expect(mockClipboard.writeText).toHaveBeenCalledWith('test text');
      expect(result.current.state.success).toBe(true);
      expect(result.current.state.error).toBe(null);
      expect(result.current.clipboardContent).toBe('test text');
      expect(result.current.hasContent).toBe(true);
    });

    it('should handle copy failure', async () => {
      mockClipboard.writeText.mockRejectedValue(new Error('Copy failed'));

      const { result } = renderHook(() => useClipboard());

      await act(async () => {
        await result.current.copyToClipboard('test text');
      });

      expect(result.current.state.success).toBe(false);
      expect(result.current.state.error).toBe('Failed to copy');
    });

    it('should reject empty text', async () => {
      const { result } = renderHook(() => useClipboard());

      await act(async () => {
        await result.current.copyToClipboard('   ');
      });

      expect(mockClipboard.writeText).not.toHaveBeenCalled();
      expect(result.current.state.success).toBe(false);
      expect(result.current.state.error).toBe('Cannot copy empty or whitespace text');
    });
  });

  describe('Paste functionality', () => {
    it('should paste text from clipboard', async () => {
      mockClipboard.readText.mockResolvedValue('pasted content');

      const { result } = renderHook(() => useClipboard());

      let pastedText: string;
      await act(async () => {
        pastedText = await result.current.pasteFromClipboard();
      });

      expect(pastedText!).toBe('pasted content');
      expect(result.current.state.success).toBe(true);
      expect(result.current.clipboardContent).toBe('pasted content');
    });

    it('should handle paste failure', async () => {
      mockClipboard.readText.mockRejectedValue(new Error('Paste failed'));

      const { result } = renderHook(() => useClipboard());

      let pastedText: string;
      await act(async () => {
        pastedText = await result.current.pasteFromClipboard();
      });

      expect(pastedText!).toBe('');
      expect(result.current.state.success).toBe(false);
      expect(result.current.state.error).toBe('Failed to paste');
    });
  });

  describe('Clipboard content tracking', () => {
    it('should trigger onClipboardChange when content changes', async () => {
      const onClipboardChange = jest.fn();
      mockClipboard.readText.mockResolvedValue('new content');

      const { result } = renderHook(() => useClipboard({ onClipboardChange }));

      await waitFor(() => {
        expect(onClipboardChange).toHaveBeenCalledWith('new content');
      });
    });

    it('should not trigger onClipboardChange for same content', async () => {
      const onClipboardChange = jest.fn();
      mockClipboard.readText.mockResolvedValue('same content');

      const { result } = renderHook(() => useClipboard({ onClipboardChange }));

      await waitFor(() => {
        expect(onClipboardChange).toHaveBeenCalledTimes(1);
      });

      // Manually refresh with same content
      await act(async () => {
        await result.current.refreshClipboard();
      });

      expect(onClipboardChange).toHaveBeenCalledTimes(1); // Should not be called again
    });
  });

  describe('Additional functionality', () => {
    it('should refresh clipboard content manually', async () => {
      mockClipboard.readText.mockResolvedValueOnce('initial').mockResolvedValueOnce('updated');

      const { result } = renderHook(() => useClipboard());

      await waitFor(() => {
        expect(result.current.clipboardContent).toBe('initial');
      });

      mockClipboard.readText.mockResolvedValue('updated');

      await act(async () => {
        await result.current.refreshClipboard();
      });

      expect(result.current.clipboardContent).toBe('updated');
    });

    it('should clear clipboard', async () => {
      const { result } = renderHook(() => useClipboard({ readOnMount: false }));

      // Copy some content first
      await act(async () => {
        await result.current.copyToClipboard('test content');
      });

      expect(result.current.hasContent).toBe(true);
      expect(result.current.clipboardContent).toBe('test content');

      // Now clear it - test the state changes rather than the implementation
      await act(async () => {
        await result.current.clearClipboard();
      });

      // The important thing is that the state is cleared
      expect(result.current.clipboardContent).toBe('');
      expect(result.current.hasContent).toBe(false);
    });

    it('should handle hasContent correctly', async () => {
      const { result } = renderHook(() => useClipboard());

      // Empty content
      expect(result.current.hasContent).toBe(false);

      // Copy content
      await act(async () => {
        await result.current.copyToClipboard('test content');
      });

      expect(result.current.hasContent).toBe(true);

      // Clear content
      await act(async () => {
        await result.current.clearClipboard();
      });

      expect(result.current.hasContent).toBe(false);
    });
  });

  describe('Polling functionality', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should poll clipboard content at specified interval', async () => {
      mockClipboard.readText.mockResolvedValue('polled content');

      const { result } = renderHook(() =>
        useClipboard({
          pollingInterval: 1000,
          readOnMount: false,
        }),
      );

      expect(mockClipboard.readText).not.toHaveBeenCalled();

      // Fast-forward time
      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(mockClipboard.readText).toHaveBeenCalled();
      });
    });

    it('should cleanup polling interval on unmount', async () => {
      const { unmount } = renderHook(() =>
        useClipboard({
          pollingInterval: 1000,
        }),
      );

      const clearIntervalSpy = jest.spyOn(global, 'clearInterval');

      unmount();

      expect(clearIntervalSpy).toHaveBeenCalled();
    });
  });

  describe('Error handling', () => {
    it('should handle clipboard not available', async () => {
      // Mock clipboard as undefined
      const originalClipboard = navigator.clipboard;
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
      });

      const { result } = renderHook(() => useClipboard({ readOnMount: false }));

      await act(async () => {
        await result.current.copyToClipboard('test');
      });

      expect(result.current.state.error).toBe('Clipboard is not available');

      // Restore clipboard
      Object.defineProperty(navigator, 'clipboard', {
        value: originalClipboard,
        configurable: true,
      });
    });
  });
});
